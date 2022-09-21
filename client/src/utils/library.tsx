import { v4 } from 'uuid';

export const hexo = (hex: string, o: number): string =>
  `rgba(${parseInt(hex.slice(1, 3), 16)},${parseInt(
    hex.slice(3, 5),
    16
  )},${parseInt(hex.slice(5, 7), 16)},${o})`;

export function hexa(hex: string, a: number): string {
  return `#${hex
    .replace(/^#/, '')
    .replace(/../g, (color) =>
      `0${Math.min(255, Math.max(0, parseInt(color, 16) + a)).toString(
        16
      )}`.substr(-2)
    )}`;
}

export const uuid: () => string = () => v4();
