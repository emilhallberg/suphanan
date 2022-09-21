import { motion } from 'framer-motion';
import * as React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Colors from '../../../../resources/stylesheets/colors';
import { hexo } from '../../../../utils/library';
import Magazine from './magazine';
import { d } from '../../../../resources/stylesheets/dimensions';
import media from '../../../../resources/stylesheets/media';
import Fonts from '../../../../resources/stylesheets/fonts';
import useWhenInView from '../../../../hooks/useWhenInView';
import {
  magazines,
  MagazinesProps,
} from '../../../../resources/data/magazines';
import Information from './information';

const SMagazines = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content max-content 1fr;
  min-height: 100vh;
  background: linear-gradient(
    to bottom,
    ${hexo(Colors.contrast, 0.5)} 5%,
    transparent
  );
  padding: 15vh 15vw;
  grid-gap: ${d.computer.gap};
  box-sizing: border-box;
  @media (${media.tablet}) {
    padding: 10vh ${d.tablet.padding};
    grid-gap: ${d.tablet.gap};
  }
  @media (${media.phone}) {
    padding: 5vh ${d.phone.padding};
  }
`;

const STitle = styled(motion.h1)`
  text-transform: uppercase;
  justify-self: center;
  font-size: ${Fonts.Size.largeXXXXX};
  display: grid;
  grid-template-columns: max-content max-content;
  &:before {
    padding-top: 5px;
    content: '01';
    font-size: ${Fonts.Size.largeXX};
  }
  @media (${media.phone}) {
    padding: 5vh 0;
    font-size: ${Fonts.Size.largeXXX};
    &:before {
      padding-top: 5px;
      content: '01';
      font-size: ${Fonts.Size.large};
    }
  }
`;

const SContainer = styled(motion.div)`
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 32px;
  background-size: 20px 20px;
  position: relative;
  @media (${media.phone}) {
    justify-content: center;
    grid-template-columns: 325px;
    grid-template-rows: repeat(4, max-content);
  }
`;

const Corner = styled.div`
  position: absolute;
  height: 32px;
  width: 32px;
`;

const TopLeftCorner = styled(Corner)`
  top: -13px;
  left: -3px;
  border-top: 3px solid ${Colors.text};
  border-left: 3px solid ${Colors.text};
`;

const BottomRightCorner = styled(Corner)`
  bottom: -12px;
  right: 3px;
  border-bottom: 3px solid ${Colors.text};
  border-right: 3px solid ${Colors.text};
`;

const createMagazine = ({ id, to, image }: MagazinesProps) => (
  <Magazine key={id} to={to} image={image} />
);

const Magazines: React.FC = () => {
  const { t } = useTranslation();
  const { ref, visible } = useWhenInView(350);
  const animate = { opacity: visible ? 1 : 0, y: visible ? 0 : '16px' };
  return (
    <SMagazines ref={ref}>
      <STitle animate={animate}>{t('projects.magazines.title')}</STitle>
      <SContainer animate={animate}>
        <TopLeftCorner />
        <BottomRightCorner />
        {magazines.map(createMagazine)}
      </SContainer>
      <Information>
        <Information.Title>
          {t('projects.magazines.information.title')}
        </Information.Title>
        <Information.SubTitle>
          {t('projects.magazines.information.subTitle')}
        </Information.SubTitle>
        <Information.Text>
          {t('projects.magazines.information.text')}
        </Information.Text>
      </Information>
    </SMagazines>
  );
};

export default Magazines;
