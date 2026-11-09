"use client";

import Image from "next/image";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import PremiumContactForm from "./PremiumContactForm";
import styles from "./FloatingContactAssistant.module.css";

const BUTTON_SIZE = 72;
const MOBILE_NAV_CLEARANCE = 150;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function getBounds() {
  const mobile = window.matchMedia("(max-width: 780px)").matches;
  const top = 100;
  const bottom = mobile ? MOBILE_NAV_CLEARANCE : 32;

  return {
    min: top,
    max: Math.max(top, window.innerHeight - bottom - BUTTON_SIZE),
  };
}

export default function FloatingContactAssistant() {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const pointerRef = useRef<{
    id: number;
    startY: number;
    initialTop: number;
    moved: boolean;
  } | null>(null);

  const suppressClickRef = useRef(false);

  useEffect(() => {
    const update = () => {
      const { min, max } = getBounds();
      setPosition((previous) =>
        clamp(previous ?? window.innerHeight * 0.42, min, max),
      );
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const openFromPage = () => setOpen(true);

    window.addEventListener("macsupport:open-contact", openFromPage);
    return () =>
      window.removeEventListener("macsupport:open-contact", openFromPage);
  }, []);

  useEffect(() => {
    if (!open) return;

    const triggerButton = buttonRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => {
      closeRef.current?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.getClientRects().length > 0);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      triggerButton?.focus();
    };
  }, [open]);

  function onPointerDown(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    const { min, max } = getBounds();
    pointerRef.current = {
      id: event.pointerId,
      startY: event.clientY,
      initialTop: clamp(
        position ?? window.innerHeight * 0.42,
        min,
        max,
      ),
      moved: false,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent<HTMLButtonElement>) {
    const pointer = pointerRef.current;
    if (!pointer || pointer.id !== event.pointerId) return;

    const delta = event.clientY - pointer.startY;
    if (Math.abs(delta) > 6) {
      pointer.moved = true;
      setDragging(true);
    }

    if (!pointer.moved) return;

    const { min, max } = getBounds();
    setPosition(clamp(pointer.initialTop + delta, min, max));
  }

  function onPointerEnd(event: PointerEvent<HTMLButtonElement>) {
    const pointer = pointerRef.current;
    if (!pointer || pointer.id !== event.pointerId) return;

    if (pointer.moved) {
      suppressClickRef.current = true;
    }

    pointerRef.current = null;
    setDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function handleClick() {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    setOpen(true);
  }

  function moveWithKeyboard(direction: -1 | 1) {
    const { min, max } = getBounds();
    setPosition((previous) =>
      clamp(
        (previous ?? window.innerHeight * 0.42) + direction * 32,
        min,
        max,
      ),
    );
  }

  return (
    <>
      {!open && (
        <div
          className={styles.floating}
          style={position === null ? undefined : { top: position }}
        >
          <div className={styles.hint} aria-hidden="true">
            <strong>Har du en fråga?</strong>
            <span>Skicka ett meddelande</span>
          </div>

          <button
            ref={buttonRef}
            type="button"
            className={`${styles.trigger} ${dragging ? styles.dragging : ""}`}
            aria-label="Öppna kontaktformuläret. Flytta med Alt och piltangenterna."
            onClick={handleClick}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerEnd}
            onPointerCancel={onPointerEnd}
            onKeyDown={(event) => {
              if (event.altKey && event.key === "ArrowUp") {
                event.preventDefault();
                moveWithKeyboard(-1);
              }
              if (event.altKey && event.key === "ArrowDown") {
                event.preventDefault();
                moveWithKeyboard(1);
              }
            }}
          >
            <span className={styles.laser} aria-hidden="true" />
            <Image
              src="/icons/booking/macsupport-floating-assistant.png"
              alt=""
              width={72}
              height={72}
              className={styles.image}
            />
          </button>
        </div>
      )}

      {open && (
        <div
          className={styles.backdrop}
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) {
              setOpen(false);
            }
          }}
        >
          <div
            ref={dialogRef}
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <header className={styles.panelHeader}>
              <h2 id={titleId}>Kontakta MacSupport Stockholm</h2>
              <button
                ref={closeRef}
                type="button"
                className={styles.close}
                onClick={() => setOpen(false)}
                aria-label="Stäng kontaktformuläret"
              >
                ×
              </button>
            </header>
            <div className={styles.panelContent}>
              <PremiumContactForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
}