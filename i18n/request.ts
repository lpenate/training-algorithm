import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  const validLocale = (locale || "es") as Locale;

  if (!locales.includes(validLocale)) {
    console.error(`Invalid locale: ${locale}, falling back to es`);
    notFound();
  }

  return {
    locale: validLocale,
    messages: (await import(`../messages/${validLocale}.json`)).default,
  };
});
