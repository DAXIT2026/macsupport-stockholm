"use client";

import { usePathname } from "next/navigation";
import SplashIntro from "./SplashIntro";

export default function RouteSplash() {
  const pathname = usePathname();

  return <SplashIntro key={pathname} />;
}
