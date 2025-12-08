"use client";

import { Chip, Box } from "@mui/material";
import type { ChipProps } from "@mui/material";
import { useTranslations } from "next-intl";

interface FilterBarProps {
  categories: string[];
  selectedCategory: string | null;
  selectedDifficulty: string | null;
  onCategoryChange: (category: string | null) => void;
  onDifficultyChange: (difficulty: string | null) => void;
}

const getDifficulties = (
  t: (key: string) => string
): Array<{
  label: string;
  value: string;
  color: ChipProps["color"];
}> => [
  { label: t("filters.easy"), value: "Easy", color: "success" },
  { label: t("filters.medium"), value: "Medium", color: "warning" },
  { label: t("filters.hard"), value: "Hard", color: "error" },
];

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryClick: (category: string) => void;
}

interface CategoryFilterPropsWithT extends CategoryFilterProps {
  t: (key: string) => string;
}

const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategoryClick,
  t,
}: CategoryFilterPropsWithT) => (
  <Box>
    <h3 className="monument-label text-sm mb-3" style={{ color: "#ffffff" }}>
      {t("filters.filterByType")}
    </h3>
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      {categories.map(category => (
        <Chip
          key={category}
          label={category}
          onClick={() => onCategoryClick(category)}
          sx={{
            backgroundColor:
              selectedCategory === category
                ? "rgba(255, 255, 255, 0.4)"
                : "rgba(255, 255, 255, 0.2)",
            color: "white",
            fontWeight: 600,
            backdropFilter: "blur(10px)",
            cursor: "pointer",
            border:
              selectedCategory === category
                ? "2px solid rgba(255, 255, 255, 0.6)"
                : "2px solid transparent",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.3)",
            },
          }}
        />
      ))}
    </Box>
  </Box>
);

interface DifficultyFilterProps {
  selectedDifficulty: string | null;
  onDifficultyClick: (difficulty: string) => void;
  t: (key: string) => string;
}

const DifficultyFilter = ({
  selectedDifficulty,
  onDifficultyClick,
  t,
}: DifficultyFilterProps) => {
  const difficulties = getDifficulties(t);

  return (
    <Box>
      <h3 className="monument-label text-sm mb-3" style={{ color: "#ffffff" }}>
        {t("filters.filterByDifficulty")}
      </h3>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {difficulties.map(difficulty => (
          <Chip
            key={difficulty.value}
            label={difficulty.label}
            color={difficulty.color}
            onClick={() => onDifficultyClick(difficulty.value)}
            sx={{
              fontWeight: 600,
              cursor: "pointer",
              border:
                selectedDifficulty === difficulty.value
                  ? "2px solid rgba(255, 255, 255, 0.6)"
                  : "2px solid transparent",
              opacity:
                selectedDifficulty === null ||
                selectedDifficulty === difficulty.value
                  ? 1
                  : 0.5,
              "&:hover": {
                opacity: 1,
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export function FilterBar({
  categories,
  selectedCategory,
  selectedDifficulty,
  onCategoryChange,
  onDifficultyChange,
}: FilterBarProps) {
  const t = useTranslations();

  const handleCategoryClick = (category: string) => {
    onCategoryChange(selectedCategory === category ? null : category);
  };

  const handleDifficultyClick = (difficulty: string) => {
    onDifficultyChange(selectedDifficulty === difficulty ? null : difficulty);
  };

  return (
    <Box
      sx={{
        mb: 6,
        position: "relative",
        zIndex: 20,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryClick={handleCategoryClick}
          t={t}
        />
        <DifficultyFilter
          selectedDifficulty={selectedDifficulty}
          onDifficultyClick={handleDifficultyClick}
          t={t}
        />
      </Box>
    </Box>
  );
}
