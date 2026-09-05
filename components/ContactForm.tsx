"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "../lib/site-config";

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success"
  >("idle");

  const updateField = (
    field: keyof FormState,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const isValid =
    form.name.trim().length >= 2 &&
    form.email.includes("@") &&
    form.message.trim().length >= 10;

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!isValid || status === "sending") {
      return;
    }

    setStatus("sending");

    const subject =
      form.subject.trim().length > 0
        ? `Supportförfrågan: ${form.subject}`
        : "Supportförfrågan från webbplatsen";

    const body = [
      `Namn: ${form.name}`,
      `E-post: ${form.email}`,
      `Telefon: ${form.phone || "Ej angivet"}`,
      "",
      "Meddelande:",
      form.message,
    ].join("\n");

    const mailto =
      `${siteConfig.emailHref}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.open(mailto, "_self");

    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div
        className="contact-form-success"
        role="status"
        aria-live="polite"
      >
        <span className="contact-success-icon">
          ✓
        </span>

        <p className="premium-eyebrow">
          MEDDELANDET ÄR REDO
        </p>

        <h2>
          Tack, {form.name}.
        </h2>

        <p>
          Formulärets UI är klart. I nästa steg kopplar
          vi det till vårt riktiga server-API så att
          meddelandet faktiskt skickas.
        </p>

        <button
          type="button"
          className="premium-button secondary"
          onClick={() => {
            setForm(initialState);
            setStatus("idle");
          }}
        >
          Skicka ett nytt meddelande
        </button>
      </div>
    );
  }

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit}
      noValidate
    >

      <div className="contact-form-heading">
        <p className="premium-eyebrow">
          SKICKA MEDDELANDE
        </p>

        <h2>
          Hur kan vi hjälpa dig?
        </h2>

        <p>
          Beskriv problemet kort. Du behöver inte veta
          vad felet heter.
        </p>
      </div>


      <div className="contact-form-grid">

        <label className="contact-field">
          <span>
            Namn <b>*</b>
          </span>

          <input
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(event) =>
              updateField("name", event.target.value)
            }
            placeholder="Ditt namn"
            required
          />
        </label>


        <label className="contact-field">
          <span>
            E-post <b>*</b>
          </span>

          <input
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) =>
              updateField("email", event.target.value)
            }
            placeholder="namn@exempel.se"
            required
          />
        </label>


        <label className="contact-field">
          <span>
            Telefonnummer
          </span>

          <input
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(event) =>
              updateField("phone", event.target.value)
            }
            placeholder="07X-XXX XX XX"
          />
        </label>


        <label className="contact-field">
          <span>
            Vad gäller det?
          </span>

          <select
            value={form.subject}
            onChange={(event) =>
              updateField("subject", event.target.value)
            }
          >
            <option value="">
              Välj område
            </option>

            <option value="mac">
              Mac & dator
            </option>

            <option value="wifi">
              WiFi & nätverk
            </option>

            <option value="microsoft">
              Microsoft 365
            </option>

            <option value="security">
              IT-säkerhet
            </option>

            <option value="remote">
              Fjärrsupport
            </option>

            <option value="company">
              Företagssupport
            </option>

            <option value="other">
              Annat
            </option>
          </select>
        </label>

      </div>


      <label className="contact-field contact-message-field">
        <span>
          Beskriv problemet <b>*</b>
        </span>

        <textarea
          rows={6}
          value={form.message}
          onChange={(event) =>
            updateField("message", event.target.value)
          }
          placeholder="Exempel: Min Mac har blivit väldigt långsam och jag behöver hjälp med backup..."
          required
        />

        <small>
          Några meningar räcker. Vi ställer fler frågor
          om det behövs.
        </small>
      </label>


      <div className="contact-form-footer">

        <div className="contact-form-privacy">
          <span>✓</span>

          <p>
            Dina uppgifter används bara för att
            hantera din förfrågan.
          </p>
        </div>

        <button
          type="submit"
          className="premium-button primary contact-submit"
          disabled={!isValid || status === "sending"}
        >
          {status === "sending"
            ? "Skickar..."
            : "Skicka meddelande"}
        </button>

      </div>

    </form>
  );
}

