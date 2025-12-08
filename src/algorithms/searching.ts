import type { Step } from '../types';

export function linearSearch(arr: number[], target: number): Step[] {
  const steps: Step[] = [];
  const array = [...arr];
  let stepId = 0;

  steps.push({
    id: stepId++,
    description: `Starting Linear Search for ${target}`,
    data: [...array],
    highlights: []
  });

  for (let i = 0; i < array.length; i++) {
    steps.push({
      id: stepId++,
      description: `Checking element at index ${i}: ${array[i]}`,
      data: [...array],
      highlights: [i]
    });

    if (array[i] === target) {
      steps.push({
        id: stepId++,
        description: `Found ${target} at index ${i}!`,
        data: [...array],
        highlights: [i]
      });
      return steps;
    }
  }

  steps.push({
    id: stepId++,
    description: `${target} not found in the array`,
    data: [...array],
    highlights: []
  });

  return steps;
}

export function binarySearch(arr: number[], target: number): Step[] {
  const steps: Step[] = [];
  const array = [...arr].sort((a, b) => a - b); // Binary search requires sorted array
  let stepId = 0;

  steps.push({
    id: stepId++,
    description: `Starting Binary Search for ${target} (array sorted)`,
    data: [...array],
    highlights: []
  });

  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    steps.push({
      id: stepId++,
      description: `Checking middle element at index ${mid}: ${array[mid]}`,
      data: [...array],
      highlights: [mid, left, right]
    });

    if (array[mid] === target) {
      steps.push({
        id: stepId++,
        description: `Found ${target} at index ${mid}!`,
        data: [...array],
        highlights: [mid]
      });
      return steps;
    }

    if (array[mid] < target) {
      steps.push({
        id: stepId++,
        description: `${array[mid]} < ${target}, searching right half`,
        data: [...array],
        highlights: Array.from({ length: right - mid }, (_, i) => mid + 1 + i)
      });
      left = mid + 1;
    } else {
      steps.push({
        id: stepId++,
        description: `${array[mid]} > ${target}, searching left half`,
        data: [...array],
        highlights: Array.from({ length: mid - left }, (_, i) => left + i)
      });
      right = mid - 1;
    }
  }

  steps.push({
    id: stepId++,
    description: `${target} not found in the array`,
    data: [...array],
    highlights: []
  });

  return steps;
}
