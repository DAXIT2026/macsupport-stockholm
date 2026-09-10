import Image from "next/image";
import Link from "next/link";

import type { ServiceItem } from "../lib/services";

type Props = {
  service: ServiceItem;
};

const serviceVisualMap: Record<string, string[]> = {
  "mac-support": [
    "system-scan",
    "installation",
    "backup-flow",
    "mail-sync",
  ],

  "fjarrsupport": [
    "remote-connect",
    "secure-session",
    "app-support",
    "completed",
  ],

  "wifi-natverk": [
    "wifi-scan",
    "router",
    "network-cable",
    "network-control",
  ],

  "it-sakerhet": [
    "secure-backup",
    "account-lock",
    "device-shield",
    "security-routine",
  ],

  "kameraovervakning": [
    "camera-view",
    "camera-install",
    "mobile-camera",
    "protect-system",
  ],

  "microsoft-365": [
    "mail-sync",
    "teams",
    "cloud-files",
    "account-security",
  ],

  "foretagssupport": [
    "support-desk",
    "users",
    "business-network",
    "business-security",
  ],
};

function FeatureVisual({
  type,
}: {
  type: string;
}) {
  return (
    <div
      className="service-feature-visual"
      data-visual={type}
      aria-hidden="true"
    >
      <span className="service-feature-orbit orbit-one" />
      <span className="service-feature-orbit orbit-two" />

      <div className="service-feature-scene">
        <span className="visual-main" />
        <span className="visual-secondary" />
        <span className="visual-detail detail-one" />
        <span className="visual-detail detail-two" />
        <span className="visual-detail detail-three" />
      </div>

      <span className="service-feature-status" />
    </div>
  );
}


