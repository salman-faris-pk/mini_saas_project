'use client';
import Link from 'next/link';
import { CheckCircle2, Zap, Sparkles } from 'lucide-react';

export default function PricingCards() {
  const session=null;

  const plans = [
    {
      name: 'Free',
      price: '$0',
      duration: 'forever',
      features: [
        '5 free credits',
        'Basic image generation',
        'Standard resolution',
        'Community support'
      ],
      cta: session ? 'Current Plan' : 'Get Started',
      href: '/generate',
      popular: false,
      icon: <CheckCircle2 className="w-5 h-5" />,
      borderColor: 'border-teal-200',
      buttonStyle: 'bg-teal-200 text-gray-800 hover:bg-teal-500',
      hoverRing: 'hover:ring-2 hover:ring-teal-700'
    },
    {
      name: 'Pro',
      price: '$19',
      duration: '/month',
      features: [
        '100 credits/month',
        'Priority generation',
        'High resolution',
        'Advanced models',
        'Email support'
      ],
      cta: 'Upgrade Now',
      href: '/pricing?plan=pro',
      popular: true,
      icon: <Zap className="w-5 h-5 text-yellow-500" />,
      borderColor: 'border-cyan-100',
      buttonStyle: 'bg-cyan-100 text-white hover:bg-blue-400',
      hoverRing: 'hover:ring-2 hover:ring-blue-800'
    },
    {
      name: 'Elite',
      price: '$49',
      duration: '/month',
      features: [
        'Unlimited credits',
        'Ultra-fast generation',
        '4K resolution',
        'All premium models',
        'VIP support',
        'Commercial license'
      ],
      cta: 'Go Elite',
      href: '/pricing?plan=elite',
      popular: false,
      icon: <Sparkles className="w-5 h-5 text-purple-500" />,
      borderColor: 'border-purple-300',
      buttonStyle: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700',
      hoverRing: 'hover:ring-2 hover:ring-purple-700'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {plans.map((plan) => (
        <div 
          key={plan.name}
          className={`relative rounded-2xl border ${plan.borderColor} bg-white p-6 shadow-sm transition-all hover:shadow-md ${
            plan.popular ? 'ring-2 ring-blue-500' : ''
          } ${plan.hoverRing}`}
        >
          {plan.popular && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              MOST POPULAR
            </div>
          )}
          
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              {plan.icon}
              {plan.name}
            </h3>
            <div className="text-right">
              <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
              <span className="text-gray-500">{plan.duration}</span>
            </div>
          </div>
          
          <ul className="space-y-3 mb-6">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
          
          <Link
            href={plan.href}
            className={`block w-full py-3 px-4 rounded-lg text-center font-medium transition-colors ${plan.buttonStyle}`}
          >
            {plan.cta}
          </Link>
        </div>
      ))}
    </div>
  </div>
  );
}