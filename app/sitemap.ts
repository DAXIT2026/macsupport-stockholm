import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.macsupportstockholm.se";

  const routes = [
    "",
    "/privat",
    "/seniorer",
    "/foretag",
    "/tjanster",

    "/tjanster/mac-support",
    "/tjanster/fjarrsupport",
    "/tjanster/wifi-natverk",
    "/tjanster/it-sakerhet",
    "/tjanster/kameraovervakning",
    "/tjanster/microsoft-365",
    "/tjanster/foretagssupport",

    "/priser",
    "/sa-fungerar-det",
    "/om-oss",
    "/kontakt",
    "/boka",
    "/support",
    "/integritet",
    "/cookies",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : route === "/kontakt" || route === "/boka"
          ? 0.9
          : route.startsWith("/tjanster/")
            ? 0.9
            : 0.8,
  }));
}