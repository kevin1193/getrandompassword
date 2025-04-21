import React, { useMemo } from 'react';
import { getStrengthLabel } from '../utils/passwordUtils';
import { PasswordStats } from '../types/password';

interface PasswordStrengthProps {
  strength: number;
  stats: PasswordStats | null;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ strength, stats }) => {
  const { label, color } = useMemo(() => getStrengthLabel(strength), [strength]);
  
  return (
    <div className="mt-4 space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">Password Strength</span>
          <span 
            className="text-sm font-medium transition-colors duration-300"
            style={{ color }}
          >
            {label}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${strength}%`, backgroundColor: color }}
          ></div>
        </div>
      </div>

      {stats && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-700">Password Entropy</span>
            <span className="text-sm font-mono bg-gray-200 px-2 py-1 rounded">
              {stats.entropy} bits
            </span>
          </div>
          
          <div className="space-y-2">
            <div className="text-xs text-gray-500">Character Distribution:</div>
            {Object.entries(stats.characterTypes).map(([type, count]) => count > 0 && (
              <div key={type} className="flex justify-between text-sm">
                <span className="capitalize">{type}</span>
                <span className="font-mono">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordStrength;