import React from 'react';
import { PasswordOptions as PasswordOptionsType } from '../types/password';

interface PasswordOptionsProps {
  options: PasswordOptionsType;
  updateOption: (key: keyof PasswordOptionsType, value: boolean | number | string) => void;
}

const PasswordOptions: React.FC<PasswordOptionsProps> = ({ options, updateOption }) => {
  const { length, includeLowercase, includeUppercase, includeNumbers, includeSymbols, customCharacters } = options;

  return (
    <div className="p-5 bg-white rounded-lg shadow-md mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Password Options</h2>
      
      {/* Length Slider */}
      <div className="mb-5">
        <div className="flex justify-between mb-2">
          <label htmlFor="length" className="block text-sm font-medium text-gray-700">
            Length: {length} characters
          </label>
        </div>
        <input
          id="length"
          type="range"
          min="8"
          max="32"
          value={length}
          onChange={(e) => updateOption('length', parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>8</span>
          <span>16</span>
          <span>24</span>
          <span>32</span>
        </div>
      </div>

      {/* Custom Characters */}
      <div className="mb-5">
        <label htmlFor="customCharacters" className="block text-sm font-medium text-gray-700 mb-2">
          Custom Characters (optional)
        </label>
        <input
          id="customCharacters"
          type="text"
          value={customCharacters}
          onChange={(e) => updateOption('customCharacters', e.target.value)}
          placeholder="Add your own characters..."
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      {/* Character Types */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Include:</h3>
        
        <div className="flex items-center">
          <input
            id="lowercase"
            type="checkbox"
            checked={includeLowercase}
            onChange={(e) => updateOption('includeLowercase', e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="lowercase" className="ml-2 text-sm font-medium text-gray-700">
            Lowercase (a-z)
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            id="uppercase"
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => updateOption('includeUppercase', e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="uppercase" className="ml-2 text-sm font-medium text-gray-700">
            Uppercase (A-Z)
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            id="numbers"
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => updateOption('includeNumbers', e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="numbers" className="ml-2 text-sm font-medium text-gray-700">
            Numbers (0-9)
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            id="symbols"
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => updateOption('includeSymbols', e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="symbols" className="ml-2 text-sm font-medium text-gray-700">
            Symbols (!@#$%^&*()_+)
          </label>
        </div>
      </div>
    </div>
  );
};

export default PasswordOptions;