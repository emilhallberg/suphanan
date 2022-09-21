import { ImageProps, TranslationProps } from '../../utils/enums';

export interface Project {
  id: string;
  images: ImageProps[];
  title: TranslationProps;
  text: TranslationProps;
  bullets?: TranslationProps[];
  current?: boolean;
}

export const projects: Project[] = [
  {
    id: 'senseworks',
    images: [{ src: '/images/projects/senseworks-1.png', alt: 'Senseworks' }],
    title: { sv: 'Senseworks', en: 'Senseworks' },
    text: {
      sv:
        'Marknadsför ett företag som utvecklar dataanalysverktyg för revisorer och ekonomisk rådgivare.',
      en: '',
    },
    bullets: [
      { sv: 'Marknadsföringsstrategier', en: '' },
      { sv: 'Sociala medier', en: '' },
    ],
    current: true,
  },
  {
    id: 'fowlit',
    images: [{ src: '/images/projects/fowlit-1.png', alt: 'Fowlit' }],
    title: { sv: 'Fowlit', en: 'Fowlit' },
    text: {
      sv:
        'Marknadsför ett IT-konsult företag som skapar moderna webbapplikationer.',
      en: '',
    },
    bullets: [
      { sv: 'Sociala medier', en: '' },
      { sv: 'Digitala analyser', en: '' },
      { sv: 'Fotograf', en: '' },
    ],
    current: true,
  },
  {
    id: 'try-it',
    images: [
      { src: '/images/projects/try-it-1.png', alt: 'Try It 1' },
      { src: '/images/projects/try-it-2.png', alt: 'Try It 2' },
      { src: '/images/projects/try-it-3.png', alt: 'Try It 3' },
    ],
    title: { sv: 'Try It', en: 'Try It' },
    text: {
      sv: 'Grafisk profil för en restaurang i Hälsingland.',
      en: '',
    },
    bullets: [
      { sv: 'Logotyp', en: '' },
      { sv: 'Färgkarta', en: '' },
      { sv: 'A la carte meny', en: '' },
      { sv: 'Take away meny', en: '' },
    ],
  },
  {
    id: 'iggesunds-ik',
    images: [
      { src: '/images/projects/iggesunds-ik-1.png', alt: 'Iggesunds IK' },
    ],
    title: { sv: 'Iggesunds IK', en: 'Iggesunds IK' },
    text: {
      sv:
        'Fotograf och kreatör för annonser för iggesunds IK samt Camp Igge och Ankarmons camping.',
      en: '',
    },
  },
  {
    id: 'elastisys',
    images: [{ src: '/images/projects/elastisys-1.png', alt: 'Elastisys' }],
    title: { sv: 'Elastisys', en: 'Elastisys' },
    text: {
      sv:
        'Examensarbete om konsumenternas köpbeteende inom B2B. Arbetet skrevs i samarbete med Elastisys, ett IT-företag i Umeå.',
      en: '',
    },
  },
];
