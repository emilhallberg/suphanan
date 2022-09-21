import { ImageProps } from '../../utils/enums';
import { uuid } from '../../utils/library';

export interface MagazinesProps {
  id: string;
  to: string;
  image: ImageProps;
}

export const magazines: MagazinesProps[] = [
  {
    id: uuid(),
    to: 'https://issuu.com/ekbladet/docs/ekbladet_1801_issuu',
    image: { src: '/images/projects/ekblad-1.jpg', alt: 'Ekblad 1' },
  },
  {
    id: uuid(),
    to: 'https://issuu.com/ekbladet/docs/ekbladet-1802',
    image: { src: '/images/projects/ekblad-2.jpg', alt: 'Ekblad 2' },
  },
  {
    id: uuid(),
    to: 'https://issuu.com/ekbladet/docs/1803',
    image: { src: '/images/projects/ekblad-3.jpg', alt: 'Ekblad 3' },
  },
  {
    id: uuid(),
    to: 'https://issuu.com/ekbladet/docs/ekbladet1804',
    image: { src: '/images/projects/ekblad-4.jpg', alt: 'Ekblad 4' },
  },
];
