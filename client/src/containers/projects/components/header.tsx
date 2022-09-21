import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import media from '../../../resources/stylesheets/media';
import Fonts from '../../../resources/stylesheets/fonts';
import Colors from '../../../resources/stylesheets/colors';

const SHeader = styled.section`
  display: grid;
  background: ${Colors.background} url('/images/projects.png') no-repeat center
    center;
  background-size: cover;
  height: 100vh;
  grid-template-columns: 1fr max-content 2fr;
  grid-template-rows: 1fr max-content max-content 1fr;
  grid-template-areas: '. . .' '. t1 .' '. t2 .' '. . .';
  @media (${media.phone}) {
  }
`;

const STitle = styled.h1`
  display: grid;
  grid-template-rows: max-content max-content;
  text-transform: uppercase;
  font-size: ${Fonts.Size.largeXXXXX};
`;

const ST1 = styled(STitle)`
  grid-area: t1;
`;

const ST2 = styled(STitle)`
  grid-area: t2;
`;

const Header: React.FC = () => {
  const { t } = useTranslation();
  return (
    <SHeader>
      <ST1>{t('projects.header.t1')}</ST1>
      <ST2>{t('projects.header.t2')}</ST2>
    </SHeader>
  );
};

export default Header;
