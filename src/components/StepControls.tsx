import React from 'react';
import './StepControls.css';

interface StepControlsProps {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onReset: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
}

const StepControls: React.FC<StepControlsProps> = ({
  currentStep,
  totalSteps,
  isPlaying,
  onPlay,
  onPause,
  onStepForward,
  onStepBackward,
  onReset,
  speed,
  onSpeedChange,
}) => {
  return (
    <div className="step-controls">
      <div className="controls-row">
        <button
          className="control-btn"
          onClick={onReset}
          disabled={currentStep === 0}
        >
          ⏮ Reset
        </button>
        <button
          className="control-btn"
          onClick={onStepBackward}
          disabled={currentStep === 0}
        >
          ⏪ Step Back
        </button>
        {isPlaying ? (
          <button className="control-btn play-pause" onClick={onPause}>
            ⏸ Pause
          </button>
        ) : (
          <button
            className="control-btn play-pause"
            onClick={onPlay}
            disabled={currentStep >= totalSteps - 1}
          >
            ▶ Play
          </button>
        )}
        <button
          className="control-btn"
          onClick={onStepForward}
          disabled={currentStep >= totalSteps - 1}
        >
          Step Forward ⏩
        </button>
      </div>
      <div className="progress-row">
        <div className="step-info">
          Step {currentStep + 1} of {totalSteps}
        </div>
        <input
          type="range"
          min="0"
          max={totalSteps - 1}
          value={currentStep}
          onChange={(e) => {
            const step = parseInt(e.target.value);
            if (step !== currentStep) {
              onReset();
              for (let i = 0; i < step; i++) {
                onStepForward();
              }
            }
          }}
          className="progress-slider"
        />
      </div>
      <div className="speed-row">
        <label>Speed:</label>
        <input
          type="range"
          min="100"
          max="2000"
          step="100"
          value={2100 - speed}
          onChange={(e) => onSpeedChange(2100 - parseInt(e.target.value))}
          className="speed-slider"
        />
        <span>{((2100 - speed) / 100).toFixed(0)}x</span>
      </div>
    </div>
  );
};

export default StepControls;
