import React from 'react';

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ width = 'w-full', height = 'h-4', className = '' }) => {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-sm ${width} ${height} ${className}`}></div>
  );
};

export default Skeleton;
