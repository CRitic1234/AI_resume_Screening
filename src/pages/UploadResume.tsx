import React, { useState } from 'react';
import { Upload, FileText, AlertCircle, XCircle } from 'lucide-react';
import axios from 'axios';

const UploadResume = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(selectedFile.type)) {
        setError('Invalid file format. Only PDF, DOC, and DOCX allowed.');
        setFile(null);
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be under 10MB.');
        setFile(null);
        return;
      }
      setError('');
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }
    setUploading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data && response.data.Scoring) {
        setSuccess('Resume uploaded and analyzed successfully!');
        console.log("Analysis result:", response.data);
        // Optionally, redirect to the dashboard page
      } else {
        setError('Upload failed. Please try again.');
      }
    } catch (err) {
      setError('Error uploading file. Check your connection.');
    }
    setUploading(false);
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Upload Your Resume
          </h1>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md inline-flex items-center"
              >
                <FileText className="h-5 w-5 mr-2" />
                Choose File
                <input id="file-upload" type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
              </label>
            </div>
            {file && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Selected: {file.name} 
                <button className="ml-2 text-red-500" onClick={() => setFile(null)}>
                  <XCircle className="inline h-4 w-4" />
                </button>
              </p>
            )}
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className={`bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {uploading ? 'Uploading...' : 'Upload Resume'}
            </button>
          </div>
          {success && <p className="mt-4 text-center text-green-500">{success}</p>}
          <div className="mt-8">
            <div className="bg-blue-50 dark:bg-blue-900 rounded-md p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    What happens next?
                  </h3>
                  <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Your resume will be analyzed by our AI system</li>
                      <li>You'll receive an ATS compatibility score</li>
                      <li>We'll provide detailed formatting suggestions</li>
                      <li>You'll get keyword and skill gap analysis</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadResume;
