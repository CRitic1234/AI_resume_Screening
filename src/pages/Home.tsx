import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Users, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block">Optimize Your Resume with</span>
              <span className="block text-indigo-200">AI-Powered Insights</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-indigo-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Get instant feedback, ATS compatibility scores, and tailored recommendations to make your resume stand out.
            </p>
            <div className="mt-10 flex justify-center gap-8">
              <Link
                to="/upload-resume"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600"
              >
                <FileText className="mr-2" size={20} />
                Upload Resume
              </Link>
              <Link
                to="/recruiter-dashboard"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
              >
                <Users className="mr-2" size={20} />
                For Recruiters
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Why Choose AI Resume Screener?
            </h2>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
            <FeatureCard
              title="Smart Analysis"
              description="Get instant ATS compatibility scores and detailed feedback on your resume's effectiveness."
              icon={<FileText className="h-8 w-8 text-indigo-600" />}
            />
            <FeatureCard
              title="Skill Gap Analysis"
              description="Identify missing skills and keywords based on your target job descriptions."
              icon={<Users className="h-8 w-8 text-indigo-600" />}
            />
            <FeatureCard
              title="Format Optimization"
              description="Receive suggestions for improving your resume's structure and readability."
              icon={<ArrowRight className="h-8 w-8 text-indigo-600" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, icon }) => (
  <div className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
    <div className="absolute top-6 left-6">{icon}</div>
    <div className="pt-16">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
      <p className="mt-4 text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  </div>
);

export default Home;