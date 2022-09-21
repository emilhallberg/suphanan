import * as React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import media from '../../../../resources/stylesheets/media';
import { d } from '../../../../resources/stylesheets/dimensions';
import Hello from './hello';
import Inquiry from './inquiry';

const SGreeting = styled.section`
  display: grid;
  grid-template-columns: max-content max-content max-content;
  grid-template-rows: max-content max-content;
  grid-template-areas: '. . .' '. button .';
  justify-content: center;
  padding: 20vh ${d.computer.padding};
  grid-gap: ${d.computer.gap} 10vw;
  box-sizing: border-box;
  @media (${media.tablet}) {
    padding: 10vh ${d.tablet.padding};
    grid-gap: ${d.tablet.gap} 5vw;
  }
  @media (${media.phone}) {
    padding: 5vh ${d.phone.padding};
    grid-gap: ${d.phone.gap};
    grid-template-columns: max-content;
    grid-template-rows: repeat(4, max-content);
    grid-template-areas: '.' '.' '.' 'button';
  }
`;

const SThaiTitle = styled.div`
  grid-area: title;
  transform: translateY(-15px);
  justify-self: center;
`;

const Greeting: React.FC = () => {
  const { t } = useTranslation();

  return (
    <SGreeting>
      <Hello>
        <Hello.Title>{t('home.greeting.sv.title')}</Hello.Title>
        <Hello.Text>{t('home.greeting.sv.text')}</Hello.Text>
      </Hello>
      <Hello>
        <Hello.Title>{t('home.greeting.en.title')}</Hello.Title>
        <Hello.Text>{t('home.greeting.en.text')}</Hello.Text>
      </Hello>
      <Hello>
        <SThaiTitle>
          <Hello.Title>{t('home.greeting.th.title')}</Hello.Title>
        </SThaiTitle>
        <Hello.Text>{t('home.greeting.th.text')}</Hello.Text>
      </Hello>
      <Inquiry />
    </SGreeting>
  );
};

export default Greeting;
