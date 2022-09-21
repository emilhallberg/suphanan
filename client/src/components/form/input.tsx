import { ChangeEvent, ChangeEventHandler, useState } from "react";
import * as React from "react";
import styled from "styled-components";
import Fonts from "../../resources/stylesheets/fonts";
import Colors from "../../resources/stylesheets/colors";

const SContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50px;
  border-bottom: 1px solid ${Colors.text};
  width: 100%;
`;

const SEnter = styled.input`
  appearance: none;
  outline: none;
  border: none;
  background: none;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: ${Fonts.Size.regular};
  font-weight: ${Fonts.Weight.regular};
  font-family: ${Fonts.Family.text};
  z-index: 1;
  color: ${Colors.text};
  &:focus {
    outline: none;
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-transition: color 9999s ease-out, background-color 9999s ease-out;
    -webkit-transition-delay: 9999s;
  }
`;

interface SHeaderProps {
  active: boolean;
}

const SHeader = styled.i<SHeaderProps>`
  position: absolute;
  top: ${({ active }): string => (active ? "20px" : "0px")};
  left: 10px;
  font-size: ${({ active }): string =>
    active ? Fonts.Size.regular : Fonts.Size.smallX};
  font-weight: ${Fonts.Weight.regular};
  font-family: ${Fonts.Family.text};
  transition: 300ms ease-out;
  color: ${Colors.text};
`;

interface InputProps {
  type: string;
  label: string;
  name: string;
  value?: string;
  onChange: unknown;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}

const Input: React.FC<InputProps> = ({
  type,
  label,
  name,
  value,
  onChange,
  required,
  minLength,
  maxLength,
}: InputProps) => {
  const [isEmpty, setIsEmpty] = useState(!value);
  return (
    <SContainer>
      <SHeader active={isEmpty}>{label}</SHeader>
      <SEnter
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange as ChangeEventHandler<HTMLInputElement>}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        onFocus={(): void => setIsEmpty(false)}
        onBlur={(e): void => setIsEmpty(!e.target.value)}
      />
    </SContainer>
  );
};

Input.defaultProps = {
  value: "",
  required: false,
  minLength: 0,
  maxLength: 255,
};

export default Input;
