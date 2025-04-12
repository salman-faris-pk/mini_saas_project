// 'use client';

// import { Elements } from '@stripe/stripe-react-components';
// import { loadStripe } from '@stripe/stripe-js';

// export default function StripeProvider({ children }) {
//   const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  
//   return (
//     <Elements stripe={stripePromise}>
//       {children}
//     </Elements>
//   );
// }