"use client"

import Link from 'next/link';
import ImageGallery from '../components/ImageGallery';
import useCredits from '../hooks/useCredits';
import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

const Dashboard = () => {
 
  const [showAll, setShowAll] = useState(false);

  const { credits,isLoading }=useCredits();
  const userStats = {
    subscription: 'Pro',
    imagesGenerated: 24,
  };

  const recentGenerations = [
    { 
      id: 1, 
      prompt: 'A sunset over mountains', 
      url: '/placeholder1.jpg',
      createdAt: '2023-05-15T10:30:00Z'
    },
    { 
      id: 2, 
      prompt: 'Cyberpunk city street', 
      url: '/placeholder2.jpg',
      createdAt: '2023-05-14T15:45:00Z'
    },
    { 
      id: 3, 
      prompt: 'Portrait of a cat astronaut', 
      url: '/placeholder3.jpg',
      createdAt: '2023-05-13T09:20:00Z'
    },
    { 
      id: 4, 
      prompt: 'Abstract watercolor painting', 
      url: '/placeholder4.jpg',
      createdAt: '2023-05-12T14:10:00Z'
    },
    { 
      id: 5, 
      prompt: 'Futuristic car design', 
      url: '/placeholder5.jpg',
      createdAt: '2023-05-11T11:25:00Z'
    },
    { 
      id: 6, 
      prompt: 'Ancient library interior', 
      url: '/placeholder6.jpg',
      createdAt: '2023-05-10T16:40:00Z'
    },
    { 
      id: 7, 
      prompt: 'Underwater coral reef', 
      url: '/placeholder7.jpg',
      createdAt: '2023-05-09T13:15:00Z'
    },
    { 
      id: 8, 
      prompt: 'Mountain cabin in winter', 
      url: '/placeholder8.jpg',
      createdAt: '2023-05-08T08:50:00Z'
    },
    { 
      id: 9, 
      prompt: 'Mountain cabin in winter', 
      url: '/placeholder8.jpg',
      createdAt: '2023-05-08T08:50:00Z'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-700 mb-1">Available Credits</h3>
              <p className="text-4xl font-bold text-gray-800 mt-2">
       {isLoading ? (
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
            <p className="text-2xl font-bold text-gray-800 mt-2">{userStats.subscription}</p>
            <Link href="/pricing" className="text-indigo-500 text-sm mt-4 inline-block hover:underline">
              Upgrade plan
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-700">Images Generated</h3>
            <p className="text-4xl font-bold text-gray-800 mt-2">{userStats.imagesGenerated}</p>
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
        
        {/* Recent Generations */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Recent Generations</h2>
            <span className="text-indigo-500 text-sm hover:underline cursor-pointer" onClick={()=> setShowAll(true)}>
              View all
            </span>
          </div>
          <ImageGallery images={recentGenerations} showAll={showAll} setShowAll={setShowAll}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;