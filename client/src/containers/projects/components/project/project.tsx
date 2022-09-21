import * as React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import useWhenInView from "../../../../hooks/useWhenInView";
import { ImageProps } from "../../../../utils/enums";
import { d } from "../../../../resources/stylesheets/dimensions";
import media from "../../../../resources/stylesheets/media";
import Fonts from "../../../../resources/stylesheets/fonts";

const SProject = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: max-content;
  align-content: center;
  align-items: center;
  grid-gap: 120px;
  grid-template-areas: "image content";
  height: 80vh;
  padding: 15vh 15vw;
  box-sizing: border-box;
  @media (${media.tablet}) {
    padding: 10vh ${d.tablet.padding};
  }
  @media (${media.phone}) {
    padding: 5vh ${d.phone.padding};
    height: auto;
    grid-template-columns: 1fr;
    grid-template-rows: max-content max-content;
    grid-gap: ${d.tablet.gap};
    grid-template-areas:
      "image"
      "content";
  }
`;

const SImage = styled.img<ImageProps>`
  grid-area: image;
  height: 50vh;
  width: 70vh;
  justify-self: flex-end;
  object-fit: cover;
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
  &:hover {
    filter: none;
  }
  @media (${media.phone}) {
    width: 100%;
    height: 300px;
    justify-self: center;
  }
`;

const SContent = styled.div`
  grid-area: content;
  display: grid;
  justify-self: flex-start;
  grid-auto-rows: max-content;
  grid-gap: 8px;
  align-items: center;
  align-self: center;
  padding: 32px 0;
`;

interface STitleProps {
  index: number;
}

const createIndex = (i: number) => (i > 10 ? `${i}` : `0${i + 1}`);

const STitle = styled.h1<STitleProps>`
  width: 325px;
  justify-self: center;
  position: relative;
  &:before {
    content: "${({ index }) => createIndex(index)}";
    position: absolute;
    top: 1px;
    left: -32px;
    font-size: ${Fonts.Size.largeX};
  }
  @media (${media.phone}) {
    width: 80%;
  }
`;

const SText = styled.p`
  width: 325px;
  justify-self: center;
  @media (${media.phone}) {
    width: 80%;
  }
`;

const SBullets = styled.ul`
  width: 325px;
  justify-self: center;
  @media (${media.phone}) {
    width: 80%;
  }
`;

const SBullet = styled.li``;

const SButton = styled.div`
  width: 325px;
  display: grid;
  justify-content: flex-start;
  justify-self: center;
  @media (${media.phone}) {
    width: 80%;
  }
`;

interface ProjectComp<T> extends React.FC<T> {
  Image: typeof SImage;
  Content: typeof SContent;
  Title: typeof STitle;
  Text: typeof SText;
  Bullets: typeof SBullets;
  Bullet: typeof SBullet;
  Button: typeof SButton;
}

interface ProjectProps {
  children: React.ReactNode;
}

const Project: ProjectComp<ProjectProps> = ({ children }: ProjectProps) => {
  const { ref, visible } = useWhenInView(400);
  const animate = { opacity: visible ? 1 : 0, y: visible ? 0 : "16px" };
  return (
    <SProject ref={ref} animate={animate}>
      {children}
    </SProject>
  );
};

Project.Image = SImage;
Project.Content = SContent;
Project.Title = STitle;
Project.Text = SText;
Project.Bullets = SBullets;
Project.Bullet = SBullet;
Project.Button = SButton;

export default Project;
