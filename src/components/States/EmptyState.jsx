import React from 'react';

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-primary-bg rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-primary-text mb-2">No items found</h2>
      <p className="text-secondary-text">There are no items to display at the moment.</p>
    </div>
  );
};

export default EmptyState;
