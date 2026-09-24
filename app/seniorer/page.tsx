import AudienceDetail from "../../components/AudienceDetail";
import { getAudience } from "../../lib/audiences";

export default function SeniorerPage() {
  const audience = getAudience("seniorer");

  if (!audience) return null;

  return (
    <>
      <AudienceDetail audience={audience} />
    </>
  );
}
