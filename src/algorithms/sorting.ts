import type { Step } from '../types';

export function bubbleSort(arr: number[]): Step<number>[] {
  const steps: Step<number>[] = [];
  const array = [...arr];
  let stepId = 0;

  steps.push({
    id: stepId++,
    description: 'Starting Bubble Sort',
    data: [...array],
    highlights: []
  });

  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        id: stepId++,
        description: `Comparing ${array[j]} and ${array[j + 1]}`,
        data: [...array],
        highlights: [j, j + 1]
      });

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        steps.push({
          id: stepId++,
          description: `Swapped ${array[j + 1]} and ${array[j]}`,
          data: [...array],
          highlights: [j, j + 1]
        });
      }
    }
  }

  steps.push({
    id: stepId++,
    description: 'Bubble Sort complete!',
    data: [...array],
    highlights: []
  });

  return steps;
}

export function quickSort(arr: number[]): Step<number>[] {
  const steps: Step<number>[] = [];
  const array = [...arr];
  let stepId = 0;

  steps.push({
    id: stepId++,
    description: 'Starting Quick Sort',
    data: [...array],
    highlights: []
  });

  function partition(low: number, high: number): number {
    const pivot = array[high];
    steps.push({
      id: stepId++,
      description: `Pivot: ${pivot}`,
      data: [...array],
      highlights: [high]
    });

    let i = low - 1;

    for (let j = low; j < high; j++) {
      steps.push({
        id: stepId++,
        description: `Comparing ${array[j]} with pivot ${pivot}`,
        data: [...array],
        highlights: [j, high]
      });

      if (array[j] < pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        steps.push({
          id: stepId++,
          description: `Swapped ${array[i]} and ${array[j]}`,
          data: [...array],
          highlights: [i, j]
        });
      }
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    steps.push({
      id: stepId++,
      description: `Placed pivot ${pivot} at position ${i + 1}`,
      data: [...array],
      highlights: [i + 1]
    });

    return i + 1;
  }

  function quickSortHelper(low: number, high: number): void {
    if (low < high) {
      const pi = partition(low, high);
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    }
  }

  quickSortHelper(0, array.length - 1);

  steps.push({
    id: stepId++,
    description: 'Quick Sort complete!',
    data: [...array],
    highlights: []
  });

  return steps;
}

export function mergeSort(arr: number[]): Step<number>[] {
  const steps: Step<number>[] = [];
  const array = [...arr];
  let stepId = 0;

  steps.push({
    id: stepId++,
    description: 'Starting Merge Sort',
    data: [...array],
    highlights: []
  });

  function merge(left: number, mid: number, right: number): void {
    const n1 = mid - left + 1;
    const n2 = right - mid;

    const L = array.slice(left, mid + 1);
    const R = array.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
      steps.push({
        id: stepId++,
        description: `Comparing ${L[i]} and ${R[j]}`,
        data: [...array],
        highlights: [k]
      });

      if (L[i] <= R[j]) {
        array[k] = L[i];
        i++;
      } else {
        array[k] = R[j];
        j++;
      }
      k++;

      steps.push({
        id: stepId++,
        description: `Merged element at position ${k - 1}`,
        data: [...array],
        highlights: [k - 1]
      });
    }

    while (i < n1) {
      array[k] = L[i];
      steps.push({
        id: stepId++,
        description: `Copying remaining element ${L[i]}`,
        data: [...array],
        highlights: [k]
      });
      i++;
      k++;
    }

    while (j < n2) {
      array[k] = R[j];
      steps.push({
        id: stepId++,
        description: `Copying remaining element ${R[j]}`,
        data: [...array],
        highlights: [k]
      });
      j++;
      k++;
    }
  }

  function mergeSortHelper(left: number, right: number): void {
    if (left < right) {
      const mid = Math.floor(left + (right - left) / 2);

      steps.push({
        id: stepId++,
        description: `Dividing array from ${left} to ${right}`,
        data: [...array],
        highlights: Array.from({ length: right - left + 1 }, (_, i) => left + i)
      });

      mergeSortHelper(left, mid);
      mergeSortHelper(mid + 1, right);
      merge(left, mid, right);
    }
  }

  mergeSortHelper(0, array.length - 1);

  steps.push({
    id: stepId++,
    description: 'Merge Sort complete!',
    data: [...array],
    highlights: []
  });

  return steps;
}
