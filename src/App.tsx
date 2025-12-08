import { useState, useEffect } from 'react';
import './App.css';
import ArrayVisualizer from './components/ArrayVisualizer';
import StackVisualizer from './components/StackVisualizer';
import QueueVisualizer from './components/QueueVisualizer';
import StepControls from './components/StepControls';
import { Stack } from './algorithms/stack';
import { Queue } from './algorithms/queue';
import { bubbleSort, quickSort, mergeSort } from './algorithms/sorting';
import { linearSearch, binarySearch } from './algorithms/searching';
import { generateRandomArray, generateRandomString } from './utils/generators';
import type { Step } from './types';

type AlgorithmMode = 'stack' | 'queue' | 'sorting' | 'searching';
type SortingAlgorithm = 'bubble' | 'quick' | 'merge';
type SearchingAlgorithm = 'linear' | 'binary';

function App() {
  const [mode, setMode] = useState<AlgorithmMode>('stack');
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [inputValue, setInputValue] = useState('');
  
  // Stack/Queue specific
  const [stack] = useState(() => new Stack<string>());
  const [queue] = useState(() => new Queue<string>());
  
  // Sorting specific
  const [sortingAlgorithm, setSortingAlgorithm] = useState<SortingAlgorithm>('bubble');
  const [sortArray, setSortArray] = useState<number[]>([]);
  
  // Searching specific
  const [searchingAlgorithm, setSearchingAlgorithm] = useState<SearchingAlgorithm>('linear');
  const [searchArray, setSearchArray] = useState<number[]>([]);
  const [searchTarget, setSearchTarget] = useState<number>(0);

  useEffect(() => {
    let interval: number | undefined;
    if (isPlaying && currentStep < steps.length - 1) {
      interval = window.setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentStep, steps.length, speed]);

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleStepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  // Stack operations
  const handleStackPush = () => {
    if (inputValue.trim()) {
      stack.push(inputValue);
      setSteps(stack.getSteps());
      setCurrentStep(stack.getSteps().length - 1);
      setInputValue('');
    }
  };

  const handleStackPop = () => {
    stack.pop();
    setSteps(stack.getSteps());
    setCurrentStep(stack.getSteps().length - 1);
  };

  const handleStackClear = () => {
    stack.clear();
    setSteps(stack.getSteps());
    setCurrentStep(0);
  };

  const handleStackRandom = () => {
    for (let i = 0; i < 5; i++) {
      stack.push(generateRandomString(3));
    }
    setSteps(stack.getSteps());
    setCurrentStep(stack.getSteps().length - 1);
  };

  // Queue operations
  const handleQueueEnqueue = () => {
    if (inputValue.trim()) {
      queue.enqueue(inputValue);
      setSteps(queue.getSteps());
      setCurrentStep(queue.getSteps().length - 1);
      setInputValue('');
    }
  };

  const handleQueueDequeue = () => {
    queue.dequeue();
    setSteps(queue.getSteps());
    setCurrentStep(queue.getSteps().length - 1);
  };

  const handleQueueClear = () => {
    queue.clear();
    setSteps(queue.getSteps());
    setCurrentStep(0);
  };

  const handleQueueRandom = () => {
    for (let i = 0; i < 5; i++) {
      queue.enqueue(generateRandomString(3));
    }
    setSteps(queue.getSteps());
    setCurrentStep(queue.getSteps().length - 1);
  };

  // Sorting operations
  const handleSort = () => {
    let sortSteps: Step[] = [];
    switch (sortingAlgorithm) {
      case 'bubble':
        sortSteps = bubbleSort(sortArray);
        break;
      case 'quick':
        sortSteps = quickSort(sortArray);
        break;
      case 'merge':
        sortSteps = mergeSort(sortArray);
        break;
    }
    setSteps(sortSteps);
    setCurrentStep(0);
  };

  const handleGenerateRandomArray = () => {
    const newArray = generateRandomArray(10, 10, 99);
    setSortArray(newArray);
    setSteps([]);
    setCurrentStep(0);
  };

  // Searching operations
  const handleSearch = () => {
    let searchSteps: Step[] = [];
    switch (searchingAlgorithm) {
      case 'linear':
        searchSteps = linearSearch(searchArray, searchTarget);
        break;
      case 'binary':
        searchSteps = binarySearch(searchArray, searchTarget);
        break;
    }
    setSteps(searchSteps);
    setCurrentStep(0);
  };

  const handleGenerateSearchArray = () => {
    const newArray = generateRandomArray(10, 10, 99);
    setSearchArray(newArray);
    setSearchTarget(newArray[Math.floor(Math.random() * newArray.length)]);
    setSteps([]);
    setCurrentStep(0);
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎓 Algorithm Training Simulator</h1>
        <p>Interactive step-by-step visualization of common algorithms</p>
      </header>

      <div className="mode-selector">
        <button
          className={mode === 'stack' ? 'active' : ''}
          onClick={() => {
            setMode('stack');
            setSteps(stack.getSteps());
            setCurrentStep(stack.getSteps().length > 0 ? stack.getSteps().length - 1 : 0);
          }}
        >
          Stack
        </button>
        <button
          className={mode === 'queue' ? 'active' : ''}
          onClick={() => {
            setMode('queue');
            setSteps(queue.getSteps());
            setCurrentStep(queue.getSteps().length > 0 ? queue.getSteps().length - 1 : 0);
          }}
        >
          Queue
        </button>
        <button
          className={mode === 'sorting' ? 'active' : ''}
          onClick={() => {
            setMode('sorting');
            if (sortArray.length === 0) {
              handleGenerateRandomArray();
            }
          }}
        >
          Sorting
        </button>
        <button
          className={mode === 'searching' ? 'active' : ''}
          onClick={() => {
            setMode('searching');
            if (searchArray.length === 0) {
              handleGenerateSearchArray();
            }
          }}
        >
          Searching
        </button>
      </div>

      <div className="content">
        {mode === 'stack' && (
          <div className="algorithm-section">
            <h2>Stack (LIFO - Last In First Out)</h2>
            <div className="input-controls">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value..."
                onKeyPress={(e) => e.key === 'Enter' && handleStackPush()}
              />
              <button onClick={handleStackPush}>Push</button>
              <button onClick={handleStackPop}>Pop</button>
              <button onClick={handleStackClear}>Clear</button>
              <button onClick={handleStackRandom}>Add Random</button>
            </div>
            <div className="visualization">
              {currentStepData && <StackVisualizer data={currentStepData.data} highlights={currentStepData.highlights} />}
            </div>
            {currentStepData && (
              <div className="step-description">
                {currentStepData.description}
              </div>
            )}
            {steps.length > 0 && (
              <StepControls
                currentStep={currentStep}
                totalSteps={steps.length}
                isPlaying={isPlaying}
                onPlay={handlePlay}
                onPause={handlePause}
                onStepForward={handleStepForward}
                onStepBackward={handleStepBackward}
                onReset={handleReset}
                speed={speed}
                onSpeedChange={setSpeed}
              />
            )}
          </div>
        )}

        {mode === 'queue' && (
          <div className="algorithm-section">
            <h2>Queue (FIFO - First In First Out)</h2>
            <div className="input-controls">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value..."
                onKeyPress={(e) => e.key === 'Enter' && handleQueueEnqueue()}
              />
              <button onClick={handleQueueEnqueue}>Enqueue</button>
              <button onClick={handleQueueDequeue}>Dequeue</button>
              <button onClick={handleQueueClear}>Clear</button>
              <button onClick={handleQueueRandom}>Add Random</button>
            </div>
            <div className="visualization">
              {currentStepData && <QueueVisualizer data={currentStepData.data} highlights={currentStepData.highlights} />}
            </div>
            {currentStepData && (
              <div className="step-description">
                {currentStepData.description}
              </div>
            )}
            {steps.length > 0 && (
              <StepControls
                currentStep={currentStep}
                totalSteps={steps.length}
                isPlaying={isPlaying}
                onPlay={handlePlay}
                onPause={handlePause}
                onStepForward={handleStepForward}
                onStepBackward={handleStepBackward}
                onReset={handleReset}
                speed={speed}
                onSpeedChange={setSpeed}
              />
            )}
          </div>
        )}

        {mode === 'sorting' && (
          <div className="algorithm-section">
            <h2>Sorting Algorithms</h2>
            <div className="input-controls">
              <select
                value={sortingAlgorithm}
                onChange={(e) => setSortingAlgorithm(e.target.value as SortingAlgorithm)}
              >
                <option value="bubble">Bubble Sort</option>
                <option value="quick">Quick Sort</option>
                <option value="merge">Merge Sort</option>
              </select>
              <button onClick={handleGenerateRandomArray}>Generate Random Array</button>
              <button onClick={handleSort} disabled={sortArray.length === 0}>
                Sort
              </button>
            </div>
            {sortArray.length > 0 && (
              <div className="array-display">
                <strong>Array:</strong> [{sortArray.join(', ')}]
              </div>
            )}
            <div className="visualization">
              {currentStepData && currentStepData.data && (
                <ArrayVisualizer data={currentStepData.data} highlights={currentStepData.highlights} type="bars" />
              )}
            </div>
            {currentStepData && (
              <div className="step-description">
                {currentStepData.description}
              </div>
            )}
            {steps.length > 0 && (
              <StepControls
                currentStep={currentStep}
                totalSteps={steps.length}
                isPlaying={isPlaying}
                onPlay={handlePlay}
                onPause={handlePause}
                onStepForward={handleStepForward}
                onStepBackward={handleStepBackward}
                onReset={handleReset}
                speed={speed}
                onSpeedChange={setSpeed}
              />
            )}
          </div>
        )}

        {mode === 'searching' && (
          <div className="algorithm-section">
            <h2>Searching Algorithms</h2>
            <div className="input-controls">
              <select
                value={searchingAlgorithm}
                onChange={(e) => setSearchingAlgorithm(e.target.value as SearchingAlgorithm)}
              >
                <option value="linear">Linear Search</option>
                <option value="binary">Binary Search</option>
              </select>
              <button onClick={handleGenerateSearchArray}>Generate Random Array</button>
              <button onClick={handleSearch} disabled={searchArray.length === 0}>
                Search for {searchTarget}
              </button>
            </div>
            {searchArray.length > 0 && (
              <div className="array-display">
                <strong>Array:</strong> [{searchArray.join(', ')}] | <strong>Target:</strong> {searchTarget}
              </div>
            )}
            <div className="visualization">
              {currentStepData && currentStepData.data && (
                <ArrayVisualizer data={currentStepData.data} highlights={currentStepData.highlights} type="boxes" />
              )}
            </div>
            {currentStepData && (
              <div className="step-description">
                {currentStepData.description}
              </div>
            )}
            {steps.length > 0 && (
              <StepControls
                currentStep={currentStep}
                totalSteps={steps.length}
                isPlaying={isPlaying}
                onPlay={handlePlay}
                onPause={handlePause}
                onStepForward={handleStepForward}
                onStepBackward={handleStepBackward}
                onReset={handleReset}
                speed={speed}
                onSpeedChange={setSpeed}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
