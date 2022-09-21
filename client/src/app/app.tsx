import { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import media from "../resources/stylesheets/media";
import Colors from "../resources/stylesheets/colors";
import Header from "./components/header/header";
import Main from "./components/main/main";
import Footer from "./components/footer/footer";
import ScrollRestoration from "./components/scrollRestoration";
import Global from "../resources/stylesheets/global";

const SApp = styled.div`
  display: grid;
  grid-template-rows: minmax(100vh, max-content) max-content;
  grid-template-areas: "main" "footer";
  @media (${media.phone}) {
    background: ${Colors.background};
  }
`;

const App: FC = () => (
  <BrowserRouter>
    <SApp>
      <Header />
      <Main />
      <Footer />
      <Global />
    </SApp>
    <ScrollRestoration />
  </BrowserRouter>
);

export default App;
