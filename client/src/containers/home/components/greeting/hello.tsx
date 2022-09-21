import * as React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { d } from "../../../../resources/stylesheets/dimensions";
import useWhenInView from "../../../../hooks/useWhenInView";

const SHello = styled(motion.div)`
  display: grid;
  grid-template-columns: 256px;
  grid-template-rows: 64px 256px;
  grid-gap: ${d.phone.gap};
  grid-template-areas: "title" "text";
  justify-self: center;
`;

const STitle = styled.h1`
  grid-area: title;
  text-transform: uppercase;
  justify-self: center;
`;

const SText = styled.p`
  grid-area: text;
  text-align: justify;
`;

interface HelloComp<T> extends React.FC<T> {
  Title: typeof STitle;
  Text: typeof SText;
}

interface HelloProps {
  className?: string;
  children: React.ReactNode;
}

const Hello: HelloComp<HelloProps> = ({ className, children }: HelloProps) => {
  const { ref, visible } = useWhenInView(150);
  return (
    <SHello
      ref={ref}
      className={className}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : "16px" }}
    >
      {children}
    </SHello>
  );
};

Hello.defaultProps = {
  className: "",
};

Hello.Title = STitle;
Hello.Text = SText;

export default Hello;
