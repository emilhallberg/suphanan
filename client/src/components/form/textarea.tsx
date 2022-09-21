import { ChangeEventHandler, FC, useState } from "react";
import styled from "styled-components";
import Fonts from "../../resources/stylesheets/fonts";
import Colors from "../../resources/stylesheets/colors";

const SContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content max-content;
  border-bottom: 1px solid ${Colors.text};
  margin-bottom: 15px;
  width: 100%;
`;

const SEnter = styled.textarea`
  appearance: none;
  outline: none;
  border: none;
  background: none;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 20px;
  min-height: 150px;
  font-size: ${Fonts.Size.regular};
  font-weight: ${Fonts.Weight.regular};
  font-family: ${Fonts.Family.text};
  z-index: 1;
  resize: vertical;
  color: ${Colors.text};

  &:focus {
    outline: none;
  }
`;

interface SHeaderProps {
  active: boolean;
}

const SHeader = styled.i<SHeaderProps>`
  position: absolute;
  top: ${({ active }): string => (active ? "20px" : "0px")};
  left: 10px;
  right: 10px;
  text-align: left;
  font-size: ${({ active }): string =>
    active ? Fonts.Size.regular : Fonts.Size.smallX};
  font-weight: ${Fonts.Weight.regular};
  font-family: ${Fonts.Family.text};
  transition: 300ms ease-out;
  z-index: 0;
  color: ${Colors.text};
`;

const SCounter = styled.i`
  position: absolute;
  opacity: ${({ active }: SHeaderProps): number => (active ? 0 : 1)};
  bottom: ${({ active }: SHeaderProps): string => (active ? "0px" : "-20px")};
  right: 10px;
  font-size: ${Fonts.Size.small};
  font-weight: ${Fonts.Weight.regular};
  font-family: ${Fonts.Family.text};
  transition: 300ms ease-out;
  z-index: 0;
  color: ${Colors.text};
`;

interface TextareaProps {
  label: string;
  name: string;
  value?: string;
  onChange: unknown;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}

const Textarea: FC<TextareaProps> = ({
  label,
  name,
  value,
  onChange,
  required,
  minLength,
  maxLength,
}: TextareaProps) => {
  const [isEmpty, setIsEmpty] = useState(!value);
  return (
    <SContainer>
      <SHeader active={isEmpty}>{label}</SHeader>
      <SEnter
        name={name}
        value={value || ""}
        onChange={onChange as ChangeEventHandler<HTMLTextAreaElement>}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        onFocus={(): void => setIsEmpty(false)}
        onBlur={(e): void => setIsEmpty(!e.target.value)}
      />

      <SCounter active={isEmpty}>
        {`${value?.length || 0} / ${maxLength}`}
      </SCounter>
    </SContainer>
  );
};

Textarea.defaultProps = {
  value: "",
  required: false,
  minLength: 0,
  maxLength: 255,
};

export default Textarea;
