import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Mac-support",
    category: "MAC & APPLE",
    description:
      "Felsökning, installation, uppdateringar, backup och personlig hjälp med din Mac.",
    image: "/images/mac-support-repair.jpg",
    href: "/tjanster/mac-support",
  },
  {
    title: "WiFi & nätverk",
    category: "NÄTVERK",
    description:
      "Stabilt WiFi, bättre täckning, mesh-system, routerhjälp och nätverksinstallation.",
    image: "/images/wifi-network.jpg",
    href: "/tjanster/wifi-natverk",
  },
  {
    title: "IT-säkerhet & backup",
    category: "SÄKERHET",
    description:
      "Skydd för datorer, konton och filer med backup, 2FA och säkra inställningar.",
    image: "/images/security-backup.jpg",
    href: "/tjanster/it-sakerhet",
  },
  {
    title: "Microsoft 365",
    category: "FÖRETAG",
    description:
      "Outlook, Teams, OneDrive och Microsoft 365 anpassat efter verksamheten.",
    image: "/images/microsoft-365-support.jpg",
    href: "/tjanster/microsoft-365",
  },
  {
    title: "Fjärrsupport",
    category: "SNABB HJÄLP",
    description:
      "Säker hjälp på distans när problemet kan lösas utan ett hembesök.",
    image: "/images/remote-support.jpg",
    href: "/tjanster/fjarrsupport",
  },
  {
    title: "Kameraövervakning",
    category: "UNIFI PROTECT",
    description:
      "Moderna kameror, smarta notiser och trygg fjärråtkomst för hem och företag.",
    image: "/images/camera-unifi-protect.jpg",
    href: "/tjanster/kameraovervakning",
  },
];

export default function ServicesSection() {
  return (
    <section
      className="services-section premium-section"
      id="tjanster"
    >
      <div className="premium-shell">

        <div className="services-heading-row">

          <div className="premium-heading">

            <p className="premium-eyebrow">
              VÅRA TJÄNSTER
            </p>

            <h2>
              Rätt hjälp för
              <br />
              varje situation.
            </h2>

            <p>
              Från Mac och WiFi till säkerhet,
              Microsoft 365 och fjärrsupport.
              Du får personlig hjälp utan onödigt teknikspråk.
            </p>

          </div>

          <Link
            href="/support?intent=booking#support-form"
            className="services-all-link"
          >
            Boka support
            <span>→</span>
          </Link>

        </div>


        <div className="services-grid">

          {services.map((service) => (

            <article
              className="service-card"
              key={service.title}
            >

              <Link
                href={service.href}
                className="service-card-image"
                aria-label={`Läs mer om ${service.title}`}
              >

                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 800px) 100vw, 50vw"
                />

                <div className="service-card-overlay" />



                <span className="service-image-arrow">
                  ↗
                </span>

              </Link>

              <div className="service-card-content">

                <span className="service-category">
                  {service.category}
                </span>

                <h3>
                  <Link href={service.href}>
                    {service.title}
                  </Link>
                </h3>

                <p>
                  {service.description}
                </p>

                <Link href={service.href}>
                  Utforska tjänsten
                  <span>→</span>
                </Link>

              </div>

            </article>

          ))}

        </div>

      </div>
    </section>
  );
}
