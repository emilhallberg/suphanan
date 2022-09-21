import { motion } from 'framer-motion';
import * as React from 'react';
import styled from 'styled-components';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import Colors from '../../../resources/stylesheets/colors';
import useWhenInView from '../../../hooks/useWhenInView';
import Social from './components/social';
import LinkedIn from '../../../resources/assets/linkedin';
import Instagram from '../../../resources/assets/instagram';
import Pintrest from '../../../resources/assets/pintrest';
import { d } from '../../../resources/stylesheets/dimensions';
import media from '../../../resources/stylesheets/media';
import Link from '../../../components/button/link';
import routes from '../../../utils/routes/routes';
import useLanguage from '../../../hooks/useLanguage';
import { Lang } from '../../../utils/enums';
import Click from '../../../components/button/click';
import Fonts from '../../../resources/stylesheets/fonts';
import { hexo } from '../../../utils/library';

const SFooter = styled(motion.footer)`
  grid-area: footer;
  z-index: 1;
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr;
  grid-template-rows: 256px;
  justify-content: center;
  grid-gap: ${d.computer.gap};
  padding: ${d.computer.padding};
  background: linear-gradient(
    to top,
    ${hexo(Colors.contrast, 0.5)} 5%,
    transparent
  );
  @media (${media.tablet}) {
    grid-gap: ${d.tablet.gap};
    padding: ${d.tablet.padding};
    grid-template-columns: 2fr 1fr 1fr;
  }
  @media (${media.phone}) {
    grid-gap: 5vh ${d.phone.gap};
    padding: ${d.phone.padding};
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, max-content);
  }
`;

const SSocials = styled.div`
  display: grid;
  grid-auto-columns: max-content;
  grid-auto-flow: column;
  justify-content: center;
  grid-gap: 5vw;
  @media (${media.tablet}) {
    grid-gap: ${d.tablet.gap};
  }
  @media (${media.phone}) {
    grid-gap: ${d.phone.gap};
    justify-content: space-between;
  }
`;

const SColumn = styled.div`
  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 8px;
`;

const STitle = styled.h2`
  text-transform: uppercase;
`;

const SLink = styled(Link)`
  text-transform: uppercase;
  font-size: ${Fonts.Size.large};
`;

interface SLanguageProps {
  active: boolean;
}

const SLanguage = styled.p<SLanguageProps>`
  opacity: ${({ active }): number => (active ? 1 : 0.5)};
  &:hover {
    opacity: 1;
  }
`;

const Footer: React.FC = () => {
  const lng = useLanguage();
  const { t, i18n } = useTranslation();
  const { ref, visible } = useWhenInView(100);
  const animate = { opacity: visible ? 1 : 0, y: visible ? 0 : '16px' };

  return (
    <SFooter ref={ref} animate={animate}>
      <SSocials>
        <Social to="https://www.linkedin.com/in/suphanan-chatphutsa-219544150/">
          <LinkedIn />
        </Social>
        <Social to="https://www.instagram.com/scuperman/">
          <Instagram />
        </Social>
        <Social to="https://www.pinterest.se/suppiis/">
          <Pintrest />
        </Social>
      </SSocials>
      <SColumn>
        <STitle>{t('footer.nav')}</STitle>
        {routes
          .filter(({ header }) => header)
          .map(({ title, path }) => (
            <SLink key={path} to={path}>
              {title[lng]}
            </SLink>
          ))}
      </SColumn>
      <SColumn>
        <STitle>{t('footer.language')}</STitle>
        <Click onClick={(): Promise<TFunction> => i18n.changeLanguage(Lang.SV)}>
          <SLanguage active={i18n.language === Lang.SV}>SV</SLanguage>
        </Click>
      </SColumn>
    </SFooter>
  );
};

export default Footer;
