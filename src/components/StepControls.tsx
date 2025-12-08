import React from 'react';
import './StepControls.css';

const MAX_SPEED_VALUE = 2100;
const MIN_SPEED = 100;
const MAX_SPEED = 2000;
const SPEED_STEP = 100;

interface StepControlsProps {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onReset: () => void;
  onGoToStep: (step: number) => void;
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
  onGoToStep,
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
          onChange={(e) => onGoToStep(parseInt(e.target.value))}
          className="progress-slider"
        />
      </div>
      <div className="speed-row">
        <label>Speed:</label>
        <input
          type="range"
          min={MIN_SPEED}
          max={MAX_SPEED}
          step={SPEED_STEP}
          value={MAX_SPEED_VALUE - speed}
          onChange={(e) => onSpeedChange(MAX_SPEED_VALUE - parseInt(e.target.value))}
          className="speed-slider"
        />
        <span>{((MAX_SPEED_VALUE - speed) / 100).toFixed(0)}x</span>
      </div>
    </div>
  );
};

export default StepControls;
