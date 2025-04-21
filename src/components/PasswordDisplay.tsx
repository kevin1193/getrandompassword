import React from 'react';
import { ClipboardCopy, RefreshCw } from 'lucide-react';

interface PasswordDisplayProps {
  password: string;
  copied: boolean;
  onCopy: () => void;
  onGenerate: () => void;
}

const PasswordDisplay: React.FC<PasswordDisplayProps> = ({
  password,
  copied,
  onCopy,
  onGenerate,
}) => {
  return (
    <div className="mb-6">
      <div className="relative">
        <div className="flex items-center">
          <input
            type="text"
            readOnly
            value={password}
            className="w-full p-4 text-lg bg-white border border-gray-200 rounded-lg shadow-sm font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-label="Generated password"
          />
          <div className="absolute right-2 flex space-x-1">
            <button
              onClick={onGenerate}
              className="p-2 text-gray-500 hover:text-blue-600 transition-colors rounded-md hover:bg-blue-50"
              aria-label="Generate new password"
            >
              <RefreshCw size={20} className="transform hover:rotate-180 transition-transform duration-500" />
            </button>
            <button
              onClick={onCopy}
              className={`p-2 transition-colors rounded-md ${
                copied 
                  ? 'text-green-600 bg-green-50' 
                  : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
              }`}
              aria-label="Copy password to clipboard"
            >
              <ClipboardCopy size={20} />
            </button>
          </div>
        </div>
      </div>
      {copied && (
        <div className="mt-2 text-sm text-green-600 animate-fade-in-out">
          Copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default PasswordDisplay;