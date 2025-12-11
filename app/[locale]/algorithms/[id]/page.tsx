"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Box, Card, Chip, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import algorithmsData from "../../../../data/algorithms.json";
import { GeometricShapes } from "@/app/components/GeometricShapes";
import { CodeEditor } from "@/app/components/CodeEditor";

interface Algorithm {
  id: string;
  name: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  color: string;
  alternativeId: string | null;
}

const baseAlgorithms: Algorithm[] = algorithmsData as Algorithm[];

const getNameSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const findAlgorithmBySlug = (slug: string): Algorithm | undefined => {
  return baseAlgorithms.find(alg => {
    const englishName = alg.name;
    const algorithmSlug = getNameSlug(englishName);
    return algorithmSlug === slug;
  });
};

const getDifficultyColor = (difficulty: string) => {
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

const NotFoundView = ({ t }: { t: (key: string) => string }) => (
  <main className="min-h-screen relative z-10">
    <GeometricShapes />
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1
          className="monument-text text-2xl mb-4"
          style={{ color: "#ffffff" }}
        >
          {t("algorithmDetail.notFound")}
        </h1>
        <Button
          component={Link}
          href="/"
          startIcon={<ArrowBack />}
          variant="contained"
        >
          {t("algorithmDetail.backToHome")}
        </Button>
      </div>
    </div>
  </main>
);

const AlgorithmHeader = ({
  name,
  difficulty,
  category,
}: {
  name: string;
  difficulty: string;
  category: string;
}) => (
  <>
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
      <h1
        className="monument-text text-3xl font-bold"
        style={{
          color: "#ffffff",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
        }}
      >
        {name}
      </h1>
      <Chip
        color={getDifficultyColor(difficulty)}
        label={difficulty}
        sx={{ fontWeight: "bold" }}
      />
    </Box>
    <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
      <Chip
        label={category}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          color: "white",
          fontWeight: 600,
          backdropFilter: "blur(10px)",
        }}
      />
    </Box>
  </>
);

const SectionBox = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Box sx={{ mb: 4 }}>
    <h2 className="monument-label text-lg mb-2" style={{ color: "#ffffff" }}>
      {title}
    </h2>
    {children}
  </Box>
);

const UseCasesList = ({ useCases }: { useCases: string[] }) => (
  <ul
    className="monument-description text-base leading-relaxed"
    style={{ color: "#ffffff", paddingLeft: "24px" }}
  >
    {useCases.map((useCase: string, index: number) => (
      <li key={index} style={{ marginBottom: "8px" }}>
        {useCase}
      </li>
    ))}
  </ul>
);

