import * as React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const SEmpty = styled.div`
  display: grid;
  grid-auto-rows: max-content;
  justify-items: center;
  align-self: center;
`;

const Empty: React.FC = () => {
  const { t } = useTranslation();
  return (
    <SEmpty>
      <h1>{t("empty.title")}</h1>
      <p>{t("empty.text")}</p>
    </SEmpty>
  );
};

export default Empty;
