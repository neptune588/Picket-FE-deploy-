import styled from "styled-components";

import Icons from "@/assets/icons/leftArrow.svg?react";

const TopTitleBar = styled.nav`
  display: flex;
  align-items: center;
  height: 70px;
  padding-left: 80px;
  border-bottom: solid 1px
    ${({ theme: { colors } }) => {
      return colors.gray["40"];
    }};

  > h2 {
    font-size: ${({ theme: { typo } }) => {
      return typo.size.xl;
    }};
    font-weight: ${({ theme: { typo } }) => {
      return typo.weight.bold;
    }};
    margin-left: 15px;
  }
`;

export default function LocationBar({ content }) {
  return (
    <TopTitleBar>
      <Icons />
      <h2>{content}</h2>
    </TopTitleBar>
  );
}
