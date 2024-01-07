import styled from "styled-components";

import Icons from "@/assets/icons/scrap.svg?react";
/* fill: ${({ $isClicked, theme: { colors } }) => {
  return $isClicked ? colors.primary : colors.gray["40"];
}}; */
const ScrapIcon = styled(Icons)`
  fill: ${({ theme: { colors } }) => {
    return colors.gray["40"];
  }};
  cursor: pointer;
`;
export default function ScrapButton({
  width,
  height,
  handleScrapClick = null,
}) {
  return (
    <>
      <ScrapIcon width={width} height={height} onClick={handleScrapClick} />
    </>
  );
}
