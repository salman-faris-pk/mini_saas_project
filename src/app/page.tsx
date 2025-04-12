
'use client';

import Link from 'next/link';
import PricingCards from './components/PricingCards';
import useAuth from './hooks/useAuth';
import { useRouter } from 'next/navigation';
import Loader from './components/Loader';

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const router=useRouter()

  if (isLoading) {
    return (
      <Loader/>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br pt-2 pb-10 from-blue-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* Hero section */}
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl p-8 md:p-12">
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-100 rounded-full opacity-20"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-100 rounded-full opacity-20"></div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Transform Your <span className="text-blue-600">Ideas</span> Into Stunning Visuals
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Our AI-powered platform turns your text descriptions into breathtaking images.
            Start with <span className="font-semibold text-blue-600">5 free credits</span> and unlock limitless creativity.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {isAuthenticated ? (
              <Link
                href="/generate"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Start Generating
              </Link>
            ) : (
              <>
                <button
                  onClick={()=> router.push('/register')}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Get Started - It's Free
                </button>
                <button
                  onClick={()=> router.push('/login')}
                  className="px-8 py-3 border-2 border-blue-500 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Already have an account?
                </button>
              </>
            )}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 font-semibold mb-6">Powered by top image providers</p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              <img src="https://cdn.worldvectorlogo.com/logos/freepik-1.svg" alt="Freepik" className="h-10 w-auto opacity-70 hover:opacity-100 transition duration-300" />
              <img src="https://cdn.worldvectorlogo.com/logos/unsplash.svg" alt="Unsplash" className="h-8 w-auto opacity-70 hover:opacity-100 transition duration-300" />
              <img src="https://cdn.worldvectorlogo.com/logos/pexels-1.svg" alt="Pexels" className="h-10 w-auto opacity-70 hover:opacity-100 transition duration-300" />
              <img src="https://cdn.worldvectorlogo.com/logos/pixabay.svg" alt="Pixabay" className="h-10 w-auto opacity-70 hover:opacity-100 transition duration-300" />
            </div>
          </div>
        </div>
        
        {/* Features preview */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-blue-500 mb-4 text-2xl">✨</div>
            <h3 className="font-bold text-lg mb-2">High-Quality Images</h3>
            <p className="text-gray-600">Generate stunning 4K resolution images from simple text prompts.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-blue-500 mb-4 text-2xl">⚡</div>
            <h3 className="font-bold text-lg mb-2">Lightning Fast</h3>
            <p className="text-gray-600">Get your images in seconds with our optimized AI models.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-blue-500 mb-4 text-2xl">🔄</div>
            <h3 className="font-bold text-lg mb-2">Multiple Variations</h3>
            <p className="text-gray-600">Generate different versions of your idea with a single click.</p>
          </div>
        </div>

        <PricingCards />
      </div>
    </div>
  );
}