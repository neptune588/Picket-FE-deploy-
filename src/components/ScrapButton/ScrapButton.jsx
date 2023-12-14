import styled from "styled-components";

import Icons from "@/assets/icons/scrap.svg?react";

const ScrapIcon = styled(Icons)`
  fill: ${({ $isClicked, theme: { colors } }) => {
    return $isClicked ? colors.primary : colors.gray["40"];
  }};
  cursor: pointer;
`;
export default function ScrapButton({ width, height, isClicked, onClick }) {
  return (
    <>
      <ScrapIcon
        width={width}
        height={height}
        $isClicked={isClicked}
        onClick={onClick}
      />
    </>
  );
}
