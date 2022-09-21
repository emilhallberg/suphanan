import * as React from 'react';
import { NavLink } from 'react-router-dom';

export interface LinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const Link: React.FC<LinkProps> = ({ to, children, className }: LinkProps) => (
  <NavLink to={to} className={className}>
    {children}
  </NavLink>
);

export default Link;
