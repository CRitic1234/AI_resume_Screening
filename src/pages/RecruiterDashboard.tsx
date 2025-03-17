import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, UserCheck, UserX, Search } from 'lucide-react';

interface Candidate {
  id: number;
  name: string;
  role: string;
  atsScore: number;
  status: string;
  skills: string[];
}

const RecruiterDashboard = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/candidates')
      .then(response => {
        setCandidates(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch candidate data. Please ensure resumes have been uploaded.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Recruiter Dashboard
          </h1>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Post New Job
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={<Users className="h-6 w-6" />}
            title="Total Candidates"
            value={candidates.length.toString()}
            change="+12% from last week"
          />
          <StatCard
            icon={<UserCheck className="h-6 w-6" />}
            title="Shortlisted"
            value={candidates.filter(c => c.status === 'Shortlisted').length.toString()}
            change="+5% from last week"
          />
          <StatCard
            icon={<UserX className="h-6 w-6" />}
            title="Rejected"
            value={candidates.filter(c => c.status === 'Rejected').length.toString()}
            change="-2% from last week"
          />
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-8">
          <div className="flex items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search candidates..."
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <select className="ml-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option>All Roles</option>
              <option>Frontend</option>
              <option>Backend</option>
              <option>Full Stack</option>
            </select>
          </div>
        </div>

        {/* Candidates List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Candidate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  ATS Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Skills
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {candidates.map((candidate) => (
                <tr key={candidate.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {candidate.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {candidate.role}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {candidate.atsScore}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      candidate.status === 'Shortlisted'
                        ? 'bg-green-100 text-green-800'
                        : candidate.status === 'Under Review'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {candidate.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      {candidate.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, change }: { icon: JSX.Element; title: string; value: string; change: string; }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
    <div className="flex items-center">
      <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400">
        {icon}
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
        <div className="flex items-baseline">
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
          <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">{change}</p>
        </div>
      </div>
    </div>
  </div>
);

export default RecruiterDashboard;
