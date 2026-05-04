import React from 'react';
import LyzardLogo from './LyzardLogo';

const Logo = ({ className = "", size = 40, variant = "light", src }) => (
  <LyzardLogo className={className} size={size} variant={variant} src={src} />
);

export default Logo;
