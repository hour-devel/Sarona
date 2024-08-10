import React from 'react';
import { FiCheck, FiX } from 'react-icons/fi';

export const CustomCheckbox = ({ value, isSelected, isCorrect, children, ...props }) => {
  return (
    <label className="flex items-center mb-[2px] cursor-pointer">
      <input
        type="checkbox"
        value={value}
        checked={isSelected}
        {...props}
        className="hidden"
      />
      <span
        className={`flex items-center justify-center w-5 h-5 border rounded ${isSelected ? (isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'border-gray-300'}`}
      >
        {isSelected && (isCorrect ? <FiCheck /> : <FiX />)}
      </span>
      <span className={`ml-2 ${isSelected ? (isCorrect ? 'text-green-500' : 'text-red-500') : ''}`}>
        {children}
      </span>
    </label>
  );
};
