// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { Button } from '@/components/ui/button';
import { Code, Target, Zap, BarChart3, ArrowRight } from 'lucide-react';

export const Home: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const features = [
    {
      icon: Code,
      title: 'Real Code Snippets',
      description: 'Practice with actual code from various programming languages and domains',
    },
    {
      icon: Target,
      title: 'Accuracy Tracking',
      description: 'Monitor your typing accuracy and identify areas for improvement',
    },
    {
      icon: Zap,
      title: 'Speed Metrics',
      description: 'Track your WPM (Words Per Minute) and see your progress over time',
    },
    {
      icon: BarChart3,
      title: 'Detailed Statistics',
      description: 'Analyze your performance across different languages and difficulty levels',
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          Master <span className="text-primary-600">Code Typing</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Improve your coding speed and accuracy by practicing with real code snippets.
          Choose from multiple programming languages and difficulty levels.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          {isAuthenticated ? (
            <Link to="/practice">
              <Button size="lg" className="flex items-center">
                Start Practicing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Sign In
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Features</h2>
          <dl className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8">
            {features.map((feature) => (
              <div key={feature.title}>
                <dt>
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="mt-5 text-lg leading-6 font-medium text-gray-900">
                    {feature.title}
                  </p>
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Stats Preview */}
      {!isAuthenticated && (
        <div className="bg-primary-50 rounded-lg p-8">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Join thousands of developers improving their typing skills
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-bold text-primary-600">10+</div>
                <div className="text-sm text-gray-600">Programming Languages</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-600">5</div>
                <div className="text-sm text-gray-600">Difficulty Levels</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-600">AI</div>
                <div className="text-sm text-gray-600">Generated Snippets</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};