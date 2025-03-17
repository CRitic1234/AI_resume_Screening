import React from 'react';
import { Mail, MessageSquare, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Contact Us
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <ContactMethod
                icon={<Phone className="h-6 w-6" />}
                title="Phone"
                content="+1 (555) 123-4567"
              />
              <ContactMethod
                icon={<Mail className="h-6 w-6" />}
                title="Email"
                content="support@aiscreener.com"
              />
              <ContactMethod
                icon={<MessageSquare className="h-6 w-6" />}
                title="Live Chat"
                content="Available 24/7"
              />
            </div>

            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactMethod = ({ icon, title, content }) => (
  <div className="flex flex-col items-center text-center p-4">
    <div className="h-12 w-12 text-indigo-600 dark:text-indigo-400">
      {icon}
    </div>
    <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
    <p className="mt-1 text-gray-500 dark:text-gray-400">{content}</p>
  </div>
);

export default Contact;