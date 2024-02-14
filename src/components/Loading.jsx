import React from 'react';

const Loading = ({ text = 'Loading' }) => (
  <div className="loading">
    <p className="loading-spinner" />
    <p className="loading-text">{text}</p>
  </div>
);

export default Loading;
