import React from "react";
import { projects, home } from "./paths";
import Home from "../../containers/home/home";
import Projects from "../../containers/projects/projects";

const routes = [
  { ...home, container: <Home /> },
  { ...projects, container: <Projects /> },
];

export default routes;
