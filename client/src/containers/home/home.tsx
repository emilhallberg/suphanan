import { FC } from "react";
import styled from "styled-components";
import Header from "./components/header";
import Greeting from "./components/greeting/greeting";
import Information from "./components/information";
import useLanguage from "../../hooks/useLanguage";
import {
  information,
  InformationProps,
} from "../../resources/data/information";
import About from "./components/about";

const SHome = styled.div`
  display: grid;
  grid-auto-rows: max-content;
`;

const Home: FC = () => {
  const lng = useLanguage();

  const i = ({ id, title, text, image }: InformationProps) => (
    <Information key={id} image={image}>
      <Information.Title>{title[lng]}</Information.Title>
      <Information.Text>{text[lng]}</Information.Text>
    </Information>
  );

  return (
    <SHome>
      <Header />
      <Greeting />
      {information.map(i)}
      <About />
    </SHome>
  );
};

export default Home;
