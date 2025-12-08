import React from 'react';
import './ArrayVisualizer.css';

interface ArrayVisualizerProps {
  data: number[];
  highlights?: number[];
  type?: 'bars' | 'boxes';
}

const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({ 
  data, 
  highlights = [],
  type = 'bars'
}) => {
  const maxValue = Math.max(...data, 1);

  if (type === 'bars') {
    return (
      <div className="array-visualizer bars">
        {data.map((value, index) => (
          <div key={index} className="bar-container">
            <div
              className={`bar ${highlights.includes(index) ? 'highlight' : ''}`}
              style={{ height: `${(value / maxValue) * 100}%` }}
            >
              <span className="bar-value">{value}</span>
            </div>
            <span className="bar-index">{index}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="array-visualizer boxes">
      {data.map((value, index) => (
        <div
          key={index}
          className={`box ${highlights.includes(index) ? 'highlight' : ''}`}
        >
          <div className="box-value">{value}</div>
          <div className="box-index">{index}</div>
        </div>
      ))}
    </div>
  );
};

export default ArrayVisualizer;
