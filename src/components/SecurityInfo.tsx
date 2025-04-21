import React from 'react';
import { Shield } from 'lucide-react';

const SecurityInfo: React.FC = () => {
  return (
    <section aria-labelledby="security-heading" className="bg-white rounded-lg shadow-md p-6">
      <h2 id="security-heading" className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Shield className="w-5 h-5 mr-2 text-blue-500" />
        How It Works
      </h2>
      <div className="prose prose-sm text-gray-600">
        <p>Our password generator uses the Web Crypto API's cryptographically secure random number generator to create truly random and unpredictable passwords.</p>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>All generation happens locally in your browser</li>
          <li>No passwords are ever transmitted or stored</li>
          <li>Open-source and transparent security</li>
          <li>Customizable password criteria</li>
        </ul>
      </div>
    </section>
  );
};

export default SecurityInfo; 