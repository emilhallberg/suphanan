import * as React from "react";
import styled from "styled-components";
import { d } from "../../../../resources/stylesheets/dimensions";
import media from "../../../../resources/stylesheets/media";

const SInformation = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-template-rows: max-content 1fr;
  grid-template-areas: "title text" "subTitle text";
  justify-content: center;
  grid-gap: 0 32px;
  @media (${media.phone}) {
    grid-template-columns: 325px;
    grid-template-rows: repeat(3, max-content);
    grid-gap: ${d.phone.gap};
    grid-template-areas: "title" "subTitle" "text";
  }
`;

const STitle = styled.h1`
  grid-area: title;
  text-transform: uppercase;
`;

const SSubTitle = styled.h5`
  grid-area: subTitle;
  text-transform: uppercase;
`;

const SText = styled.p`
  padding-top: 6px;
  grid-area: text;
`;

interface InformationComp<T> extends React.FC<T> {
  Title: typeof STitle;
  SubTitle: typeof SSubTitle;
  Text: typeof SText;
}

interface InformationProps {
  children: React.ReactNode;
}

const Information: InformationComp<InformationProps> = ({
  children,
}: InformationProps) => <SInformation>{children}</SInformation>;

Information.Title = STitle;
Information.SubTitle = SSubTitle;
Information.Text = SText;

export default Information;
