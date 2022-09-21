import { motion } from 'framer-motion';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Fonts from '../../../resources/stylesheets/fonts';
import media from '../../../resources/stylesheets/media';

const SHeader = styled(motion.section)`
  display: grid;
  background: url('/images/home/header.jpg') center center no-repeat;
  background-size: cover;
  height: 100vh;
  grid-template-columns: 1fr 1.5fr 1fr;
  grid-template-rows: 50vh max-content max-content 1fr;
  grid-template-areas: '. . .' 'firstName . .' 'lastName . .' '. . .';
  @media (${media.phone}) {
    grid-template-areas: '. . .' '. firstName .' '. lastName . ' '. . .';
  }
`;

const STitle = styled(motion.h1)`
  display: grid;
  grid-template-rows: max-content max-content;
  justify-content: flex-end;
  text-transform: uppercase;
  font-size: ${Fonts.Size.largeXXXXX};
`;

const SFirstName = styled(STitle)`
  grid-area: firstName;
`;

const SLastName = styled(STitle)`
  grid-area: lastName;
`;

const Header: React.FC = () => {
  const { t } = useTranslation();
  return (
    <SHeader>
      <SFirstName animate={{ opacity: [0, 0.5, 1], y: [-10, 0] }}>
        {t('home.header.firstName')}
      </SFirstName>
      <SLastName animate={{ opacity: [0, 0.5, 1], y: [10, 0] }}>
        {t('home.header.lastName')}
      </SLastName>
    </SHeader>
  );
};

export default Header;
