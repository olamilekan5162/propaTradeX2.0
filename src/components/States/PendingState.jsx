import React from 'react';

const PendingState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-primary-bg rounded-lg shadow-lg">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-text mb-4"></div>
      <h2 className="text-2xl font-bold text-primary-text mb-2">Loading...</h2>
      <p className="text-secondary-text">Please wait while we fetch the data.</p>
    </div>
  );
};

export default PendingState;
