import React, { lazy, Suspense, useState, useCallback, useEffect } from 'react';
import { usePasswordGenerator } from '../hooks/usePasswordGenerator';
import PasswordDisplay from './PasswordDisplay';
import PasswordOptions from './PasswordOptions';
import PasswordStrength from './PasswordStrength';
import AnalyticsPanel from './AnalyticsPanel';
import { Github, Copy, RefreshCw, Shield, ShieldCheck, ShieldAlert } from 'lucide-react';
import zxcvbn from 'zxcvbn';

interface StrengthResult {
  strength: string;
  color: string;
  icon: JSX.Element;
  feedback: string;
  entropy: number;
}

const LoadingSpinner = () => (
  <div className="flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);

const SecurityInfo = lazy(() => import('./SecurityInfo'));

const PasswordGenerator: React.FC = () => {
  const {
    password,
    stats,
    options,
    copied,
    generateNewPassword,
    copyToClipboard,
    updateOption,
  } = usePasswordGenerator();

  const [strengthResult, setStrengthResult] = useState<StrengthResult>({
    strength: 'weak',
    color: 'text-red-500',
    icon: <ShieldAlert className="w-5 h-5" />,
    feedback: '',
    entropy: 0
  });

  const calculateEntropy = useCallback((password: string): number => {
    const charSet = new Set(password.split(''));
    const length = password.length;
    const uniqueChars = charSet.size;
    return Math.log2(Math.pow(uniqueChars, length));
  }, []);

  const calculateStrength = useCallback((password: string): StrengthResult => {
    const result = zxcvbn(password);
    const score = result.score;
    const feedback = result.feedback.warning || result.feedback.suggestions[0] || '';
    const entropy = calculateEntropy(password);
    
    let strength = 'weak';
    let color = 'text-red-500';
    let icon = <ShieldAlert className="w-5 h-5" />;
    
    if (score >= 3) {
      strength = 'strong';
      color = 'text-green-500';
      icon = <ShieldCheck className="w-5 h-5" />;
    } else if (score >= 2) {
      strength = 'medium';
      color = 'text-yellow-500';
      icon = <Shield className="w-5 h-5" />;
    }
    
    return { strength, color, icon, feedback, entropy };
  }, [calculateEntropy]);

  useEffect(() => {
    setStrengthResult(calculateStrength(password));
  }, [password, calculateStrength]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 mb-6 shadow-md">
            <img 
              src="/logo.png" 
              alt="Password Generator Logo" 
              className="h-16 w-16 transform transition-transform hover:scale-110" 
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Random Password Generator</h1>
          <p className="text-xl text-gray-600">Generate strong, secure passwords instantly</p>
          <p className="text-sm text-gray-500 mt-1">No tracking, no storage, 100% private</p>
        </header>

        <div className="space-y-6">
          <section aria-label="Password Generator" className="bg-white rounded-lg shadow-md p-6">
            <PasswordDisplay
              password={password}
              copied={copied}
              onCopy={copyToClipboard}
              onGenerate={generateNewPassword}
            />
            <div className="mt-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Password Strength:</span>
                  <span className={`text-sm font-medium ${strengthResult.color}`}>
                    {strengthResult.strength}
                  </span>
                  {strengthResult.icon}
                </div>
                <div className="flex items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Entropy: {Math.round(strengthResult.entropy)} bits
                  </span>
                </div>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${
                    strengthResult.strength === 'strong' 
                      ? 'bg-green-500' 
                      : strengthResult.strength === 'medium' 
                      ? 'bg-yellow-500' 
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(100, (strengthResult.entropy / 128) * 100)}%` }}
                ></div>
              </div>
              {strengthResult.feedback && (
                <p className="mt-2 text-sm text-gray-600">{strengthResult.feedback}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Powered by{' '}
                <a 
                  href="https://dropbox.tech/security/zxcvbn-realistic-password-strength-estimation" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 underline"
                >
                  Dropbox's zxcvbn algorithm
                </a>
                {' '}for realistic password strength estimation
              </p>
            </div>
          </section>

          <section aria-label="Password Options">
            <PasswordOptions options={options} updateOption={updateOption} />
          </section>

          <Suspense fallback={<div className="animate-pulse h-32 bg-gray-100 rounded-lg"></div>}>
            <SecurityInfo />
          </Suspense>

          <footer className="text-center text-sm text-gray-500 mt-8">
            <div className="flex justify-center mb-4">
              <a 
                href="https://www.producthunt.com/posts/free-password-generator?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-free-password-generator" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <img 
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=954936&theme=neutral" 
                  alt="Random Password Generator - Strong & secure | getrandompassword.com | Product Hunt" 
                  style={{ width: '250px', height: '54px' }} 
                  width="250" 
                  height="54" 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `
                      <div class="bg-gray-100 p-4 rounded-lg">
                        <p class="text-sm text-gray-600">Featured on Product Hunt</p>
                        <a href="https://www.producthunt.com/posts/free-password-generator" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           class="text-blue-500 hover:underline">
                          View on Product Hunt
                        </a>
                      </div>
                    `;
                  }}
                />
              </a>
            </div>
            <p>
              Your passwords are generated locally and are never stored on any server.
              We prioritize your privacy and security.
            </p>
            <div className="flex justify-center space-x-4 mt-4">
              <a
                href="https://github.com/kevin1193/getrandompassword"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Github className="h-5 w-5 inline-block mr-1" />
                View on GitHub
              </a>
            </div>
            <p className="mt-4">
              © {new Date().getFullYear()} getrandompassword.com - Free Online Password Generator
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
};

export default PasswordGenerator;