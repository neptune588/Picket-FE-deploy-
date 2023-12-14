import styled from "styled-components";

import Icons from "@/assets/icons/heart.svg?react";

const HeartIcon = styled(Icons)`
  fill: ${({ $isCliked, theme: { colors } }) => {
    return $isCliked ? colors.primary : colors.gray["40"];
  }};
  cursor: pointer;
`;

export default function LikeButton({ width, height, isClicked, onClick }) {
  return (
    <>
      <HeartIcon
        width={width}
        height={height}
        $isCliked={isClicked}
        onClick={onClick}
      />
    </>
  );
}
