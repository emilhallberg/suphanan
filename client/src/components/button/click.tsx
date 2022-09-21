import React, { FC, MouseEventHandler, ReactNode, useCallback } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const SContainer = styled(motion.div)`
  cursor: pointer;
  outline: none;
`;

export interface ClickProps {
  onClick: MouseEventHandler<HTMLDivElement>;
  children: ReactNode;
  className?: string;
}

const Click: FC<ClickProps> = ({
  onClick,
  children,
  className,
}: ClickProps) => {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter" && onClick) {
        // @ts-expect-error Ignore
        onClick(event);
      }
    },
    [onClick],
  );

  return (
    <SContainer
      className={className}
      role="button"
      // @ts-expect-error Ignore
      onKeyDown={handleKeyPress}
      tabIndex={0}
      onClick={onClick}
    >
      {children}
    </SContainer>
  );
};

export default Click;
