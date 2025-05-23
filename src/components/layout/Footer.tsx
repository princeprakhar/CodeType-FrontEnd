// src/components/layout/Footer.tsx
import React from 'react';
import { Mail, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              CodeType
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Improve your coding speed and accuracy with our interactive typing game. 
              Practice with real code snippets from various programming languages and domains.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/princeprakhar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="GitHub"
              >
                Github
              </a>
              <a
                href="https://x.com/PRAKHARDEEP18"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Twitter"
              >
                Twitter
              </a>
              <a
                href="mailto:prakhardeep173@gmail.com"
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/practice"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Practice
                </a>
              </li>
              <li>
                <a
                  href="/stats"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Statistics
                </a>
              </li>
              <li>
                <a
                  href="/leaderboard"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Leaderboard
                </a>
              </li>
              <li>
                <a
                  href="/settings"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Settings
                </a>
              </li>
            </ul>
          </div>

          {/* Support
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/help"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="/feedback"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Send Feedback
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div> */}
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} CodeType. All rights reserved.
            </p>
            <div className="flex items-center mt-4 md:mt-0">
              <span className="text-sm text-gray-500 flex items-center">
                Made with <Heart className="h-4 w-4 text-red-500 mx-1" fill="currentColor" /> for developers
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;