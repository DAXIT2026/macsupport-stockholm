import { notFound } from "next/navigation";
import type { Metadata } from "next";

import ServiceDetail from "../../../components/ServiceDetail";
import RelatedLinksSection, { supportLinks } from "../../../components/RelatedLinksSection";

import {
  getService,
  services,
} from "../../../lib/services";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const service = getService(slug);

  if (!service) {
    return {};
  }

  return {
    title: `${service.shortTitle} | Macsupport Stockholm`,
    description: service.intro,
  };
}

export default async function ServicePage({
  params,
}: Props) {
  const { slug } = await params;

  const service = getService(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <ServiceDetail service={service} />
      {service.slug === "it-sakerhet" && (
        <RelatedLinksSection
          title="Mer IT-support och säkerhet"
          description="Läs mer om IT-support, supportavtal och Microsoft 365 hos Min Datorsupport."
          links={supportLinks}
        />
      )}
    </>
  );
}
