import * as React from 'react';
import styled from 'styled-components';
import { ImageProps } from '../../../../utils/enums';
import External from '../../../../components/button/external';

const SMagazine = styled(External)`
  display: grid;
  width: 100%;
  max-height: 500px;
  transition: all 200ms ease-out;
  transform: scale(1);
  &:hover {
    transform: scale(1.1);
  }
`;

const SImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

interface MagazineProps {
  to: string;
  image: ImageProps;
}

const Magazine: React.FC<MagazineProps> = ({ to, image }: MagazineProps) => (
    <SMagazine to={to}>
      <SImage src={image.src} alt={image.src} />
    </SMagazine>
  );

export default Magazine;
