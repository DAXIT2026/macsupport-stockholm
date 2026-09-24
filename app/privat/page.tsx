import AudienceDetail from "../../components/AudienceDetail";
import { getAudience } from "../../lib/audiences";

export default function PrivatPage() {
  const audience = getAudience("privat");

  if (!audience) return null;

  return (
    <>
      <AudienceDetail audience={audience} />
    </>
  );
}
