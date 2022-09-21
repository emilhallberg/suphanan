import * as React from "react";
import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router";
import media from "../../../resources/stylesheets/media";
import { d } from "../../../resources/stylesheets/dimensions";
import Colors from "../../../resources/stylesheets/colors";
import routes from "../../../utils/routes/routes";
import useLanguage from "../../../hooks/useLanguage";
import Fonts from "../../../resources/stylesheets/fonts";

const SNav = styled.nav`
  grid-area: nav;
  display: grid;
  grid-auto-columns: max-content;
  grid-auto-flow: column;
  grid-gap: ${d.computer.gap};
  align-items: center;
  @media (${media.tablet}) {
    grid-gap: ${d.tablet.gap};
  }
  @media (${media.phone}) {
    grid-gap: ${d.phone.gap};
  }
`;

const SDot = styled.div`
  height: 8px;
  width: 8px;
  border-radius: 4px;
  background: ${Colors.text};
  transition: all 200ms ease-out;
  justify-self: center;
  transform: scale(0);
`;

const SLink = styled(NavLink)<{ $active: boolean }>`
  display: grid;
  grid-auto-rows: calc(${d.header} / 2) max-content;
  grid-gap: 8px;
  opacity: 0.5;
  transition: opacity 200ms ease-out;
  align-items: flex-end;
  text-transform: uppercase;
  font-size: ${Fonts.Size.large};
  ${({ $active }) =>
    $active &&
    css`
      opacity: 1;
      ${SDot} {
        transform: scale(1);
      }
    `}
  &:hover {
    opacity: 1;
    text-decoration: none;
    ${SDot} {
      transform: scale(1);
    }
  }
`;

const Nav: React.FC = () => {
  const lng = useLanguage();
  const location = useLocation();
  return (
    <SNav>
      {routes
        .filter(({ header }) => header)
        .map(({ title, path }) => (
          <SLink key={path} to={path} $active={location.pathname === path}>
            {title[lng]}
            <SDot />
          </SLink>
        ))}
    </SNav>
  );
};

export default Nav;
