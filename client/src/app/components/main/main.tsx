import { FC } from "react";
import { Routes, Route } from "react-router";
import styled from "styled-components";
import routes from "../../../utils/routes/routes";
import Empty from "../../../components/empty";

const SMain = styled.main`
  grid-area: main;
  display: grid;
  z-index: 0;
`;

const Main: FC = () => (
  <SMain>
    <Routes>
      {routes.map(({ path, container }) => (
        <Route key={path} path={path} element={container} />
      ))}
      <Route path="*" element={<Empty />} />
    </Routes>
  </SMain>
);

export default Main;
