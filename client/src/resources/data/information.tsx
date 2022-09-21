import { ImageProps, TranslationProps } from '../../utils/enums';
import { uuid } from '../../utils/library';

export interface InformationProps {
  id: string;
  title: TranslationProps;
  text: TranslationProps;
  image: ImageProps;
}

export const information: InformationProps[] = [
  {
    id: uuid(),
    title: { sv: 'Kreativ', en: 'Creative' },
    text: {
      sv:
        'Jag tycker om att tänka utanför boxen för att kunna få fram nya och kreativa idéer och lösningar.',
      en: '',
    },
    image: { src: '/images/home/creative.png', alt: 'Creative' },
  },
  {
    id: uuid(),
    title: { sv: 'Engagerad', en: 'Driven' },
    text: {
      sv:
        'Att vara en social person gör att jag ständigt är nyfiken och gillar att träffa nya människor för att kunna lära sig utav varandra. ',
      en: '',
    },
    image: { src: '/images/home/driven.png', alt: 'Driven' },
  },
  {
    id: uuid(),
    title: { sv: 'Noggrann', en: 'Meticulous' },
    text: {
      sv:
        'Jag är en strukturerad och uppmärksam person som drivs av att resultatet blir som önskat. För mig är det viktigt med detaljer.',
      en: '',
    },
    image: { src: '/images/home/meticulous.jpg', alt: 'Meticulous' },
  },
];
