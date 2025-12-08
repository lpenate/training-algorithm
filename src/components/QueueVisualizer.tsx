import React from 'react';
import './QueueVisualizer.css';

interface QueueVisualizerProps {
  data: (string | number)[];
  highlights?: number[];
}

const QueueVisualizer: React.FC<QueueVisualizerProps> = ({ data, highlights = [] }) => {
  return (
    <div className="queue-visualizer">
      <div className="queue-label front">FRONT →</div>
      <div className="queue-container">
        {data.length === 0 ? (
          <div className="empty-message">Queue is empty</div>
        ) : (
          data.map((item, index) => (
            <div
              key={index}
              className={`queue-item ${highlights.includes(index) ? 'highlight' : ''}`}
            >
              <span className="item-value">{item}</span>
            </div>
          ))
        )}
      </div>
      <div className="queue-label rear">← REAR</div>
    </div>
  );
};

export default QueueVisualizer;
