'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CreditCounter from './CreditCounter';
import useAuth from '../hooks/useAuth';
import useCredits from "../hooks/useCredits"

export default function Navbar() {
  const pathname = usePathname();
  const {
    isAuthenticated,
    logout,
  } = useAuth();

  const { credits }=useCredits();

  const getSubscriptionBadge = (subscription: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap";
    
    switch(subscription) {
      case 'pro':
        return `${baseClasses} bg-blue-200 text-blue-800 border border-blue-200`;
      case 'Elite':
        return `${baseClasses} bg-purple-100 text-purple-800 border border-purple-200`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800 border border-gray-200`;
    }
  };

 

  return (
    <header className="bg-white border-b border-gray-200 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              <span className="text-blue-600 me-2">AI</span>PICSO
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/generate" 
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${pathname === '/generate' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
            >
              Generate
            </Link>
            <Link 
              href="/pricing" 
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${pathname === '/pricing' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
            >
              Pricing
            </Link>
            {isAuthenticated && (
              <Link 
                href="/dashboard" 
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${pathname === '/dashboard' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
              >
                Dashboard
              </Link>
            )}
          </nav>

          {isAuthenticated && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
              {(pathname !== '/generate' && pathname !== '/dashboard') && <CreditCounter credits={credits} />}
                <div className={getSubscriptionBadge('free')}>
                  {'free'}
                </div>
              </div>
              <button
                onClick={() => logout()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