function ServiceProblemVisual({
  problem,
  serviceSlug,
}: {
  problem: string;
  serviceSlug: string;
}) {
  const value = problem.toLowerCase();

  const type =
    serviceSlug === "fjarrsupport" &&
    value.includes("e-post")
      ? "remote-email"

      : serviceSlug === "fjarrsupport" &&
        value.includes("program")
      ? "remote-program"

      : serviceSlug === "fjarrsupport" &&
        value.includes("inställningar")
      ? "remote-settings"

      : serviceSlug === "fjarrsupport" &&
        value.includes("konton")
      ? "remote-account"

      : serviceSlug === "fjarrsupport" &&
        value.includes("felsök")
      ? "remote-diagnostic"

      : serviceSlug === "fjarrsupport" &&
        value.includes("microsoft 365")
      ? "remote-m365"

      : serviceSlug === "microsoft-365" &&
        value.includes("outlook")
      ? "outlook-sync"

      : serviceSlug === "microsoft-365" &&
        value.includes("onedrive")
      ? "onedrive-sync"

      : serviceSlug === "microsoft-365" &&
        value.includes("teams")
      ? "teams-support"

      : serviceSlug === "microsoft-365" &&
        value.includes("nya användare")
      ? "m365-user"

      : serviceSlug === "microsoft-365" &&
        value.includes("e-post behöver flyttas")
      ? "mail-migration"

      : serviceSlug === "microsoft-365" &&
        value.includes("microsoft-konton")
      ? "m365-security"

      : value.includes("wifi når inte") ||
    value.includes("wifi räcker inte")
      ? "wifi-home"

      : value.includes("internet tappar") ||
        value.includes("anslutningen")
      ? "connection-drop"

      : value.includes("router behöver") ||
        value.includes("routern behöver")
      ? "router"

      : value.includes("mesh")
      ? "mesh"

      : value.includes("nätverk behövs") ||
        value.includes("nätverket är instabilt")
      ? "office-network"

      : value.includes("flera enheter") ||
        value.includes("konkurrerar om uppkopplingen")
      ? "many-devices"

      : value.includes("långsam")
      ? "slow-mac"

      : value.includes("macos") ||
        value.includes("program krånglar")
      ? "system-error"

      : value.includes("backup fungerar inte") ||
        value.includes("osäkerhet kring backup")
      ? "backup-error"

      : value.includes("ny mac") ||
        value.includes("nya datorer")
      ? "new-device"

      : value.includes("filer ska flyttas") ||
        value.includes("data mellan")
      ? "file-transfer"

      : value.includes("e-post") ||
        value.includes("outlook")
      ? "mail"

      : value.includes("onedrive")
      ? "cloud-sync"

      : value.includes("teams")
      ? "teams"

      : value.includes("nya användare") ||
        value.includes("användare behöver")
      ? "user-setup"

      : value.includes("lösenord")
      ? "password"

      : value.includes("tvåstegs") ||
        value.includes("tvåsteg")
      ? "two-factor"

      : value.includes("virus") ||
        value.includes("intrång")
      ? "threat"

      : value.includes("viktiga filer")
      ? "protected-files"

      : value.includes("säkerhetsrutiner")
      ? "security-routine"

      : value.includes("bättre överblick")
      ? "camera-overview"

      : value.includes("gamla kameror") ||
        value.includes("dålig bild")
      ? "camera-quality"

      : value.includes("fjärråtkomst")
      ? "remote-camera"

      : value.includes("ny anläggning") ||
        value.includes("planeras")
      ? "camera-plan"

      : value.includes("unifi protect")
      ? "unifi"

      : value.includes("kameror behöver integreras")
      ? "camera-network"

      : value.includes("medarbetare")
      ? "staff-support"

      : value.includes("microsoft 365")
      ? "microsoft"

      : value.includes("it-kontakt")
      ? "support-contact"

      : "diagnostic";

  return (
    <div
      className={`service-v6-visual service-v6-${type}`}
      aria-hidden="true"
    >
      <span className="service-v6-grid" />

      {type === "wifi-home" && (
        <svg viewBox="0 0 220 125">
          <path
            className="v6-house"
            d="M123 55 161 27l38 28v48h-76Z"
          />
          <path
            className="v6-detail"
            d="M151 103V78h20v25"
          />

          <rect
            className="v6-device"
            x="23"
            y="73"
            width="45"
            height="24"
            rx="7"
          />

          <circle
            className="v6-dot"
            cx="45"
            cy="85"
            r="3"
          />

          <path
            className="v6-accent"
            d="M35 65c6-6 14-6 20 0"
          />
          <path
            className="v6-accent"
            d="M28 57c10-10 24-10 34 0"
          />

          <path
            className="v6-signal-soft"
            d="M79 67c17-14 31-17 48-12"
          />

          <path
            className="v6-break"
            d="m101 51 7 8M108 51l-7 8"
          />
        </svg>
      )}

      {type === "connection-drop" && (
        <svg viewBox="0 0 220 125">
          <rect className="v6-device" x="19" y="50" width="47" height="27" rx="7" />
          <rect className="v6-screen" x="157" y="34" width="48" height="58" rx="7" />

          <path className="v6-accent" d="M31 42c7-7 16-7 23 0" />
          <path className="v6-accent" d="M24 34c11-11 27-11 38 0" />

          <path className="v6-signal-soft" d="M69 63h42" />
          <path className="v6-signal-soft" d="M127 63h27" />

          <circle className="v6-warning" cx="119" cy="63" r="13" />
          <path className="v6-break" d="m113 57 12 12M125 57l-12 12" />
        </svg>
      )}

      {type === "router" && (
        <svg viewBox="0 0 220 125">
          <rect className="v6-device" x="61" y="60" width="98" height="35" rx="10" />
          <path className="v6-detail" d="M76 60V31M144 60V31" />

          <circle className="v6-dot" cx="84" cy="78" r="3" />
          <circle className="v6-dot" cx="95" cy="78" r="3" />

          <path className="v6-accent" d="M85 48c15-15 35-15 50 0" />
          <path className="v6-accent" d="M96 57c8-8 20-8 28 0" />

          <circle className="v6-panel" cx="171" cy="35" r="16" />
          <path className="v6-detail" d="m165 35 4 4 8-9" />
        </svg>
      )}

      {type === "mesh" && (
        <svg viewBox="0 0 220 125">
          <circle className="v6-node" cx="42" cy="65" r="20" />
          <circle className="v6-node" cx="110" cy="36" r="20" />
          <circle className="v6-node" cx="177" cy="69" r="20" />

          <path className="v6-signal-soft" d="M60 57 92 43M128 44l31 17M62 72l95 2" />

          <path className="v6-accent" d="M34 61c5-5 11-5 16 0M102 32c5-5 11-5 16 0M169 65c5-5 11-5 16 0" />
        </svg>
      )}

      {type === "office-network" && (
        <svg viewBox="0 0 220 125">
          <path className="v6-building" d="M22 99V45h54v54ZM144 99V32h54v67" />
          <path className="v6-detail" d="M35 58h10M53 58h10M35 72h10M53 72h10M157 47h10M175 47h10M157 62h10M175 62h10" />

          <rect className="v6-device" x="89" y="67" width="42" height="26" rx="7" />

          <path className="v6-accent" d="M96 59c8-8 20-8 28 0" />
          <path className="v6-signal-soft" d="M76 73h13M131 73h13" />
        </svg>
      )}

      {type === "many-devices" && (
        <svg viewBox="0 0 220 125">
          <rect className="v6-device" x="88" y="49" width="44" height="28" rx="8" />

          <rect className="v6-screen" x="18" y="31" width="38" height="29" rx="5" />
          <rect className="v6-screen" x="165" y="30" width="37" height="30" rx="5" />
          <rect className="v6-phone" x="30" y="75" width="19" height="32" rx="5" />
          <rect className="v6-phone" x="172" y="73" width="19" height="34" rx="5" />

          <path className="v6-signal-soft" d="M56 46h32M132 46h33M49 89h39M132 89h40" />

          <circle className="v6-warning" cx="110" cy="96" r="12" />
          <path className="v6-detail" d="M110 89v8M110 102h.1" />
        </svg>
      )}

      {type === "slow-mac" && (
        <svg viewBox="0 0 220 125">
          <rect className="v6-screen" x="34" y="20" width="105" height="70" rx="9" />
          <path className="v6-detail" d="M66 99h42M87 90v9" />

          <path className="v6-accent" d="M147 84a31 31 0 0 1 62 0" />
          <path className="v6-accent" d="m178 84 19-25" />
          <circle className="v6-dot" cx="178" cy="84" r="4" />

          <path className="v6-speed-low" d="M157 78h7" />
        </svg>
      )}

      {type === "system-error" && (
        <svg viewBox="0 0 220 125">
          <rect className="v6-screen" x="31" y="20" width="158" height="83" rx="10" />

          <rect className="v6-panel" x="50" y="36" width="89" height="47" rx="7" />
          <path className="v6-detail" d="M61 49h47M61 60h31" />

          <circle className="v6-warning" cx="153" cy="72" r="20" />
          <path className="v6-break" d="m145 64 16 16M161 64l-16 16" />
        </svg>
      )}

      {type === "backup-error" && (
        <svg viewBox="0 0 220 125">
          <rect className="v6-screen" x="22" y="42" width="59" height="47" rx="7" />

          <path
            className="v6-cloud"
            d="M111 81h60c13 0 21-8 21-18 0-11-9-19-20-19h-4c-5-12-15-18-29-18-17 0-29 10-34 24-12 1-20 9-20 17 0 8 8 14 26 14Z"
          />

          <circle className="v6-warning" cx="159" cy="89" r="15" />
          <path className="v6-detail" d="M159 81v9M159 96h.1" />
        </svg>
      )}

      {type === "new-device" && (
        <svg viewBox="0 0 220 125">
          <rect className="v6-screen" x="46" y="18" width="128" height="77" rx="10" />
          <path className="v6-detail" d="M83 105h54M110 95v10" />

          <circle className="v6-panel" cx="110" cy="57" r="22" />
          <path className="v6-accent" d="m99 57 8 8 16-18" />

          <circle className="v6-dot" cx="164" cy="27" r="5" />
        </svg>
      )}

      {type === "file-transfer" && (
        <svg viewBox="0 0 220 125">
          <rect className="v6-screen" x="15" y="30" width="62" height="53" rx="8" />
          <rect className="v6-screen" x="143" y="30" width="62" height="53" rx="8" />

          <path className="v6-accent" d="M77 48h65" />
          <path className="v6-accent" d="m132 39 10 9-10 9" />

          <rect className="v6-file" x="91" y="66" width="38" height="29" rx="5" />
          <path className="v6-detail" d="M99 76h20M99 83h14" />
        </svg>
      )}

      {type === "mail" && (
        <svg viewBox="0 0 220 125">
          <rect className="v6-screen" x="22" y="31" width="83" height="61" rx="9" />
          <rect className="v6-panel" x="118" y="38" width="76" height="49" rx="9" />

          <path className="v6-accent" d="m128 50 28 20 28-20" />

          <path className="v6-signal-soft" d="M81 25c11-9 27-9 38 0" />
          <path className="v6-break" d="m104 19 8 9M112 19l-8 9" />
        </svg>
      )}

      {type === "cloud-sync" && (
        <svg viewBox="0 0 220 125">
          <path
            className="v6-cloud"
            d="M64 80h95c13 0 22-8 22-19 0-12-9-20-22-20h-5C149 27 137 20 122 20c-20 0-34 12-39 29-16 0-28 10-28 19 0 7 5 12 9 12Z"
          />

          <path className="v6-accent" d="M96 64c7-10 21-13 32-7" />
          <path className="v6-accent" d="m125 50 5 8-9 3" />

          <path className="v6-signal-soft" d="M132 70c-7 10-21 13-32 7" />
          <path className="v6-signal-soft" d="m103 84-5-8 9-3" />
        </svg>
      )}

      {type === "teams" && (
        <svg viewBox="0 0 220 125">
          <circle className="v6-panel" cx="73" cy="48" r="18" />
          <circle className="v6-panel" cx="151" cy="48" r="18" />

          <path className="v6-detail" d="M40 98c3-25 17-36 33-36s30 11 33 36" />
          <path className="v6-detail" d="M118 98c3-25 17-36 33-36s30 11 33 36" />

          <rect className="v6-device" x="94" y="32" width="32" height="32" rx="8" />
          <path className="v6-accent" d="M103 42h14M110 42v14" />
        </svg>
      )}

      {type === "user-setup" && (
        <svg viewBox="0 0 220 125">
          <circle className="v6-panel" cx="65" cy="46" r="20" />
          <path className="v6-detail" d="M30 101c4-28 19-39 35-39s31 11 35 39" />

          <rect className="v6-screen" x="121" y="28" width="74" height="57" rx="9" />
          <path className="v6-accent" d="M144 57h28M158 43v28" />
        </svg>
      )}

      {type === "password" && (
        <svg viewBox="0 0 220 125">
          <rect className="v6-screen" x="25" y="25" width="170" height="76" rx="11" />

          <circle className="v6-dot" cx="64" cy="63" r="5" />
          <circle className="v6-dot" cx="85" cy="63" r="5" />
          <circle className="v6-dot" cx="106" cy="63" r="5" />
          <circle className="v6-dot" cx="127" cy="63" r="5" />

          <path className="v6-accent" d="M154 61h23M166 49v24" />
        </svg>
      )}

      {type === "two-factor" && (
        <svg viewBox="0 0 220 125">
          <rect className="v6-phone" x="40" y="19" width="51" height="85" rx="11" />

          <rect className="v6-panel" x="117" y="37" width="64" height="51" rx="9" />
          <circle className="v6-dot" cx="133" cy="62" r="5" />
          <circle className="v6-dot" cx="149" cy="62" r="5" />
          <circle className="v6-dot" cx="165" cy="62" r="5" />

          <path className="v6-accent" d="M91 61h26" />
        </svg>
      )}

      {type === "threat" && (
        <svg viewBox="0 0 220 125">
          <path className="v6-shield" d="M110 13 166 34v32c0 28-19 42-56 54-37-12-56-26-56-54V34l56-21Z" />

          <circle className="v6-warning" cx="110" cy="61" r="22" />
          <path className="v6-detail" d="M110 48v18M110 75h.1" />

          <path className="v6-signal-soft" d="M49 32 34 20M171 32l15-12" />
        </svg>
      )}

      {type === "protected-files" && (
        <svg viewBox="0 0 220 125">
          <rect className="v6-file" x="37" y="30" width="61" height="71" rx="8" />
          <path className="v6-detail" d="M50 49h35M50 62h26" />

          <path className="v6-shield" d="M153 27 187 40v21c0 20-12 31-34 39-22-8-34-19-34-39V40l34-13Z" />
          <path className="v6-accent" d="m143 62 8 8 16-18" />
        </svg>
      )}

      {type === "security-routine" && (
        <svg viewBox="0 0 220 125">
          <rect className="v6-panel" x="37" y="22" width="105" height="82" rx="10" />

          <path className="v6-accent" d="m53 44 6 6 10-12M53 65l6 6 10-12M53 86l6 6 10-12" />
          <path className="v6-detail" d="M79 44h47M79 65h47M79 86h47" />

          <path className="v6-shield-small" d="M173 48 197 57v14c0 14-8 22-24 28-16-6-24-14-24-28V57l24-9Z" />
        </svg>
      )}

      {type === "camera-overview" && (
        <svg viewBox="0 0 220 125">
          <rect className="v6-camera" x="26" y="41" width="59" height="42" rx="8" />
          <circle className="v6-lens" cx="56" cy="62" r="13" />

          <rect className="v6-screen" x="117" y="26" width="77" height="64" rx="9" />
          <path className="v6-accent" d="M127 61c15-17 38-17 56 0" />
          <circle className="v6-dot" cx="155" cy="61" r="5" />
        </svg>
      )}

      {type === "camera-quality" && (
        <svg viewBox="0 0 220 125">
          <rect className="v6-camera" x="24" y="37" width="66" height="49" rx="9" />
          <circle className="v6-lens" cx="57" cy="61" r="15" />

          <path className="v6-signal-soft" d="M103 45h20M103 57h13M103 69h23" />

          <rect className="v6-screen" x="136" y="29" width="60" height="62" rx="8" />
          <path className="v6-accent" d="M148 74 160 61l8 8 17-22" />
        </svg>
      )}

      {type === "remote-camera" && (
        <svg viewBox="0 0 220 125">
          <rect className="v6-camera" x="28" y="39" width="61" height="44" rx="8" />
          <circle className="v6-lens" cx="58" cy="61" r="13" />

          <path className="v6-signal-soft" d="M96 61h33" />

          <rect className="v6-phone" x="144" y="18" width="43" height="87" rx="10" />
          <circle className="v6-dot" cx="165" cy="62" r="8" />
        </svg>
      )}

      {type === "camera-plan" && (
        <svg viewBox="0 0 220 125">
          <path className="v6-plan" d="M31 31h119v70H31Z" />
          <path className="v6-detail" d="M69 31v28h45v42M31 70h38M150 60h38" />

          <circle className="v6-camera-dot" cx="50" cy="50" r="8" />
          <circle className="v6-camera-dot" cx="132" cy="48" r="8" />
          <circle className="v6-camera-dot" cx="92" cy="83" r="8" />

          <path className="v6-accent" d="M50 50 92 83 132 48" />
        </svg>
      )}

      {type === "unifi" && (
        <svg viewBox="0 0 220 125">
          <rect className="v6-device" x="72" y="52" width="76" height="35" rx="10" />
          <circle className="v6-panel" cx="110" cy="46" r="29" />

          <path className="v6-accent" d="M92 43c10-10 26-10 36 0M99 51c6-6 16-6 22 0" />
          <circle className="v6-dot" cx="110" cy="59" r="4" />

          <circle className="v6-camera-dot" cx="45" cy="76" r="10" />
          <circle className="v6-camera-dot" cx="176" cy="76" r="10" />

          <path className="v6-signal-soft" d="M55 76h17M148 76h18" />
        </svg>
      )}

      {type === "camera-network" && (
        <svg viewBox="0 0 220 125">
          <rect className="v6-camera" x="24" y="30" width="55" height="41" rx="8" />
          <circle className="v6-lens" cx="51" cy="50" r="12" />

          <circle className="v6-node" cx="111" cy="63" r="18" />

          <rect className="v6-device" x="153" y="70" width="50" height="28" rx="7" />

          <path className="v6-accent" d="M79 52 96 59M128 69l25 11" />
          <path className="v6-signal-soft" d="M100 52c6-6 16-6 22 0" />
        </svg>
      )}

      {type === "staff-support" && (
        <svg viewBox="0 0 220 125">
          <circle className="v6-panel" cx="52" cy="44" r="16" />
          <circle className="v6-panel" cx="100" cy="44" r="16" />
          <circle className="v6-panel" cx="148" cy="44" r="16" />

          <path className="v6-detail" d="M26 96c2-22 13-33 26-33s24 11 26 33M74 96c2-22 13-33 26-33s24 11 26 33M122 96c2-22 13-33 26-33s24 11 26 33" />

          <circle className="v6-dot" cx="185" cy="67" r="15" />
          <path className="v6-check-white" d="m178 67 5 5 10-11" />
        </svg>
      )}

      {type === "microsoft" && (
        <svg viewBox="0 0 220 125">
          <rect className="v6-ms ms1" x="69" y="26" width="34" height="34" rx="4" />
          <rect className="v6-ms ms2" x="108" y="26" width="34" height="34" rx="4" />
          <rect className="v6-ms ms3" x="69" y="65" width="34" height="34" rx="4" />
          <rect className="v6-ms ms4" x="108" y="65" width="34" height="34" rx="4" />

          <path className="v6-signal-soft" d="M50 63H28M160 63h32" />
        </svg>
      )}

      {type === "support-contact" && (
        <svg viewBox="0 0 220 125">
          <circle className="v6-panel" cx="83" cy="53" r="27" />
          <path className="v6-detail" d="M42 105c4-28 21-41 41-41s37 13 41 41" />

          <path className="v6-headset" d="M64 51c0-16 8-27 19-27s19 11 19 27" />
          <path className="v6-headset" d="M62 53v17M104 53v17" />

          <rect className="v6-device" x="132" y="42" width="60" height="42" rx="9" />
          <path className="v6-accent" d="M145 56h34M145 67h22" />
        </svg>
      )}
      {type === "remote-email" && (
        <svg viewBox="0 0 240 130">
          <rect
            className="v8-laptop"
            x="19"
            y="27"
            width="111"
            height="70"
            rx="10"
          />

          <path
            className="v8-base"
            d="M9 103h131l-10 10H20Z"
          />

          <rect
            className="v8-mail"
            x="44"
            y="43"
            width="62"
            height="40"
            rx="7"
          />

          <path
            className="v8-accent"
            d="m51 52 24 18 24-18"
          />

          <path
            className="v8-connection"
            d="M137 63h27"
          />

          <path
            className="v8-disconnect"
            d="m168 55 15 16M183 55l-15 16"
          />

          <rect
            className="v8-phone"
            x="194"
            y="34"
            width="29"
            height="57"
            rx="8"
          />
        </svg>
      )}

      {type === "remote-program" && (
        <svg viewBox="0 0 240 130">
          <rect
            className="v8-window"
            x="30"
            y="18"
            width="180"
            height="94"
            rx="12"
          />

          <path
            className="v8-windowbar"
            d="M30 39h180"
          />

          <circle className="v8-dot-red" cx="45" cy="29" r="3.5" />
          <circle className="v8-dot-yellow" cx="57" cy="29" r="3.5" />
          <circle className="v8-dot-green" cx="69" cy="29" r="3.5" />

          <path
            className="v8-soft"
            d="M50 57h65M50 70h46M50 83h58"
          />

          <path
            className="v8-warning-triangle"
            d="M160 50 192 102h-64Z"
          />

          <path
            className="v8-warning-mark"
            d="M160 67v15M160 91h.1"
          />
        </svg>
      )}

      {type === "remote-settings" && (
        <svg viewBox="0 0 240 130">
          <rect
            className="v8-settings-panel"
            x="30"
            y="20"
            width="180"
            height="90"
            rx="13"
          />

          <path className="v8-slider" d="M55 48h130" />
          <path className="v8-slider" d="M55 68h130" />
          <path className="v8-slider" d="M55 88h130" />

          <circle className="v8-control" cx="92" cy="48" r="9" />
          <circle className="v8-control cyan" cx="151" cy="68" r="9" />
          <circle className="v8-control" cx="113" cy="88" r="9" />

          <path
            className="v8-check"
            d="m183 100 7 7 14-17"
          />
        </svg>
      )}

      {type === "remote-account" && (
        <svg viewBox="0 0 240 130">
          <circle
            className="v8-avatar"
            cx="69"
            cy="47"
            r="22"
          />

          <path
            className="v8-person"
            d="M28 111c4-35 21-51 41-51s37 16 41 51"
          />

          <rect
            className="v8-account-card"
            x="126"
            y="23"
            width="88"
            height="69"
            rx="12"
          />

          <path className="v8-soft" d="M143 42h50M143 56h35" />

          <circle
            className="v8-key-ring"
            cx="169"
            cy="91"
            r="13"
          />

          <path
            className="v8-key"
            d="M181 91h27M200 91v9M190 91v6"
          />
        </svg>
      )}

      {type === "remote-diagnostic" && (
        <svg viewBox="0 0 240 130">
          <rect
            className="v8-laptop"
            x="18"
            y="29"
            width="121"
            height="72"
            rx="10"
          />

          <path
            className="v8-base"
            d="M8 106h141l-12 10H20Z"
          />

          <path
            className="v8-diagnostic-line"
            d="M37 76h15l9-19 13 33 12-26 10 12h23"
          />

          <circle
            className="v8-search"
            cx="178"
            cy="61"
            r="29"
          />

          <path
            className="v8-search-handle"
            d="m198 82 24 24"
          />

          <circle
            className="v8-focus"
            cx="178"
            cy="61"
            r="10"
          />
        </svg>
      )}

      {type === "remote-m365" && (
        <svg viewBox="0 0 240 130">
          <rect className="v8-ms ms-a" x="24" y="28" width="32" height="32" rx="5" />
          <rect className="v8-ms ms-b" x="61" y="28" width="32" height="32" rx="5" />
          <rect className="v8-ms ms-c" x="24" y="65" width="32" height="32" rx="5" />
          <rect className="v8-ms ms-d" x="61" y="65" width="32" height="32" rx="5" />

          <path
            className="v8-cloud"
            d="M136 87h55c13 0 21-8 21-18 0-11-9-19-21-19h-3c-5-12-14-18-27-18-16 0-27 9-32 23-12 1-20 9-20 17 0 9 8 15 27 15Z"
          />

          <path
            className="v8-remote-link"
            d="M96 63h31"
          />

          <path
            className="v8-accent"
            d="m117 54 10 9-10 9"
          />

          <circle
            className="v8-support-badge"
            cx="192"
            cy="94"
            r="17"
          />

          <path
            className="v8-headset"
            d="M183 94c0-8 4-13 9-13s9 5 9 13M182 94v7M202 94v7"
          />
        </svg>
      )}


      {type === "outlook-sync" && (
        <svg viewBox="0 0 220 125">
          <rect className="v6-screen" x="23" y="29" width="83" height="63" rx="9" />
          <path className="v6-accent" d="m38 47 27 20 27-20" />

          <circle className="v6-panel" cx="158" cy="61" r="29" />

          <path className="v6-accent" d="M143 55c6-10 20-13 31-6" />
          <path className="v6-accent" d="m170 42 6 8-10 3" />

          <path className="v6-signal-soft" d="M174 68c-6 10-20 13-31 6" />
          <path className="v6-signal-soft" d="m146 81-6-8 10-3" />
        </svg>
      )}

      {type === "onedrive-sync" && (
        <svg viewBox="0 0 220 125">
          <path
            className="v6-cloud"
            d="M53 81h89c14 0 22-8 22-19 0-12-9-20-22-20h-5C132 28 120 21 105 21c-19 0-33 11-39 28-16 0-27 9-27 18 0 8 5 14 14 14Z"
          />

          <rect className="v6-file" x="135" y="55" width="44" height="38" rx="6" />
          <path className="v6-detail" d="M146 68h22M146 77h15" />

          <path className="v6-accent" d="M83 62h29" />
          <path className="v6-accent" d="m103 54 9 8-9 8" />
        </svg>
      )}

      {type === "teams-support" && (
        <svg viewBox="0 0 220 125">
          <circle className="v6-panel" cx="58" cy="43" r="17" />
          <circle className="v6-panel" cx="155" cy="43" r="17" />

          <path className="v6-detail" d="M30 95c3-23 15-35 28-35s25 12 28 35" />
          <path className="v6-detail" d="M127 95c3-23 15-35 28-35s25 12 28 35" />

          <rect className="v6-device" x="87" y="31" width="45" height="45" rx="10" />
          <path className="v6-accent" d="M99 44h22M110 44v23" />

          <path className="v6-signal-soft" d="M76 49h11M132 49h7" />
        </svg>
      )}

      {type === "m365-user" && (
        <svg viewBox="0 0 220 125">
          <circle className="v6-panel" cx="67" cy="43" r="20" />
          <path className="v6-detail" d="M31 101c4-28 20-41 36-41s32 13 36 41" />

          <rect className="v6-screen" x="128" y="27" width="67" height="59" rx="9" />
          <path className="v6-accent" d="M148 56h28M162 42v28" />

          <circle className="v6-dot" cx="180" cy="91" r="8" />
        </svg>
      )}

      {type === "mail-migration" && (
        <svg viewBox="0 0 220 125">
          <rect className="v6-screen" x="15" y="34" width="69" height="55" rx="9" />
          <path className="v6-detail" d="m27 48 22 17 22-17" />

          <rect className="v6-screen" x="136" y="34" width="69" height="55" rx="9" />
          <path className="v6-accent" d="m148 48 22 17 22-17" />

          <path className="v6-accent" d="M84 54h52" />
          <path className="v6-accent" d="m126 45 10 9-10 9" />

          <path className="v6-signal-soft" d="M136 73H84" />
          <path className="v6-signal-soft" d="m94 65-10 8 10 8" />
        </svg>
      )}

      {type === "m365-security" && (
        <svg viewBox="0 0 220 125">
          <rect className="v6-ms ms1" x="36" y="32" width="27" height="27" rx="4" />
          <rect className="v6-ms ms2" x="68" y="32" width="27" height="27" rx="4" />
          <rect className="v6-ms ms3" x="36" y="64" width="27" height="27" rx="4" />
          <rect className="v6-ms ms4" x="68" y="64" width="27" height="27" rx="4" />

          <path
            className="v6-shield"
            d="M153 19 196 35v25c0 23-14 36-43 46-29-10-43-23-43-46V35l43-16Z"
          />

          <rect className="v6-panel" x="140" y="49" width="27" height="25" rx="6" />
          <path className="v6-accent" d="M145 49v-6c0-7 4-12 9-12s9 5 9 12v6" />
        </svg>
      )}
      {type === "diagnostic" && (
        <svg viewBox="0 0 220 125">
          <rect className="v6-screen" x="28" y="23" width="113" height="75" rx="10" />
          <path className="v6-detail" d="M47 45h51M47 58h37" />

          <circle className="v6-panel" cx="157" cy="68" r="27" />
          <circle className="v6-accent-ring" cx="157" cy="68" r="16" />
          <path className="v6-accent" d="m176 87 19 17" />
        </svg>
      )}
    </div>
  );
}
export default function ServiceDetail({
  service,
}: Props) {
  const featureVisuals =
    serviceVisualMap[service.slug] ?? [
      "system-scan",
      "installation",
      "backup-flow",
      "completed",
    ];

  return (
    <main className={`service-v2 service-v2-${service.slug}`}>

      <section className="service-v2-hero">
        <div className="premium-shell service-v2-hero-grid">

          <div className="service-v2-hero-copy">

            <Link
              href="/tjanster"
              className="service-v2-back"
            >
              <span aria-hidden="true">←</span>
              Alla tjänster
            </Link>

            <p className="premium-eyebrow">
              {service.eyebrow}
            </p>

            <h1>
              {service.title}
            </h1>

            <p className="service-v2-lead">
              {service.intro}
            </p>

            <div
              className="service-v2-audience"
              aria-label="Passar för"
            >
              {service.audience.map((item) => (
                <span key={item}>
                  {item}
                </span>
              ))}
            </div>

            <div className="service-v2-actions">

              <Link
                href="/support?intent=booking#support-form"
                className="premium-button primary"
              >
                Boka support
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                href="/kontakt"
                className="premium-button secondary"
              >
                Kontakta oss
                <span aria-hidden="true">→</span>
              </Link>

            </div>

          </div>


          <div className="service-v2-hero-media">

            <Image
              src={service.image}
              alt=""
              fill
              priority
              sizes="(max-width: 900px) 100vw, 52vw"
              className="service-v2-hero-image"
            />

            <div
              className="service-v2-media-shade"
              aria-hidden="true"
            />

            <div className="service-v2-media-note">

              <span>
                PERSONLIG SUPPORT
              </span>

              <strong>
                På plats eller på distans.
              </strong>

            </div>

          </div>

        </div>
      </section>


      <section className="service-v2-intro premium-section">

        <div className="premium-shell service-v2-intro-grid">

          <div>

            <p className="premium-eyebrow">
              SÅ HJÄLPER VI DIG
            </p>

            <h2>
              Rätt hjälp för just den teknik du använder.
            </h2>

          </div>


          <div className="service-v2-intro-copy">

            <p>
              {service.description}
            </p>

            <p>
              {service.result}
            </p>

          </div>

        </div>

      </section>


      <section className="service-v2-features">

        <div className="premium-shell">

          <div className="service-v2-section-head">

            <div>

              <p className="premium-eyebrow">
                DET HÄR KAN VI HJÄLPA MED
              </p>

              <h2>
                Tydlig hjälp från problem till lösning.
              </h2>

            </div>

            <p>
              Vi fokuserar på det som behöver fungera i
              vardagen och förklarar lösningen på ett sätt
              som är lätt att förstå.
            </p>

          </div>


          <div className="service-v2-feature-grid">

            {service.features.map(
              (feature, index) => (
                <article
                  className="service-v2-feature-card"
                  key={feature.number}
                >

                  <div className="service-v2-feature-top">

                    <span className="service-v2-feature-number">
                      {feature.number}
                    </span>

                    <span
                      className="service-v2-feature-live"
                      aria-hidden="true"
                    >
                      <i />
                    </span>

                  </div>


                  <FeatureVisual
                    type={featureVisuals[index]}
                  />


                  <div className="service-v2-feature-copy">

                    <h3>
                      {feature.title}
                    </h3>

                    <p>
                      {feature.text}
                    </p>

                  </div>

                </article>
              )
            )}

          </div>

        </div>

      </section>


      <section className="service-v2-needs">

        <div className="premium-shell">

          <div className="service-v2-section-head">

            <div>

              <p className="premium-eyebrow">
                VANLIGA BEHOV
              </p>

              <h2>
                Känner du igen något av det här?
              </h2>

            </div>

            <p>
              Du behöver inte veta exakt vad felet beror på.
              Beskriv vad du upplever så hjälper vi dig att
              hitta rätt väg vidare.
            </p>

          </div>


          {service.slug === "foretagssupport" ? (
            <div className="service-v2-needs-grid">

              {service.problems.map(
                (problem, index) => (
                  <article key={problem}>

                    <span>
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <strong>
                      {problem}
                    </strong>

                  </article>
                )
              )}

            </div>
          ) : (
            <div className="service-v2-needs-grid">

              {service.problems.map(
                (problem, index) => (
                  <article
                    className="service-v3-problem-card"
                    key={problem}
                  >

                    <ServiceProblemVisual
                      problem={problem}
                      serviceSlug={service.slug}
                    />

                    <div className="service-v5-problem-meta">

                      <span className="service-v3-problem-number">
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <span className="service-v5-problem-status">
                        Vi hjälper dig
                      </span>

                    </div>

                    <div className="service-v3-problem-copy">

                      <span className="service-v3-problem-label">
                        VANLIGT BEHOV
                      </span>

                      <h3>
                        {problem}
                      </h3>

                      <p>
                        Vi hjälper dig att förstå orsaken och
                        hitta en tydlig lösning som passar
                        just din situation.
                      </p>

                    </div>

                  </article>
                )
              )}

            </div>
          )}

        </div>

      </section>


      <section className="service-v2-value">

        <div className="premium-shell service-v2-value-panel">

          <div className="service-v2-value-copy">

            <p className="premium-eyebrow">
              DET HÄR FÅR DU
            </p>

            <h2>
              Support som ska kännas tydlig även efteråt.
            </h2>

            <p>
              Vi arbetar personligt och lösningsorienterat.
              Målet är inte bara att lösa problemet, utan att
              du också ska förstå vad som har gjorts.
            </p>

          </div>


          <div className="service-v2-benefits">

            {service.benefits.map(
              (benefit) => (
                <div key={benefit}>

                  <span aria-hidden="true">
                    ✓
                  </span>

                  <strong>
                    {benefit}
                  </strong>

                </div>
              )
            )}

          </div>

        </div>

      </section>


      <section className="service-v2-final">

        <div className="premium-shell">

          <div className="service-v2-final-inner">

            <div>

              <p className="premium-eyebrow">
                REDO ATT FÅ HJÄLP?
              </p>

              <h2>
                Berätta vad som krånglar.
              </h2>

              <p>
                Du behöver inte välja rätt teknisk lösning
                själv. Börja med att beskriva behovet så
                hjälper vi dig vidare.
              </p>

            </div>


            <div className="service-v2-final-actions">

              <Link
                href="/support?intent=booking#support-form"
                className="premium-button primary"
              >
                Boka support
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                href="/kontakt"
                className="premium-button secondary"
              >
                Kontakta oss
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}