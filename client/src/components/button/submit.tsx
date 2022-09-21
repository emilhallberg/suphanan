import * as React from 'react';
import styled from 'styled-components';

const SContainer = styled.button`
  cursor: pointer;
  outline: none;
`;

interface SubmitProps {
  children: React.ReactChild;
  className?: string;
}

const Submit: React.FC<SubmitProps> = ({
  children,
  className,
}: SubmitProps) => (
    <SContainer type="submit" className={className} tabIndex={0}>
      {children}
    </SContainer>
  );

Submit.defaultProps = {
  className: '',
};

export default Submit;
