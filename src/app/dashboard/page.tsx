"use client"

import Link from 'next/link';
import ImageGallery from '../components/ImageGallery';
import useCredits from '../hooks/useCredits';
import useImages from '../hooks/useDashboard';
import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

const Dashboard = () => {
  const [showAll, setShowAll] = useState(false);
  const { credits, isLoading: isCreditsLoading, plan } = useCredits();
  const { count, recentImages, isLoading: isImagesLoading } = useImages();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-700 mb-1">Available Credits</h3>
            <p className="text-4xl font-bold text-gray-800 mt-2">
              {isCreditsLoading ? (
                <span className="flex items-center space-x-2">
                  <FaSpinner className="animate-spin w-6 h-6 text-gray-500" />
                  <span className="text-sm text-gray-500">Loading...</span>
                </span>
              ) : (
                credits
              )}
            </p>
            <Link href="/pricing" className="text-indigo-500 text-sm mt-4 inline-block hover:underline">
              Get more
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-700">Subscription Plan</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">
              {isCreditsLoading ? (
                <FaSpinner className="animate-spin w-6 h-6 text-gray-500" />  
              ) : (
                plan
              )}
            </p>
            <Link href="/pricing" className="text-indigo-500 text-sm mt-4 inline-block hover:underline">
              Upgrade plan
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-700">Images Generated</h3>
            <p className="text-4xl font-bold text-gray-800 mt-2">
              {isImagesLoading ? (
                <FaSpinner className="animate-spin w-6 h-6 text-gray-500" />
              ) : (
                count
              )}
            </p>
            <Link href="/generate" className="text-indigo-500 text-sm mt-4 inline-block hover:underline">
              Generate more
            </Link>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/generate" className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors">
              Generate New Image
            </Link>
            <Link href="/pricing" className="bg-white text-indigo-600 px-6 py-3 rounded-md font-medium border border-indigo-600 hover:bg-indigo-50 transition-colors">
              View Pricing Plans
            </Link>
            <Link href="/dashboard/account" className="bg-white text-gray-700 px-6 py-3 rounded-md font-medium border border-gray-300 hover:bg-gray-50 transition-colors">
              Account Settings
            </Link>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Recent Generations</h2>
            {recentImages.length > 0 && (
              <span className="text-indigo-500 text-sm hover:underline cursor-pointer" onClick={() => setShowAll(true)}>
                View all
              </span>
            )}
          </div>
          {isImagesLoading ? (
            <div className="flex justify-center items-center h-40">
              <FaSpinner className="animate-spin w-8 h-8 text-gray-500" />
            </div>
          ) : recentImages.length > 0 ? (
            <ImageGallery images={recentImages} showAll={showAll} setShowAll={setShowAll} />
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
              <p className="text-gray-500">No images generated yet</p>
              <Link href="/generate" className="text-indigo-500 mt-2 inline-block hover:underline">
                Generate your first image
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;