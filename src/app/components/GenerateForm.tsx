'use client';

import Link from 'next/link';
import Loader from './Loader';
import { FaCrown } from 'react-icons/fa6';

export default function GenerateForm({
  prompt,
  setPrompt,
  isGenerating,
  handleGenerate,
  credits: rawCredits,
  user,
  loading
}: any) {
  
  const credits = rawCredits ?? 0;
  const isFormDisabled = !user || (user && credits <= 0);

  
  if (loading || rawCredits === undefined || rawCredits === null) {
    return <Loader />;
  }

  return (
    <form onSubmit={handleGenerate} className="space-y-4">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
          Describe the image you want to generate
        </label>
        <textarea
          id="prompt"
          rows={3}
          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
            isFormDisabled ? 'bg-gray-100 cursor-not-allowed' : ''
          }`}
          placeholder="A futuristic cityscape at sunset with flying cars..."
          value={prompt}
          onChange={(e) => !isFormDisabled && setPrompt(e.target.value)}
          disabled={isGenerating || isFormDisabled}
        />
      </div>

      <div className="flex items-center justify-between">
        {user ? (
          <>
            {credits <= 0 ? (
              <Link 
              href="/pricing"
              className="flex items-center px-6 py-2 rounded-lg font-medium text-white bg-yellow-500 hover:bg-yellow-600 transition-colors"
            >
              <FaCrown className="mr-2 text-xl" />
               <span className='text-lg mt-1'>Premium</span>
            </Link>
            ) : (
              <button
                type="submit"
                disabled={!prompt.trim() || isGenerating}
                className={`px-6 py-3 rounded-lg font-medium text-white ${
                  (!prompt.trim() || isGenerating)
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                } transition-colors`}
              >
                {isGenerating ? 'Generating...' : 'Generate'}
              </button>
            )}

            <div className="text-sm">
            {credits > 0 ? (
        <span className="text-gray-600">
          You have <span className="font-semibold">{credits}</span> credit{credits > 1 ? 's' : ''} remaining
         </span>
        ) : (
       <span className="text-amber-600 me-5">
          Get premium for unlimited credits
        </span>
          )}
          </div>
          </>
        ) : (
          <div className="w-full text-center space-y-4">
            <p className="text-gray-600">
              You need to be logged in to generate images
            </p>
            <Link
              href="/login"
              className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Sign in to your account
            </Link>
            <p className="text-sm text-gray-500">
              Don't have an account?{' '}
              <Link href="/register" className="text-indigo-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        )}
      </div>
    </form>
  );
}
