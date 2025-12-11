"use client";

import { Card, Chip, Box } from "@mui/material";
import type { ChipProps } from "@mui/material";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import algorithmsData from "../../data/algorithms.json";

interface Algorithm {
  id: string;
  name: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  color: string;
}

interface AlgorithmCardProps {
  algorithm: Algorithm;
  index: number;
}

const baseAlgorithms: Algorithm[] = algorithmsData as Algorithm[];

const getNameSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const getEnglishName = (id: string): string => {
  const baseAlgorithm = baseAlgorithms.find(alg => alg.id === id);
  return baseAlgorithm?.name || "";
};

const getDifficultyColor = (difficulty: string): ChipProps["color"] => {
  switch (difficulty) {
    case "Easy":
      return "success";
    case "Medium":
      return "warning";
    case "Hard":
      return "error";
    default:
      return "default";
  }
};

const getDifficultyLabel = (difficulty: string, t: (key: string) => string) => {
  switch (difficulty) {
    case "Easy":
      return t("algorithm.levelEasy");
    case "Medium":
      return t("algorithm.levelMedium");
    case "Hard":
      return t("algorithm.levelHard");
    default:
      return t("algorithm.levelUnknown");
  }
};

const getGradientColors = (colorClass: string) => {
  const gradientMap: Record<string, { from: string; to: string }> = {
    "from-pink-500 to-rose-500": {
      from: "rgb(236, 72, 153)",
      to: "rgb(244, 63, 94)",
    },
    "from-purple-500 to-indigo-500": {
      from: "rgb(168, 85, 247)",
      to: "rgb(99, 102, 241)",
    },
    "from-blue-500 to-cyan-500": {
      from: "rgb(59, 130, 246)",
      to: "rgb(6, 182, 212)",
    },
    "from-green-500 to-emerald-500": {
      from: "rgb(34, 197, 94)",
      to: "rgb(16, 185, 129)",
    },
    "from-yellow-500 to-orange-500": {
      from: "rgb(234, 179, 8)",
      to: "rgb(249, 115, 22)",
    },
    "from-red-500 to-pink-500": {
      from: "rgb(239, 68, 68)",
      to: "rgb(236, 72, 153)",
    },
    "from-violet-500 to-purple-500": {
      from: "rgb(139, 92, 246)",
      to: "rgb(168, 85, 247)",
    },
    "from-teal-500 to-cyan-500": {
      from: "rgb(20, 184, 166)",
      to: "rgb(6, 182, 212)",
    },
    "from-amber-500 to-yellow-500": {
      from: "rgb(245, 158, 11)",
      to: "rgb(234, 179, 8)",
    },
    "from-fuchsia-500 to-pink-500": {
      from: "rgb(217, 70, 239)",
      to: "rgb(236, 72, 153)",
    },
    "from-indigo-500 to-blue-500": {
      from: "rgb(99, 102, 241)",
      to: "rgb(59, 130, 246)",
    },
    "from-rose-500 to-red-500": {
      from: "rgb(244, 63, 94)",
      to: "rgb(239, 68, 68)",
    },
  };

  return (
    gradientMap[colorClass] || {
      from: "rgb(168, 85, 247)",
      to: "rgb(99, 102, 241)",
    }
  );
};

const CardBackgroundLayers = ({ color }: { color: string }) => {
  const gradient = getGradientColors(color);

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to bottom right, ${gradient.from}, ${gradient.to})`,
          opacity: 0.8,
          zIndex: 1,
        }}
      />
    </>
  );
};

const AlgorithmTitle = ({ name }: { name: string }) => (
  <Box
    sx={{
      position: "relative",
      zIndex: 20,
      mb: 1,
    }}
  >
    <h2
      className="monument-text text-xl font-bold"
      style={{
        color: "#ffffff",
        position: "relative",
        zIndex: 20,
        textShadow:
          "2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      {name}
    </h2>
  </Box>
);

const DifficultyInfo = ({
  difficulty,
  t,
}: {
  difficulty: string;
  t: (key: string) => string;
}) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 2,
    }}
  >
    <span
      className="monument-label text-xs"
      style={{ color: "#ffffff", position: "relative", zIndex: 20 }}
    >
      {getDifficultyLabel(difficulty, t)}
    </span>
    <Chip
      color={getDifficultyColor(difficulty)}
      label={difficulty}
      size="small"
      sx={{
        fontWeight: "bold",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        position: "relative",
        zIndex: 20,
      }}
    />
  </Box>
);

const CategoryInfo = ({
  category,
  t,
}: {
  category: string;
  t: (key: string) => string;
}) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 2,
    }}
  >
    <span
      className="monument-label text-xs"
      style={{ color: "#ffffff", position: "relative", zIndex: 20 }}
    >
      {t("algorithm.type")}
    </span>
    <Chip
      label={category}
      size="small"
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        color: "white",
        fontWeight: 600,
        backdropFilter: "blur(10px)",
        position: "relative",
        zIndex: 20,
      }}
    />
  </Box>
);

const AlgorithmCardHeader = ({
  algorithm,
  t,
}: {
  algorithm: Algorithm;
  t: (key: string) => string;
}) => (
  <Box
    sx={{
      px: 4,
      py: 4,
      display: "flex",
      flexDirection: "column",
      gap: 2,
      position: "relative",
      zIndex: 20,
      minWidth: "280px",
      flexShrink: 0,
    }}
  >
    <AlgorithmTitle name={algorithm.name} />
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        position: "relative",
        zIndex: 20,
      }}
    >
      <DifficultyInfo difficulty={algorithm.difficulty} t={t} />
      <CategoryInfo category={algorithm.category} t={t} />
    </Box>
  </Box>
);

const AlgorithmCardContent = ({
  description,
  t,
}: {
  description: string;
  t: (key: string) => string;
}) => (
  <Box
    className="relative flex-grow"
    sx={{
      px: 4,
      py: 4,
      position: "relative",
      zIndex: 20,
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Box sx={{ mb: 2 }}>
      <span
        className="monument-label text-xs block mb-2"
        style={{ color: "#ffffff", position: "relative", zIndex: 20 }}
      >
        {t("algorithm.description")}
      </span>
    </Box>
    <p
      className="monument-description text-sm leading-relaxed"
      style={{ color: "#ffffff", position: "relative", zIndex: 20 }}
    >
      {description}
    </p>
  </Box>
);

export function AlgorithmCard({ algorithm, index }: AlgorithmCardProps) {
  const t = useTranslations();

  return (
    <article
      className="relative group h-full p-4 m-3"
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300 blur-sm"></div>

      <Link
        href={`/algorithms/${getNameSlug(getEnglishName(algorithm.id))}`}
        style={{ textDecoration: "none" }}
      >
        <Card
          className="relative shadow-2xl h-full flex flex-row transform transition-all duration-300 hover:scale-105 hover:shadow-3xl hover:-translate-y-2 rounded-2xl overflow-hidden cursor-pointer"
          sx={{
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.8)",
            borderRadius: "10px",
            padding: "10px",
            margin: "10px",
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.5)",
            position: "relative",
            minHeight: "200px",
          }}
        >
          <CardBackgroundLayers color={algorithm.color} />
          <AlgorithmCardHeader algorithm={algorithm} t={t} />
          <Box
            sx={{
              width: "1px",
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              my: 3,
              flexShrink: 0,
              position: "relative",
              zIndex: 20,
            }}
          />
          <AlgorithmCardContent description={algorithm.description} t={t} />
        </Card>
      </Link>
    </article>
  );
}
