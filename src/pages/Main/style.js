import styled from "styled-components";

import picketIcon from "@/assets/icons/picketIcon.svg?react";
import cross from "@/assets/icons/cross.svg?react";

const DefaultContainer = styled.div`
  position: relative;
  height: calc(100vh - 70px);
`;

const DefaultImgWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  user-select: none;
`;

const DefaultImg = styled(picketIcon)`
  width: 300px;
  height: 300px;
  margin-bottom: 30px;
  transform: translateX(10px);
`;

const DefaultNotice = styled.p`
  text-align: center;
  color: ${({ theme: { colors } }) => {
    return colors.gray["40"];
  }};
  font-weight: ${({ theme: { typo } }) => {
    return typo.weight.bold;
  }};
`;

const AddBucketButton = styled.div`
  position: fixed;
  bottom: 100px;
  right: 100px;
  width: 85px;
  height: 85px;
  overflow: hidden;
  user-select: none;
  background-color: ${({ theme: { colors } }) => {
    return colors.gray["80"];
  }};
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s;
  &:hover {
    background-color: ${({ theme: { colors } }) => {
      return colors.gray["60"];
    }};
  }
`;

const PlusIcon = styled(cross)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  width: 20px;
  height: 20px;
  stroke: ${({ theme: { colors } }) => {
    return colors.white;
  }};
`;

const CardContainer = styled.ul`
  display: flex;
  > li {
    margin-right: 40px;
    margin-top: 60px;
    &:nth-child(4n) {
      margin-right: 0px;
    }
  }
  flex-wrap: wrap;
  padding-bottom: 40px;
`;

export {
  DefaultContainer,
  DefaultImgWrapper,
  DefaultImg,
  DefaultNotice,
  AddBucketButton,
  PlusIcon,
  CardContainer,
};