const exerciseTemplates: Record<string, string[]> = {
  "1": [
    `// Exercise 1: Search in sorted list
// Given a sorted array of 1,000,000 elements and a target value, 
// find its index in O(log n) using binary search

// Test array (simulated with a smaller array)
const arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29];
const target = 15;

// TODO: Implement the binarySearch function
function binarySearch(arr: number[], target: number): number {
  // Your code here
  return -1;
}

// Test function
function testBinarySearch() {
  const result = binarySearch(arr, target);
  const expectedIndex = arr.indexOf(target);
  console.log(\`Array: [\${arr.join(", ")}]\`);
  console.log(\`Target: \${target}\`);
  console.log(\`Result: \${result}\`);
  console.log(\`Expected: \${expectedIndex}\`);
  console.log(\`Test: \${result === expectedIndex ? "✅ PASSED" : "❌ FAILED"}\`);
}

testBinarySearch();`,
    `// Exercise 2: Range search
// In a sorted array of integers, find the first and last index 
// of a target value using binary search

const arr = [1, 2, 2, 2, 3, 4, 4, 4, 4, 5, 6];
const target = 2;

// TODO: Implement the function to find the range
function findRange(arr: number[], target: number): [number, number] {
  // Your code here
  return [-1, -1];
}

// Test function
function testFindRange() {
  const [first, last] = findRange(arr, target);
  const expectedFirst = arr.indexOf(target);
  const expectedLast = arr.lastIndexOf(target);
  console.log(\`Array: [\${arr.join(", ")}]\`);
  console.log(\`Target: \${target}\`);
  console.log(\`Result: [\${first}, \${last}]\`);
  console.log(\`Expected: [\${expectedFirst}, \${expectedLast}]\`);
  console.log(\`Test: \${first === expectedFirst && last === expectedLast ? "✅ PASSED" : "❌ FAILED"}\`);
}

testFindRange();`,
    `// Exercise 3: Search in rotated array
// Given a rotated sorted array, find the minimum element using modified binary search

const arr = [5, 6, 7, 1, 2, 3, 4];

// TODO: Implement the function to find the minimum in rotated array
function findMinInRotatedArray(arr: number[]): number {
  // Your code here
  return -1;
}

// Test function
function testFindMin() {
  const result = findMinInRotatedArray(arr);
  const expected = Math.min(...arr);
  console.log(\`Rotated array: [\${arr.join(", ")}]\`);
  console.log(\`Result: \${result}\`);
  console.log(\`Expected: \${expected}\`);
  console.log(\`Test: \${result === expected ? "✅ PASSED" : "❌ FAILED"}\`);
}

testFindMin();`,
    `// Exercise 4: Insertion search
// Find the correct position to insert an element in a sorted array

const arr = [1, 3, 5, 7, 9, 11, 13];
const target = 6;

// TODO: Implement the function to find the insertion position
function searchInsert(arr: number[], target: number): number {
  // Your code here
  return -1;
}

// Test function
function testSearchInsert() {
  const result = searchInsert(arr, target);
  // The element should be inserted at position 3 (after 5, before 7)
  const expected = 3;
  console.log(\`Array: [\${arr.join(", ")}]\`);
  console.log(\`Target: \${target}\`);
  console.log(\`Result: \${result}\`);
  console.log(\`Expected: \${expected}\`);
  console.log(\`Test: \${result === expected ? "✅ PASSED" : "❌ FAILED"}\`);
}

testSearchInsert();`,
  ],
  "2": [
    `// Exercise 1: In-place sorting
// Sort an array of 10,000 elements in memory using Quick Sort without using O(n) additional space

const arr = [64, 34, 25, 12, 22, 11, 90, 5, 77, 50];

// TODO: Implement the quickSort function
function quickSort(arr: number[], left: number = 0, right: number = arr.length - 1): void {
  // Your code here
}

// Test function
function testQuickSort() {
  const testArr = [...arr];
  quickSort(testArr);
  const sorted = [...arr].sort((a, b) => a - b);
  console.log(\`Original array: [\${arr.join(", ")}]\`);
  console.log(\`Sorted array: [\${testArr.join(", ")}]\`);
  console.log(\`Expected: [\${sorted.join(", ")}]\`);
  const isCorrect = JSON.stringify(testArr) === JSON.stringify(sorted);
  console.log(\`Test: \${isCorrect ? "✅ PASSED" : "❌ FAILED"}\`);
}

testQuickSort();`,
    `// Exercise 2: Quickselect
// Find the k-th smallest element in an unsorted array using partition logic

const arr = [3, 1, 4, 1, 5, 9, 2, 6];
const k = 3; // Find the 3rd smallest element

// TODO: Implement the quickSelect function
function quickSelect(arr: number[], k: number): number {
  // Your code here
  return -1;
}

// Test function
function testQuickSelect() {
  const result = quickSelect([...arr], k);
  const sorted = [...arr].sort((a, b) => a - b);
  const expected = sorted[k - 1];
  console.log(\`Array: [\${arr.join(", ")}]\`);
  console.log(\`k: \${k}\`);
  console.log(\`Result: \${result}\`);
  console.log(\`Expected: \${expected}\`);
  console.log(\`Test: \${result === expected ? "✅ PASSED" : "❌ FAILED"}\`);
}

testQuickSelect();`,
    `// Exercise 3: Object sorting
// Sort a list of objects by multiple criteria (first by age, then by name)

interface Person {
  name: string;
  age: number;
}

const people: Person[] = [
  { name: "Ana", age: 25 },
  { name: "Carlos", age: 30 },
  { name: "Beatriz", age: 25 },
  { name: "David", age: 30 },
];

// TODO: Implement quickSort for objects
function quickSortObjects(arr: Person[], left: number = 0, right: number = arr.length - 1): void {
  // Your code here
}

// Test function
function testQuickSortObjects() {
  const testPeople = [...people];
  quickSortObjects(testPeople);
  console.log(\`Original array:\`, people);
  console.log(\`Sorted array:\`, testPeople);
  // Verify: first by age, then by name
  const isCorrect = testPeople[0].age <= testPeople[1].age && 
                    testPeople[1].age <= testPeople[2].age &&
                    testPeople[2].age <= testPeople[3].age;
  console.log(\`Test: \${isCorrect ? "✅ PASSED" : "❌ FAILED"}\`);
}

testQuickSortObjects();`,
    `// Exercise 4: Pivot optimization
// Implement Quick Sort optimizing pivot selection to avoid worst case O(n²)

const arr = [10, 7, 8, 9, 1, 5, 2, 4, 3, 6];

// TODO: Implement quickSort with optimized pivot selection (median of three)
function quickSortOptimized(arr: number[], left: number = 0, right: number = arr.length - 1): void {
  // Your code here
}

// Test function
function testQuickSortOptimized() {
  const testArr = [...arr];
  quickSortOptimized(testArr);
  const sorted = [...arr].sort((a, b) => a - b);
  console.log(\`Original array: [\${arr.join(", ")}]\`);
  console.log(\`Sorted array: [\${testArr.join(", ")}]\`);
  const isCorrect = JSON.stringify(testArr) === JSON.stringify(sorted);
  console.log(\`Test: \${isCorrect ? "✅ PASSED" : "❌ FAILED"}\`);
}

testQuickSortOptimized();`,
  ],
  "7": [
    `// Exercise 1: Two-Pointer Technique - Find pair with target sum
// Given a sorted array, find a pair that sums to the target using O(n) time and O(1) space
// Algorithm:
// 1. Initialize: left = 0, right = n - 1
// 2. While left < right:
//    - Compute sum = arr[left] + arr[right]
//    - If sum == target: found the pair
//    - If sum < target: move left pointer right (increase sum)
//    - If sum > target: move right pointer left (decrease sum)

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const target = 7;

// TODO: Implement the function using two-pointer technique
function findPairWithSum(arr: number[], target: number): [number, number] | null {
  let left = 0;
  let right = arr.length - 1;
  
  // Your code here
  // While left < right:
  //   - Calculate sum = arr[left] + arr[right]
  //   - If sum equals target, return [arr[left], arr[right]]
  //   - If sum < target, increment left
  //   - If sum > target, decrement right
  
  return null;
}

// Test function
function testFindPairWithSum() {
  const result = findPairWithSum(arr, target);
  // Expected: [1, 6] or [2, 5] or [3, 4] (any pair that sums to 7)
  const validPairs = [[1, 6], [2, 5], [3, 4]];
  const isValid = result !== null && 
                  validPairs.some(pair => 
                    (pair[0] === result[0] && pair[1] === result[1]) ||
                    (pair[0] === result[1] && pair[1] === result[0])
                  );
  console.log(\`Array: [\${arr.join(", ")}]\`);
  console.log(\`Target: \${target}\`);
  console.log(\`Result: \${result ? \`[\${result[0]}, \${result[1]}]\` : "null"}\`);
  console.log(\`Expected: One of [1,6], [2,5], or [3,4]\`);
  console.log(\`Test: \${isValid ? "✅ PASSED" : "❌ FAILED"}\`);
}

testFindPairWithSum();`,
    `// Exercise 2: Pair sum in sorted array
// Given a sorted array of 10,000 elements and a target, find all pairs that sum to the target

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const target = 7;

// TODO: Implement the function using two pointers
function findPairs(arr: number[], target: number): number[][] {
  // Your code here
  return [];
}

// Test function
function testFindPairs() {
  const result = findPairs(arr, target);
  const expected = [[1, 6], [2, 5], [3, 4]];
  console.log(\`Array: [\${arr.join(", ")}]\`);
  console.log(\`Target: \${target}\`);
  console.log(\`Result: \${JSON.stringify(result)}\`);
  console.log(\`Expected: \${JSON.stringify(expected)}\`);
  const isCorrect = JSON.stringify(result.sort()) === JSON.stringify(expected.sort());
  console.log(\`Test: \${isCorrect ? "✅ PASSED" : "❌ FAILED"}\`);
}

testFindPairs();`,
    `// Exercise 2: Efficient reversal
// Reverse an array or string in-place using two pointers without O(1) additional space

const arr = [1, 2, 3, 4, 5, 6, 7, 8];

// TODO: Implement the reverse function using two pointers
function reverseArray(arr: number[]): void {
  // Your code here
}

// Test function
function testReverseArray() {
  const testArr = [...arr];
  reverseArray(testArr);
  const expected = [...arr].reverse();
  console.log(\`Original array: [\${arr.join(", ")}]\`);
  console.log(\`Reversed array: [\${testArr.join(", ")}]\`);
  console.log(\`Expected: [\${expected.join(", ")}]\`);
  const isCorrect = JSON.stringify(testArr) === JSON.stringify(expected);
  console.log(\`Test: \${isCorrect ? "✅ PASSED" : "❌ FAILED"}\`);
}

testReverseArray();`,
    `// Exercise 3: Palindrome validation
// Check if a string is palindrome using two pointers from both ends

const str = "A man a plan a canal Panama";

// TODO: Implement the isPalindrome function
function isPalindrome(s: string): boolean {
  // Your code here (ignore spaces and case)
  return false;
}

// Test function
function testIsPalindrome() {
  const result = isPalindrome(str);
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  const expected = cleaned === cleaned.split("").reverse().join("");
  console.log(\`String: "\${str}"\`);
  console.log(\`Result: \${result}\`);
  console.log(\`Expected: \${expected}\`);
  console.log(\`Test: \${result === expected ? "✅ PASSED" : "❌ FAILED"}\`);
}

testIsPalindrome();`,
    `// Exercise 4: Duplicate removal
// Remove duplicates from a sorted array in-place using two pointers

const arr = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];

// TODO: Implement the removeDuplicates function
function removeDuplicates(arr: number[]): number {
  // Your code here - return the new length
  return 0;
}

// Test function
function testRemoveDuplicates() {
  const testArr = [...arr];
  const newLength = removeDuplicates(testArr);
  const expected = [0, 1, 2, 3, 4];
  const resultArray = testArr.slice(0, newLength);
  console.log(\`Original array: [\${arr.join(", ")}]\`);
  console.log(\`New length: \${newLength}\`);
  console.log(\`Array without duplicates: [\${resultArray.join(", ")}]\`);
  console.log(\`Expected: [\${expected.join(", ")}]\`);
  const isCorrect = JSON.stringify(resultArray) === JSON.stringify(expected);
  console.log(\`Test: \${isCorrect ? "✅ PASSED" : "❌ FAILED"}\`);
}

testRemoveDuplicates();`,
  ],
};

