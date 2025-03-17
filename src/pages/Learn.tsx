import React from 'react';
import { BookOpen, CheckCircle, Coffee } from 'lucide-react';

const Learn = () => {
  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
          Learn How to Optimize Your Resume
        </h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* ATS Optimization */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <BookOpen className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">ATS Optimization</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Learn how to make your resume ATS-friendly and increase your chances of getting past automated screening systems.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-700 dark:text-gray-200">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Use proper formatting
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-200">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Include relevant keywords
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-200">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Avoid complex layouts
              </li>
            </ul>
          </div>

          {/* Resume Writing Tips */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <Coffee className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Resume Writing Tips</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Master the art of writing compelling resume content that highlights your achievements and skills.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-700 dark:text-gray-200">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Use action verbs
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-200">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Quantify achievements
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-200">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Tailor for each job
              </li>
            </ul>
          </div>

          {/* Industry Best Practices */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <BookOpen className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Industry Best Practices</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Stay updated with the latest resume trends and industry-specific requirements.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-700 dark:text-gray-200">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Industry standards
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-200">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Current trends
              </li>
              <li className="flex items-center text-gray-700 dark:text-gray-200">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Professional formatting
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;