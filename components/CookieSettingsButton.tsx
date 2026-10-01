"use client";

declare global {
  interface Window {
    CookieConsent?: {
      renew: () => void;
    };
  }
}

export default function CookieSettingsButton() {
  function openSettings() {
    window.CookieConsent?.renew();
  }

  return (
    <button
      type="button"
      className="footer-cookie-button"
      onClick={openSettings}
    >
      Cookie-inställningar
    </button>
  );
}