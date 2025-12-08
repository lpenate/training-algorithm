import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Providers } from "../providers";
import { LocaleSetter } from "../components/LocaleSetter";
import { locales } from "../../i18n/request";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }> | { locale: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const locale = resolvedParams?.locale || "es";

  if (!locale || !locales.includes(locale as (typeof locales)[number])) {
    console.error(`Invalid locale in layout: ${locale}`);
    notFound();
  }

  let messages;
  try {
    messages = await getMessages({ locale });
  } catch (error) {
    console.error("Error loading messages:", error);
    messages = {};
  }

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <LocaleSetter />
      <Providers>{children}</Providers>
    </NextIntlClientProvider>
  );
}
