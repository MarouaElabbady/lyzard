import React from 'react';
import { AuthComponent } from "@/components/auth/SignUp";

import Logo from '../components/Logo';

const Signup = () => {
  return (
    <AuthComponent 
      logo={<Logo className="h-12 w-12 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" />} 
      brandName="Lyzard AI" 
    />
  );
};

export default Signup;
