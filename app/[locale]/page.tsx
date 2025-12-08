"use client";

import { useState, useMemo } from "react";
import { GeometricShapes } from "../components/GeometricShapes";
import { AlgorithmCard } from "../components/AlgorithmCard";
import { PageHeader } from "../components/PageHeader";
import { FilterBar } from "../components/FilterBar";
import algorithmsData from "../../data/algorithms.json";
import { useTranslations } from "next-intl";

interface Algorithm {
  id: string;
  name: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  color: string;
}

const baseAlgorithms: Algorithm[] = algorithmsData as Algorithm[];

export default function Home() {
  const t = useTranslations();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null
  );

  const algorithms = useMemo(() => {
    return baseAlgorithms.map(alg => ({
      id: alg.id,
      name: t(`algorithms.${alg.id}.name`),
      category: t(`categories.${alg.category}`),
      difficulty: alg.difficulty,
      description: t(`algorithms.${alg.id}.description`),
      color: alg.color,
    }));
  }, [t]);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(algorithms.map(alg => alg.category))
    );
    return uniqueCategories.sort();
  }, [algorithms]);

  const filteredAlgorithms = useMemo(() => {
    return algorithms.filter(algorithm => {
      const matchesCategory =
        selectedCategory === null || algorithm.category === selectedCategory;
      const matchesDifficulty =
        selectedDifficulty === null ||
        algorithm.difficulty === selectedDifficulty;
      return matchesCategory && matchesDifficulty;
    });
  }, [algorithms, selectedCategory, selectedDifficulty]);

  return (
    <main className="min-h-screen relative z-10">
      <GeometricShapes />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="w-full flex justify-center items-center">
            <PageHeader />
          </div>

          <FilterBar
            categories={categories}
            selectedCategory={selectedCategory}
            selectedDifficulty={selectedDifficulty}
            onCategoryChange={setSelectedCategory}
            onDifficultyChange={setSelectedDifficulty}
          />

          {filteredAlgorithms.length === 0 ? (
            <div className="text-center py-12">
              <p className="monument-text text-xl" style={{ color: "#ffffff" }}>
                {t("messages.noResults")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
              {filteredAlgorithms.map((algorithm, index) => (
                <AlgorithmCard
                  key={algorithm.id}
                  algorithm={algorithm}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .group {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </main>
  );
}
