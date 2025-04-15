import React from 'react';

const FailedTask = ({ onFailed }) => {
  return (
    <button className="failedTaskBtn" onClick={onFailed}>
      Task Failed
    </button>
  );
};

export default FailedTask;
