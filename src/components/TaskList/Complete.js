import React from 'react';

const Complete = ({ onComplete }) => {
  return (
    <>
      <button className="completeTaskBtn" onClick={onComplete}>
        Task Completed
      </button>
    </>
  );
};

export default Complete;
