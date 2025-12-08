"use client";

import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function PageHeader() {
  const t = useTranslations("common");

  return (
    <header className="w-full flex flex-col items-center justify-center text-center">
      <div className="absolute top-4 right-4 z-30">
        <LanguageSwitcher />
      </div>
      <div className="relative mb-8">
        <h1 className="monument-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
          {t("title")}
        </h1>
        <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 transform rotate-45 opacity-30 rounded-lg"></div>
        <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 transform -rotate-12 opacity-30 rounded-full"></div>
      </div>

      <p className="monument-subtitle text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto mb-8 px-4">
        {t("subtitle")}
      </p>

      <div className="flex justify-center gap-3">
        <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
        <div
          className="w-3 h-3 bg-pink-400 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </header>
  );
}
