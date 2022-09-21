import * as React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import media from '../../../resources/stylesheets/media';
import { d } from '../../../resources/stylesheets/dimensions';
import { projects } from '../../../utils/routes/paths';
import Link from '../../../components/button/link';
import Button from '../../../components/button/button';
import Colors from '../../../resources/stylesheets/colors';
import { uuid } from '../../../utils/library';
import useWhenInView from '../../../hooks/useWhenInView';

const SAbout = styled(motion.div)`
  display: grid;
  grid-template-columns: 320px 180px;
  grid-template-rows: max-content max-content;
  grid-template-areas: 'title title' '. link';
  grid-gap: 64px;
  justify-content: center;
  box-sizing: border-box;
  position: relative;
  padding: 20vh ${d.computer.padding};
  overflow: hidden;
  @media (${media.tablet}) {
    padding: 30vh;
    grid-template-columns: 1fr max-content;
  }
  @media (${media.phone}) {
    padding: 30vh ${d.computer.padding};
    grid-template-columns: 1fr max-content;
  }
`;

const STitle = styled.h1`
  text-transform: uppercase;
  grid-area: title;
  position: relative;
`;

const SLink = styled(Link)`
  grid-area: link;
`;

const SDots = styled.div`
  position: absolute;
  display: grid;
  grid-gap: 4px;
  z-index: -1;
`;

const SLeftDots = styled(SDots)`
  top: -77px;
  left: -16px;
  grid-template-columns: max-content max-content;
  grid-template-rows: repeat(4, max-content);
`;

const SRightDots = styled(SDots)`
  top: 32px;
  right: -32px;
  grid-template-columns: repeat(6, max-content);
  grid-template-rows: repeat(4, max-content);
`;

const SDot = styled.div`
  background: ${Colors.contrast};
  height: 24px;
  width: 24px;
  border-radius: 50%;
`;

const createDots = (n: number) =>
  [...Array(n)].map(() => <SDot key={uuid()} />);

const About: React.FC = () => {
  const { t } = useTranslation();
  const { ref, visible } = useWhenInView(150);

  const left = createDots(8);
  const right = createDots(24);

  return (
    <SAbout ref={ref} animate={{ opacity: visible ? 1 : 0 }}>
      <STitle>
        <SLeftDots>{left}</SLeftDots>
        {t('home.about.title')}
        <SRightDots>{right}</SRightDots>
      </STitle>
      <SLink to={projects.path}>
        <Button label={t('dictionary.read')} />
      </SLink>
    </SAbout>
  );
};

export default About;
