"use client";

export default function OpenContactFormButton() {
  return (
    <button
      type="button"
      className="contact-ref-v5-button contact-ref-v5-button-soft"
      onClick={() => {
        window.dispatchEvent(new Event("macsupport:open-contact"));
      }}
    >
      <span>Öppna formuläret</span>
      <span aria-hidden="true">→</span>
    </button>
  );
}