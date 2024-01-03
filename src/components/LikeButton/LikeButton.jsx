import styled from "styled-components";

import Icons from "@/assets/icons/heart.svg?react";

/* fill: ${({ $isCliked, theme: { colors } }) => {
  return $isCliked ? colors.primary : colors.gray["40"];
}}; */

const HeartIcon = styled(Icons)`
  fill: ${({ theme: { colors } }) => {
    return colors.gray["40"];
  }};
  cursor: pointer;
`;

export default function LikeButton({ width, height, handleHeartClick }) {
  return (
    <>
      <HeartIcon width={width} height={height} onClick={handleHeartClick} />
    </>
  );
}
