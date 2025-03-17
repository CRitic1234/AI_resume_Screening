import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, FileText, Target, AlertTriangle } from 'lucide-react';

interface AnalysisData {
  StructuredResume: any;
  Scoring: {
    "Total Score": number;
    "Max Score": number;
    "Relevance Percentage": number;
  };
}

const Dashboard = () => {
  const [data, setData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/dashboard')
      .then(response => {
        // If there's an "Error" key, handle it
        if (response.data.Error) {
          setError(response.data.Error);
        } else {
          // This is your result_data { StructuredResume, Scoring }
          setData(response.data);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch dashboard data. Please upload a resume first.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  // If there's no data, show a fallback
  if (!data) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400">
        No resume analysis found. Please upload a resume.
      </p>
    );
  }

  // Let's display "Total Score / Max Score" for the ATS Score
  const totalScore = data.Scoring["Total Score"];
  const maxScore = data.Scoring["Max Score"];
  const atsDisplay = `${totalScore} / ${maxScore}`;

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Resume Analysis Dashboard
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="ATS Score"
            value={atsDisplay}
            icon={<BarChart className="h-6 w-6 text-indigo-600" />}
            description="Your resume is well-optimized"
          />
          <StatCard
            title="Keywords Match"
            value="92%" // Hard-coded placeholder
            icon={<Target className="h-6 w-6 text-green-600" />}
            description="Strong keyword alignment"
          />
          <StatCard
            title="Format Score"
            value="78/100" // Hard-coded placeholder
            icon={<FileText className="h-6 w-6 text-blue-600" />}
            description="Good formatting, some improvements needed"
          />
          <StatCard
            title="Missing Skills"
            value="3" // Hard-coded placeholder
            icon={<AlertTriangle className="h-6 w-6 text-yellow-600" />}
            description="Consider adding these skills"
          />
        </div>

        {/* Detailed Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnalysisSection
            title="Improvement Suggestions"
            items={data.StructuredResume?.ImprovementSuggestions || ["No suggestions available"]}
          />
          <AnalysisSection
            title="Missing Keywords"
            items={data.StructuredResume?.MissingKeywords || ["No missing keywords available"]}
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, description }: {
  title: string;
  value: string;
  icon: JSX.Element;
  description: string;
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
    <div className="flex items-center">
      {icon}
      <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
    </div>
    <p className="mt-4 text-3xl font-semibold text-gray-900 dark:text-white">{value}</p>
    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
  </div>
);

const AnalysisSection = ({ title, items }: { title: string; items: string[] }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{title}</h3>
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <span className="flex-shrink-0 h-5 w-5 text-indigo-500">•</span>
          <span className="ml-2 text-gray-600 dark:text-gray-300">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default Dashboard;
