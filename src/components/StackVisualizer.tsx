import React from 'react';
import './StackVisualizer.css';

interface StackVisualizerProps {
  data: (string | number)[];
  highlights?: number[];
}

const StackVisualizer: React.FC<StackVisualizerProps> = ({ data, highlights = [] }) => {
  return (
    <div className="stack-visualizer">
      <div className="stack-container">
        {data.length === 0 ? (
          <div className="empty-message">Stack is empty</div>
        ) : (
          data.map((item, index) => (
            <div
              key={index}
              className={`stack-item ${highlights.includes(index) ? 'highlight' : ''}`}
            >
              <span className="item-value">{item}</span>
              {index === data.length - 1 && <span className="top-label">← TOP</span>}
            </div>
          )).reverse()
        )}
      </div>
      <div className="stack-base">BOTTOM</div>
    </div>
  );
};

export default StackVisualizer;
