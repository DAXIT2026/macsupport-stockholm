"use client";

export default function CookieSettingsButton() {
  function openSettings() {
    window.dispatchEvent(
      new Event(
        "macsupport-open-cookie-settings"
      )
    );
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
