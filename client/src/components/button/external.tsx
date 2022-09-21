import * as React from 'react';

export interface ExternalProps {
  children: React.ReactChild | string;
  to: string;
  className?: string;
}

const External: React.FC<ExternalProps> = ({
  className,
  children,
  to,
}: ExternalProps) => (
  <a className={className} href={to} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

export default External;
