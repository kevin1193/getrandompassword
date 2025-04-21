import React from 'react';
import { BarChart2, Clock, Copy, Hash } from 'lucide-react';
import { PasswordAnalytics } from '../types/password';

interface AnalyticsPanelProps {
  analytics: PasswordAnalytics;
  sessionDuration: number;
  mostPopularLength: number | null;
}

const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({
  analytics,
  sessionDuration,
  mostPopularLength,
}) => {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <BarChart2 className="w-5 h-5 mr-2 text-blue-500" />
        Password Analytics
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Hash className="w-4 h-4 text-blue-500 mr-2" />
              <span className="text-sm text-gray-600">Total Generated</span>
            </div>
            <span className="font-mono text-lg text-gray-800">{analytics.totalGenerated}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Copy className="w-4 h-4 text-blue-500 mr-2" />
              <span className="text-sm text-gray-600">Times Copied</span>
            </div>
            <span className="font-mono text-lg text-gray-800">{analytics.totalCopied}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-blue-500 mr-2" />
              <span className="text-sm text-gray-600">Session Duration</span>
            </div>
            <span className="font-mono text-lg text-gray-800">{formatDuration(sessionDuration)}</span>
          </div>

          {mostPopularLength && (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Popular Length</span>
              <span className="font-mono text-lg text-gray-800">{mostPopularLength} chars</span>
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <div className="mt-4">
            <div className="text-sm text-gray-600 mb-2">Average Strength</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-blue-500 transition-all duration-500"
                style={{ width: `${analytics.averageStrength}%` }}
              ></div>
            </div>
            <div className="text-right text-sm text-gray-500 mt-1">
              {Math.round(analytics.averageStrength)}%
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Note:</span> We only track the number of passwords generated and copied to help improve our service. No passwords or personal data are stored.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;