export interface Step {
  id: number;
  description: string;
  data: number[] | string[];
  highlights?: number[];
}

export interface AlgorithmState {
  currentStep: number;
  steps: Step[];
  isPlaying: boolean;
  speed: number;
}

export type DataStructureType = 'stack' | 'queue' | 'array';
export type AlgorithmType = 'bubbleSort' | 'quickSort' | 'mergeSort' | 'binarySearch' | 'linearSearch';
