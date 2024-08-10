import { FiCheck, FiX } from 'react-icons/fi';

const CustomRadio = ({ value, isSelected, isCorrect, children, ...props }) => {
  return (
    <label className="flex items-center mb-[2px] cursor-pointer">
      <input
        type="radio"
        value={value}
        checked={isSelected}
        {...props}
        className="hidden"
      />
      <span
        className={`flex items-center justify-center w-5 h-5 border rounded-full ${isSelected ? (isCorrect ? 'bg-green-500 text-white ' : 'bg-red-500 text-white') : 'border-gray-300'}`}
      >
        {isSelected && (isCorrect ? <FiCheck /> : <FiX />)}
      </span>
      <span className={`ml-2 ${isSelected ? (isCorrect ? 'text-green-600' : 'text-red-600') : ''}`}>
        {children}
      </span>
    </label>
  );
};

export default CustomRadio;
