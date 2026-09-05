type Props = {
  service: string;
  index: number;
};

const visualTypes: Record<string, string[]> = {
  "mac-support": [
    "scan",
    "update",
    "transfer",
    "mail",
  ],

  "fjarrsupport": [
    "remote",
    "secure",
    "apps",
    "complete",
  ],

  "wifi-natverk": [
    "wifi",
    "mesh",
    "cable",
    "network",
  ],

  "it-sakerhet": [
    "backup",
    "twofactor",
    "shield",
    "checklist",
  ],

  "kameraovervakning": [
    "camera",
    "install",
    "mobile",
    "protect",
  ],

  "microsoft-365": [
    "outlook",
    "teams",
    "onedrive",
    "users",
  ],

  "foretagssupport": [
    "supportflow",
    "workstation",
    "businesscloud",
    "businesssecurity",
  ],
};

export default function ServiceFeatureVisual({
  service,
  index,
}: Props) {
  const type =
    visualTypes[service]?.[index] ?? "scan";

  return (
    <div
      className={`service-feature-visual visual-${type}`}
      aria-hidden="true"
    >
      <span className="sfv-orbit sfv-orbit-one" />
      <span className="sfv-orbit sfv-orbit-two" />

      <span className="sfv-core">
        <i className="sfv-core-icon" />
        <i className="sfv-core-line sfv-line-one" />
        <i className="sfv-core-line sfv-line-two" />
        <i className="sfv-core-line sfv-line-three" />
      </span>

      <span className="sfv-node sfv-node-one" />
      <span className="sfv-node sfv-node-two" />
      <span className="sfv-node sfv-node-three" />

      <span className="sfv-pulse" />
      <span className="sfv-status" />
    </div>
  );
}