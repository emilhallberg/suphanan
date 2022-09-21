import * as React from 'react';
import styled from 'styled-components';
import Colors from '../../../../resources/stylesheets/colors';
import External, {
  ExternalProps,
} from '../../../../components/button/external';
import { hexa } from '../../../../utils/library';

const SSocial = styled(External)`
  display: grid;
  grid-template-columns: 40px;
  grid-template-rows: 40px;
  justify-content: center;
  align-content: center;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  background-color: ${Colors.text};
  color: ${Colors.background};
  transform: scale(1);
  transition: all 200ms ease-in-out;
  &:hover {
    background-color: ${hexa(Colors.text, 60)};
    transform: scale(1.1);
  }
`;

const Social: React.FC<ExternalProps> = ({ to, children }: ExternalProps) => <SSocial to={to}>{children}</SSocial>;

export default Social;
