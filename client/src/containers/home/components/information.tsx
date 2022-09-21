import * as React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { d } from "../../../resources/stylesheets/dimensions";
import media from "../../../resources/stylesheets/media";
import Fonts from "../../../resources/stylesheets/fonts";
import useWhenInView from "../../../hooks/useWhenInView";

const SImage = styled.img`
  grid-column: 1 / 3;
  grid-row: 1 / 3;
  display: grid;
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: 0;
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
  &:hover {
    filter: none;
  }
`;

const STitle = styled.h1`
  grid-column: 2 / 4;
  grid-row: 1 / span 1;
  align-self: flex-end;
  padding: ${d.phone.padding};
  font-family: ${Fonts.Family.hand};
  font-weight: ${Fonts.Weight.regular};
  z-index: 1;
  &::first-letter {
    font-family: ${Fonts.Family.head};
    font-size: ${Fonts.Size.largeXXXXX};
  }
`;

const SText = styled.p`
  grid-column: 3 / 4;
  grid-row: 2 / column-end;
  padding: ${d.phone.padding};
  width: 70%;
  z-index: 1;
`;

const SInformation = styled(motion.div)`
  display: grid;
  grid-template-columns: calc(50vh - 64px) 64px 1fr;
  grid-template-rows: 15vh 35vh;
  justify-content: center;
  box-sizing: border-box;
  align-content: center;
  padding: 10vh 15vw;
  @media (${media.tablet}) {
    padding: ${d.tablet.padding};
  }
  @media (${media.phone}) {
    padding: ${d.phone.padding};
    grid-template-columns: calc(50vw - 64px) 64px 1fr;
  }
  &:nth-child(even) {
    grid-template-columns: 1fr 64px 50vh;
    ${SImage} {
      grid-column: 3 / 4;
    }
    ${STitle} {
      grid-column: 2 / 3;
    }
    ${SText} {
      grid-column: 1 / 3;
      text-align: right;
      justify-self: flex-end;
    }
    @media (${media.phone}) {
      grid-template-columns: 1fr 64px 50vw;
    }
  }
`;

interface InformationComp<T> extends React.FC<T> {
  Title: typeof STitle;
  Text: typeof SText;
}

interface InformationProps {
  image: { src: string; alt: string };
  children: React.ReactNode;
}

const Information: InformationComp<InformationProps> = ({
  image,
  children,
}: InformationProps) => {
  const { ref, visible } = useWhenInView(400);
  return (
    <SInformation
      ref={ref}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : "16px" }}
    >
      <SImage src={image.src} alt={image.alt} />
      {children}
    </SInformation>
  );
};

Information.Title = STitle;
Information.Text = SText;

export default Information;
