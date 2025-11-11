import React from 'react';

const UnconnectedState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[90vh]">
    <div className="flex flex-col items-center justify-center p-8 w-[50%] h-[50%] border border-primary-color rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-primary-text mb-2">You are not connected</h2>
      <p className="text-secondary-text">Please connect your wallet to continue.</p>
    </div>
    </div>
  );
};

export default UnconnectedState;
