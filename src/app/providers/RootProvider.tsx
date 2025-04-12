'use client';

import { ReactNode } from "react";
import AuthProvider from "./AuthProvider";
// import StripeProvider from "./StripeProvider";


interface RootProviderProps {
  children: ReactNode;
}

export default function RootProvider({ children }:RootProviderProps) {
  return (
    <AuthProvider>
      {/* <StripeProvider> */}
        {children}
      {/* </StripeProvider> */}
    </AuthProvider>
  );
}