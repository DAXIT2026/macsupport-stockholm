import AudienceDetail from "../../components/AudienceDetail";
import { getAudience } from "../../lib/audiences";

export default function ForetagPage() {
  const audience = getAudience("foretag");

  if (!audience) return null;

  return (
    <>
      <AudienceDetail audience={audience} />
    </>
  );
}



