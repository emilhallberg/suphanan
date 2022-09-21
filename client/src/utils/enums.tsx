export enum Lang {
  SV = 'sv',
  EN = 'en',
}

export const Category = {
  Project: { sv: 'Projekt', en: 'Project' },
  Work: { sv: 'Arbete', en: 'Work' },
  University: { sv: 'Universitet', en: 'University' },
};

export interface TranslationProps {
  sv: string;
  en: string;
}

export interface ImageProps {
  src: string;
  alt: string;
}
