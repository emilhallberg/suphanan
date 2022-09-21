import * as React from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import Colors from '../resources/stylesheets/colors';
import Fonts from '../resources/stylesheets/fonts';
import { d } from '../resources/stylesheets/dimensions';
import media from '../resources/stylesheets/media';

const SModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(34, 34, 34, 0.6);
  backdrop-filter: blur(5px);
  display: grid;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const SBox = styled(motion.div)`
  width: 50vw;
  background: ${Colors.background};
  position: relative;
  border-radius: 4px;
  padding: ${d.computer.padding};
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: max-content;
  grid-gap: 16px;
  grid-auto-flow: row;
  @media (${media.tablet}) {
    padding: ${d.tablet.padding};
  }
  @media (${media.phone}) {
    padding: ${d.phone.padding};
    width: auto;
    position: absolute;
    top: ${d.phone.padding};
    left: ${d.phone.padding};
    right: ${d.phone.padding};
    bottom: ${d.phone.padding};
  }
`;

const SButton = styled(motion.button)`
  display: grid;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  border-radius: 15px;
  font-size: ${Fonts.Size.largeX};
  font-family: ${Fonts.Family.head};
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
`;

interface ModalProps {
  close: React.EventHandler<React.SyntheticEvent>;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ close, children }: ModalProps) => {
  const isBrowser = typeof window !== 'undefined';
  if (isBrowser) {
    return createPortal(
      <SModal
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <SBox
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          {children}
          <SButton onClick={close} whileHover={{ scale: 1.1 }}>
            X
          </SButton>
        </SBox>
      </SModal>,
      document.querySelector('#modal') as Element
    );
  }
  return null;
};

export default Modal;
