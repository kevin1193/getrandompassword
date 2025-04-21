import React from 'react';
import { PasswordHistoryItem } from '../types/password';
import { ClipboardCopy, Trash2 } from 'lucide-react';
import { getStrengthLabel } from '../utils/passwordUtils';

interface PasswordHistoryProps {
  history: PasswordHistoryItem[];
  onUsePassword: (password: string) => void;
  onClearHistory: () => void;
}

const PasswordHistory: React.FC<PasswordHistoryProps> = ({
  history,
  onUsePassword,
  onClearHistory,
}) => {
  if (history.length === 0) {
    return (
      <div className="p-5 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Password History</h2>
        </div>
        <p className="text-sm text-gray-500 italic">No passwords saved yet.</p>
      </div>
    );
  }

  return (
    <div className="p-5 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Password History</h2>
        <button
          onClick={onClearHistory}
          className="flex items-center text-sm text-red-500 hover:text-red-700 transition-colors"
        >
          <Trash2 size={16} className="mr-1" />
          Clear
        </button>
      </div>
      <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
        {history.map((item) => {
          const { color } = getStrengthLabel(item.strength);
          const date = new Date(item.timestamp);
          const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          
          return (
            <div
              key={item.id}
              className="p-3 bg-gray-50 rounded-md border border-gray-100 hover:border-blue-200 transition-colors"
            >
              <div className="flex justify-between items-center">
                <div className="w-full mr-2 overflow-hidden">
                  <div className="font-mono text-sm truncate">{item.password}</div>
                  <div className="flex items-center mt-1">
                    <div
                      className="w-2 h-2 rounded-full mr-2"
                      style={{ backgroundColor: color }}
                    ></div>
                    <span className="text-xs text-gray-500">{formattedTime}</span>
                  </div>
                </div>
                <button
                  onClick={() => onUsePassword(item.password)}
                  className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors rounded-md hover:bg-blue-50 flex-shrink-0"
                  aria-label="Use this password"
                >
                  <ClipboardCopy size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PasswordHistory;