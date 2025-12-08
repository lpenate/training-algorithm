"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Chip } from "@mui/material";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
    router.refresh();
  };

  return (
    <div className="flex gap-2 items-center">
      <Chip
        label="ES"
        onClick={() => switchLocale("es")}
        sx={{
          backgroundColor:
            locale === "es"
              ? "rgba(255, 255, 255, 0.4)"
              : "rgba(255, 255, 255, 0.2)",
          color: "white",
          fontWeight: 600,
          backdropFilter: "blur(10px)",
          cursor: "pointer",
          border:
            locale === "es"
              ? "2px solid rgba(255, 255, 255, 0.6)"
              : "2px solid transparent",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.3)",
          },
        }}
      />
      <Chip
        label="EN"
        onClick={() => switchLocale("en")}
        sx={{
          backgroundColor:
            locale === "en"
              ? "rgba(255, 255, 255, 0.4)"
              : "rgba(255, 255, 255, 0.2)",
          color: "white",
          fontWeight: 600,
          backdropFilter: "blur(10px)",
          cursor: "pointer",
          border:
            locale === "en"
              ? "2px solid rgba(255, 255, 255, 0.6)"
              : "2px solid transparent",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.3)",
          },
        }}
      />
    </div>
  );
}