const getExerciseTemplate = (
  algorithmId: string,
  exerciseIndex: number,
  exerciseText: string
): string => {
  const defaultTemplate = `// Exercise ${exerciseIndex + 1}
// ${exerciseText}

// TODO: Write your code here

// Test function
function test() {
  console.log("Implement the test function here");
}

test();
`;

  return exerciseTemplates[algorithmId]?.[exerciseIndex] || defaultTemplate;
};

const ExercisesList = ({
  exercises,
  algorithmId,
  onExerciseSelect,
  selectedExercise,
}: {
  exercises: string[];
  algorithmId: string;
  onExerciseSelect: (index: number, code: string) => void;
  selectedExercise: number | null;
}) => (
  <ol
    className="monument-description text-base leading-relaxed"
    style={{ color: "#ffffff", paddingLeft: "24px" }}
  >
    {exercises.map((exercise: string, index: number) => (
      <li
        key={index}
        style={{
          marginBottom: "12px",
          paddingLeft: "8px",
          display: "flex",
          alignItems: "flex-start",
          gap: "8px",
        }}
      >
        <input
          type="radio"
          name="exercise"
          checked={selectedExercise === index}
          onChange={() => {
            const template = getExerciseTemplate(algorithmId, index, exercise);
            onExerciseSelect(index, template);
          }}
          style={{
            marginTop: "4px",
            cursor: "pointer",
          }}
        />
        <span style={{ flex: 1 }}>{exercise}</span>
      </li>
    ))}
  </ol>
);

