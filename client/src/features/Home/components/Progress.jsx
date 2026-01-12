import React from 'react'

const Progress = ({progress}) => {
  return (
    <div className="w-full mt-4">
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between text-sm text-gray-700 mt-1">
        <span>{progress}%</span>
        {remainingTime !== null && (
          <span>⏳ {formatTime(remainingTime)} remaining</span>
        )}
      </div>
    </div>
  );
}

export default Progress
