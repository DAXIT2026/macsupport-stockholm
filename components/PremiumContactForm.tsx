"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import ConfirmationFireworks from "./ConfirmationFireworks";
import styles from "./PremiumContactForm.module.css";

type ContactData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  website: string;
};

type ContactFields = keyof Omit<ContactData, "website">;

const initialData: ContactData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
  website: "",
};

function validate(data: ContactData): Partial<Record<ContactFields, string>> {
  const errors: Partial<Record<ContactFields, string>> = {};

  if (!data.firstName.trim() || data.firstName.length > 80) {
    errors.firstName = "Ange ditt förnamn (högst 80 tecken).";
  }

  if (!data.lastName.trim() || data.lastName.length > 80) {
    errors.lastName = "Ange ditt efternamn (högst 80 tecken).";
  }

  if (
    data.email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())
  ) {
    errors.email = "Ange en giltig e-postadress.";
  }

  if (data.phone && !/^[+0-9()\s-]{6,30}$/.test(data.phone.trim())) {
    errors.phone = "Ange ett giltigt telefonnummer.";
  }

  if (!data.message.trim() || data.message.trim().length < 10) {
    errors.message = "Skriv ett meddelande med minst 10 tecken.";
  } else if (data.message.length > 5000) {
    errors.message = "Meddelandet får innehålla högst 5 000 tecken.";
  }

  return errors;
}

export default function PremiumContactForm() {
  const [data, setData] = useState<ContactData>(initialData);
  const [errors, setErrors] =
    useState<Partial<Record<ContactFields, string>>>({});
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  function update(field: keyof ContactData, value: string) {
    setData((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const nextErrors = validate(data);
    setErrors(nextErrors);
    setServerError("");

    if (Object.keys(nextErrors).length > 0) return;

    setSending(true);

    try {
      const response = await fetch("/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Contact request failed");
      }

      const result: unknown = await response.json();

      if (
        typeof result !== "object" ||
        result === null ||
        !("success" in result) ||
        result.success !== true
      ) {
        throw new Error("Invalid server response");
      }

      setSuccess(true);
    } catch {
      setServerError(
        "Meddelandet kunde inte skickas. Försök igen senare eller ring oss."
      );
    } finally {
      setSending(false);
    }
  }

  if (success) {
    return (
      <section
        className={styles.success}
        aria-labelledby="contact-success-title"
        role="status"
      >
        <div className={styles.successHero}>
          <ConfirmationFireworks />

          <Image
            src="/logos/logo-light-transparent.png"
            alt="MacSupport Stockholm"
            width={280}
            height={100}
            className={styles.logo}
          />

          <div className={styles.successIcon} aria-hidden="true">
            ✓
          </div>

          <h2 id="contact-success-title">
            Tack för ditt <span>meddelande!</span>
          </h2>

          <p className={styles.successPill}>
            ✓ Ditt meddelande har skickats till oss
          </p>

          <p className={styles.successDescription}>
            Tack för att du kontaktade MacSupport Stockholm!
            Vi har tagit emot din förfrågan och återkommer
            till dig så snart som möjligt.
          </p>
        </div>

        <div className={styles.details}>
          <h3>Meddelandeinformation</h3>

          <dl>
            <div>
              <dt>Namn</dt>
              <dd>{data.firstName} {data.lastName}</dd>
            </div>
            <div>
              <dt>E-postadress</dt>
              <dd>{data.email}</dd>
            </div>
            {data.phone && (
              <div>
                <dt>Telefonnummer</dt>
                <dd>{data.phone}</dd>
              </div>
            )}
            <div>
              <dt>Meddelande</dt>
              <dd className={styles.messageText}>{data.message}</dd>
            </div>
          </dl>
        </div>

        <div className={styles.actions}>
          <Link href="/" className={styles.secondaryButton}>
            Till startsidan
          </Link>

          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => {
              setData(initialData);
              setErrors({});
              setServerError("");
              setSuccess(false);
            }}
          >
            Skicka ett nytt meddelande
          </button>
        </div>

        <p className={styles.signature}>
          Med vänliga hälsningar,
          <strong>MacSupport Stockholm</strong>
          <span>Min Datorsupport AB</span>
        </p>
      </section>
    );
  }

  return (
    <section className={styles.formCard} aria-labelledby="message-form-title">
      <div className={styles.formHeading}>
        <p className={styles.eyebrow}>Kontakta oss</p>
        <h2 id="message-form-title">Skicka ett meddelande</h2>
        <p>
          Har du en fråga? Fyll i formuläret så återkommer
          vi till dig så snart som möjligt.
        </p>
      </div>

      <form onSubmit={submit} noValidate>
        <div className={styles.twoColumns}>
          <Field
            id="firstName"
            label="Förnamn"
            value={data.firstName}
            error={errors.firstName}
            onChange={(value) => update("firstName", value)}
            autoComplete="given-name"
            maxLength={80}
            required
          />
          <Field
            id="lastName"
            label="Efternamn"
            value={data.lastName}
            error={errors.lastName}
            onChange={(value) => update("lastName", value)}
            autoComplete="family-name"
            maxLength={80}
            required
          />
        </div>

        <div className={styles.twoColumns}>
          <Field
            id="email"
            label="E-postadress"
            value={data.email}
            error={errors.email}
            onChange={(value) => update("email", value)}
            type="email"
            autoComplete="email"
            maxLength={254}
            required
          />
          <Field
            id="phone"
            label="Telefonnummer (valfritt)"
            value={data.phone}
            error={errors.phone}
            onChange={(value) => update("phone", value)}
            type="tel"
            autoComplete="tel"
            maxLength={30}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="contact-message">
            Meddelande <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="contact-message"
            value={data.message}
            maxLength={5000}
            rows={6}
            required
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            placeholder="Beskriv hur vi kan hjälpa dig..."
            onChange={(event) => update("message", event.target.value)}
          />
          {errors.message && (
            <p id="message-error" className={styles.fieldError}>
              {errors.message}
            </p>
          )}
        </div>

        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="contact-website">Webbplats</label>
          <input
            id="contact-website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={data.website}
            onChange={(event) => update("website", event.target.value)}
          />
        </div>

        <p className={styles.privacy}>
          Vi använder dina uppgifter för att besvara din förfrågan.
          Skicka inte lösenord eller andra känsliga uppgifter.
        </p>

        {serverError && (
          <p className={styles.serverError} role="alert">
            {serverError}
          </p>
        )}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={sending}
        >
          {sending ? "Skickar meddelandet…" : "Skicka meddelande"}
        </button>
      </form>
    </section>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  maxLength: number;
  required?: boolean;
};

function Field({
  id,
  label,
  value,
  error,
  onChange,
  type = "text",
  autoComplete,
  maxLength,
  required = false,
}: FieldProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={`contact-${id}`}>
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <input
        id={`contact-${id}`}
        type={type}
        value={value}
        maxLength={maxLength}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
      {error && (
        <p id={`${id}-error`} className={styles.fieldError}>
          {error}
        </p>
      )}
    </div>
  );
}
