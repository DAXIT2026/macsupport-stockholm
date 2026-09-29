import Image from "next/image";
import Link from "next/link";

import {
  unifiProducts,
  type UniFiProduct,
} from "../lib/unifi-products";

type Props = {
  serviceSlug: string;
};

function ProductCard({
  product,
}: {
  product: UniFiProduct;
}) {
  return (
    <article className="unifi-product-card">
      <div className="unifi-product-image-wrap">
        <Image
          src={product.image}
          alt={`Illustration av ${product.name}`}
          fill
          sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 25vw"
          className="unifi-product-image"
        />
      </div>

      <div className="unifi-product-content">
        <p className="unifi-product-label">UniFi</p>

        <h3>{product.name}</h3>

        <p className="unifi-product-description">
          {product.description}
        </p>

        <div
          className="unifi-product-specs"
          aria-label={`Egenskaper för ${product.name}`}
        >
          {product.specs.map((spec) => (
            <span key={spec}>{spec}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function UniFiProductShowcase({
  serviceSlug,
}: Props) {
  if (
    serviceSlug !== "kameraovervakning" &&
    serviceSlug !== "wifi-natverk"
  ) {
    return null;
  }

  const isCamera = serviceSlug === "kameraovervakning";
  const products = unifiProducts[serviceSlug];

  return (
    <section
      className="unifi-showcase"
      aria-labelledby={`unifi-${serviceSlug}-title`}
    >
      <div className="premium-shell">

        <header className="unifi-showcase-header">
          <div>
            <p className="premium-eyebrow">
              {isCamera ? "UNIFI PROTECT" : "UNIFI NETWORK"}
            </p>

            <h2 id={`unifi-${serviceSlug}-title`}>
              {isCamera
                ? "UniFi-kameror för olika miljöer"
                : "UniFi för stabila och moderna nätverk"}
            </h2>
          </div>

          <div className="unifi-showcase-copy">
            <span
              className="unifi-showcase-copy-check"
              aria-hidden="true"
            >
              ✓
            </span>

            <span className="unifi-showcase-copy-accent" aria-hidden="true" />

            <p className="unifi-showcase-copy-label">
              {isCamera ? "UNIFI PROTECT" : "UNIFI NETWORK"}
            </p>

            <strong>
              {isCamera
                ? "Rätt kamera för rätt miljö."
                : "Rätt utrustning för ett stabilt nätverk."}
            </strong>

            <p>
              {isCamera
                ? "Vi hjälper dig att välja rätt kameror och utrustning utifrån miljön, behovet och installationens förutsättningar."
                : "Vi hjälper dig att välja rätt accesspunkter, switchar och nätverksutrustning för hem, kontor och verksamheter."}
            </p>
          </div>
        </header>

        <div className="unifi-product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.name}
              product={product}
            />
          ))}
        </div>

        <footer className="unifi-showcase-footer">
          <div className="unifi-showcase-footer-copy">
            <span className="unifi-showcase-footer-label">
              INSTALLATION & SUPPORT
            </span>

            <strong>
              {isCamera
                ? "Vi hjälper dig hela vägen med din UniFi Protect-lösning."
                : "Vi hjälper dig hela vägen med ditt UniFi-nätverk."}
            </strong>

            <p>
              {isCamera
                ? "Från val och placering av kameror till installation, nätverksanslutning och konfiguration."
                : "Från val av rätt utrustning till installation, kabelanslutning och professionell konfiguration."}
            </p>
          </div>

          <Link
            href="/support?intent=booking#support-form"
            className="premium-button primary"
          >
            Boka installation
            <span aria-hidden="true">→</span>
          </Link>
        </footer>

      </div>
    </section>
  );
}


