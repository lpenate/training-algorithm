export interface Step<T = number | string> {
  id: number;
  description: string;
  data: T[];
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