const AlternativeSection = ({
  alternativeAlgorithm,
  t,
}: {
  alternativeAlgorithm: Algorithm;
  t: (key: string) => string;
}) => (
  <Box>
    <h2 className="monument-label text-lg mb-2" style={{ color: "#ffffff" }}>
      {t("algorithmDetail.alternative")}
    </h2>
    <p
      className="monument-description text-base leading-relaxed mb-3"
      style={{ color: "#ffffff" }}
    >
      {t("algorithmDetail.alternativeDescription")}
    </p>
    <Button
      component={Link}
      href={`/algorithms/${getNameSlug(alternativeAlgorithm.name)}`}
      variant="contained"
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        color: "#ffffff",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.3)",
        },
      }}
    >
      {t(`algorithms.${alternativeAlgorithm.id}.name`)}
    </Button>
  </Box>
);

const AlgorithmDetailContent = ({
  algorithm,
  alternativeAlgorithm,
  gradient,
}: {
  algorithm: {
    id: string;
    name: string;
    category: string;
    difficulty: string;
    description: string;
  };
  alternativeAlgorithm: Algorithm | null;
  gradient: { from: string; to: string };
}) => {
  const t = useTranslations();
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null);
  const [exerciseCode, setExerciseCode] = useState<string>("");

  const useCases =
    (t.raw(`algorithms.${algorithm.id}.useCases`) as string[]) || [];
  const exercises =
    (t.raw(`algorithms.${algorithm.id}.exercises`) as string[]) || [];

  const handleExerciseSelect = (index: number, code: string) => {
    setSelectedExercise(index);
    setExerciseCode(code);
  };

  return (
    <Card
      sx={{
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.8)",
        borderRadius: "16px",
        overflow: "hidden",
        position: "relative",
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(to bottom right, ${gradient.from}, ${gradient.to})`,
          opacity: 0.9,
          zIndex: 0,
        }}
      />

      <Box sx={{ position: "relative", zIndex: 10, p: 4 }}>
        <AlgorithmHeader
          name={algorithm.name}
          difficulty={algorithm.difficulty}
          category={algorithm.category}
        />

        <SectionBox title={t("algorithmDetail.description")}>
          <p
            className="monument-description text-base leading-relaxed"
            style={{ color: "#ffffff" }}
          >
            {algorithm.description}
          </p>
        </SectionBox>

        <SectionBox title={t("algorithmDetail.explanation")}>
          <p
            className="monument-description text-base leading-relaxed"
            style={{ color: "#ffffff" }}
          >
            {t(`algorithms.${algorithm.id}.explanation`)}
          </p>
        </SectionBox>

        <SectionBox title={t("algorithmDetail.useCases")}>
          <UseCasesList useCases={useCases} />
        </SectionBox>

        {exercises.length > 0 && (
          <SectionBox title={t("algorithmDetail.exercises")}>
            <ExercisesList
              exercises={exercises}
              algorithmId={algorithm.id}
              onExerciseSelect={handleExerciseSelect}
              selectedExercise={selectedExercise}
            />
          </SectionBox>
        )}

        {exercises.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <CodeEditor initialCode={exerciseCode || undefined} />
          </Box>
        )}

        {alternativeAlgorithm && (
          <AlternativeSection
            alternativeAlgorithm={alternativeAlgorithm}
            t={t}
          />
        )}
      </Box>
    </Card>
  );
};

export default function AlgorithmDetailPage() {
  const params = useParams();
  const t = useTranslations();
  const algorithmSlug = params.id as string;

  const baseAlgorithm = findAlgorithmBySlug(algorithmSlug);

  if (!baseAlgorithm) {
    return <NotFoundView t={t} />;
  }

  const algorithm = {
    id: baseAlgorithm.id,
    name: t(`algorithms.${baseAlgorithm.id}.name`),
    category: t(`categories.${baseAlgorithm.category}`),
    difficulty: baseAlgorithm.difficulty,
    description: t(`algorithms.${baseAlgorithm.id}.description`),
    color: baseAlgorithm.color,
    alternativeId: baseAlgorithm.alternativeId,
  };

  const alternativeAlgorithm = algorithm.alternativeId
    ? baseAlgorithms.find(alg => alg.id === algorithm.alternativeId) || null
    : null;

  const gradient = getGradientColors(algorithm.color);

  return (
    <main className="min-h-screen relative z-10">
      <GeometricShapes />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto">
          <Button
            component={Link}
            href="/"
            startIcon={<ArrowBack />}
            variant="outlined"
            sx={{
              mb: 4,
              color: "#ffffff",
              borderColor: "rgba(255, 255, 255, 0.5)",
              "&:hover": {
                borderColor: "rgba(255, 255, 255, 0.8)",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            {t("algorithmDetail.backToHome")}
          </Button>

          <AlgorithmDetailContent
            algorithm={algorithm}
            alternativeAlgorithm={alternativeAlgorithm}
            gradient={gradient}
          />
        </div>
      </div>
    </main>
  );
}
