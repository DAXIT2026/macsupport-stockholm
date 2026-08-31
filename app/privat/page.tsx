import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AudienceDetail from "../../components/AudienceDetail";
import { getAudience } from "../../lib/audiences";

export default function PrivatPage() {
  const audience = getAudience("privat");

  if (!audience) return null;

  return (
    <>
      <Header />
      <AudienceDetail audience={audience} />
      <Footer />
    </>
  );
}
