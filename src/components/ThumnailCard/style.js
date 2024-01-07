import styled from "styled-components";
import complete from "@/assets/icons/complete.svg?react";

const Container = styled.li`
  position: relative;
  width: ${({ $width }) => {
    return $width;
  }};
  user-select: none;
`;

const ThumnailImgBox = styled.div`
  position: relative;
  height: ${({ $height }) => {
    return $height;
  }};
  overflow: hidden;
  border-radius: 15px;
  cursor: pointer;
  > h2 {
    position: absolute;
    left: 20px;
    bottom: 20px;
    color: white;
    font-size: ${({ theme: { typo } }) => {
      return typo.size.lg;
    }};
    font-weight: ${({ theme: { typo } }) => {
      return typo.weight.semiBold;
    }};
    z-index: 10;
  }
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
    z-index: 1;
  }
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  > span {
    &:nth-child(2) {
      margin-right: 10px;
    }
  }
`;

const Complete = styled(complete)`
  position: absolute;
  width: 25px;
  height: 25px;
  top: 20px;
  left: 20px;
  z-index: 10;
  fill: ${({ theme: { colors } }) => {
    return colors.primary;
  }};
`;

export { Container, ThumnailImgBox, ProfileWrapper, ButtonBox, Complete };
