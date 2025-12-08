# 🎓 Algorithm Training Simulator

An interactive, step-by-step visualization platform for learning and understanding common algorithms and data structures. Built with Vite, React, and TypeScript.

## Features

### 📚 Data Structures
- **Stack (LIFO)** - Last In First Out data structure with push/pop operations
- **Queue (FIFO)** - First In First Out data structure with enqueue/dequeue operations

### 🔄 Sorting Algorithms
- **Bubble Sort** - Simple comparison-based sorting
- **Quick Sort** - Efficient divide-and-conquer sorting
- **Merge Sort** - Stable divide-and-conquer sorting

### 🔍 Searching Algorithms
- **Linear Search** - Sequential search through array
- **Binary Search** - Efficient search on sorted arrays

### ✨ Interactive Features
- **Step-by-Step Visualization** - Watch algorithms execute one step at a time
- **Playback Controls** - Play, pause, step forward/backward through algorithm execution
- **Speed Control** - Adjust animation speed to your learning pace
- **Random Data Generator** - Generate random arrays and strings for testing
- **Visual Highlights** - See which elements are being compared or modified
- **Detailed Descriptions** - Each step includes a clear explanation of what's happening

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/lpenate/training-algorithm.git
cd training-algorithm
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Stack Operations
1. Select "Stack" mode
2. Enter a value and click "Push" to add to the stack
3. Click "Pop" to remove the top element
4. Use "Add Random" to quickly populate with random values
5. Use playback controls to review operations step by step

### Queue Operations
1. Select "Queue" mode
2. Enter a value and click "Enqueue" to add to the queue
3. Click "Dequeue" to remove the front element
4. Use "Add Random" to quickly populate with random values
5. Use playback controls to review operations step by step

### Sorting Algorithms
1. Select "Sorting" mode
2. Choose your algorithm (Bubble Sort, Quick Sort, or Merge Sort)
3. Click "Generate Random Array" to create test data
4. Click "Sort" to begin visualization
5. Use playback controls to step through the sorting process

### Searching Algorithms
1. Select "Searching" mode
2. Choose your algorithm (Linear Search or Binary Search)
3. Click "Generate Random Array" to create test data with a target
4. Click "Search" to begin visualization
5. Watch as the algorithm finds (or doesn't find) the target value

## Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## Preview Production Build

```bash
npm run preview
```

## Technologies Used

- **Vite** - Fast build tool and development server
- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **CSS3** - Modern styling with animations

## Project Structure

```
src/
├── algorithms/          # Algorithm implementations
│   ├── stack.ts        # Stack data structure
│   ├── queue.ts        # Queue data structure
│   ├── sorting.ts      # Sorting algorithms
│   └── searching.ts    # Searching algorithms
├── components/         # React components
│   ├── ArrayVisualizer.tsx
│   ├── StackVisualizer.tsx
│   ├── QueueVisualizer.tsx
│   └── StepControls.tsx
├── utils/             # Utility functions
│   └── generators.ts  # Random data generators
├── types/             # TypeScript type definitions
│   └── index.ts
├── App.tsx            # Main application component
└── main.tsx           # Application entry point
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Author

Created by lpenate
