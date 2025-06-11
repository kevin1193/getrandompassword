import React, { lazy, Suspense } from 'react';
import { usePasswordGenerator } from '../hooks/usePasswordGenerator';
import PasswordDisplay from './PasswordDisplay';
import PasswordOptions from './PasswordOptions';
import PasswordStrength from './PasswordStrength';
import AnalyticsPanel from './AnalyticsPanel';
import { Github } from 'lucide-react';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);

const SecurityInfo = lazy(() => import('./SecurityInfo'));

const PasswordGenerator: React.FC = () => {
  const {
    password,
    strength,
    stats,
    options,
    copied,
    analytics,
    isLoading,
    sessionDuration,
    mostPopularLength,
    generateNewPassword,
    copyToClipboard,
    updateOption,
  } = usePasswordGenerator();

  if (isLoading) {
    return <LoadingSpinner />;
  }

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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Free Password Generator</h1>
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
            <PasswordStrength strength={strength} stats={stats} />
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
                  alt="Free Password Generator - Strong & secure | getrandompassword.com | Product Hunt" 
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