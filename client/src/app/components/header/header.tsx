import * as React from 'react';
import styled from 'styled-components';
import { d } from '../../../resources/stylesheets/dimensions';
import Logo from '../../../resources/assets/logo';
import media from '../../../resources/stylesheets/media';
import Nav from './nav';

const SHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  display: grid;
  grid-template-rows: ${d.header};
  grid-template-columns: ${d.header} 1fr max-content;
  grid-template-areas: 'logo . nav';
  padding: 0 ${d.computer.padding};
  @media (${media.tablet}) {
    padding: 0 ${d.tablet.padding};
  }
  @media (${media.phone}) {
    padding: 0 ${d.phone.padding};
  }
`;

const SLogo = styled(Logo)`
  grid-area: logo;
  height: calc(${d.header} / 1.5);
  width: calc(${d.header} / 1.5);
  justify-self: center;
  align-self: center;
`;

const Header: React.FC = () => (
    <SHeader>
      <SLogo />
      <Nav />
    </SHeader>
  );

export default Header;
