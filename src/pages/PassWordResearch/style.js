import styled from "styled-components";

import { Link } from "react-router-dom";

import Cross from "@/assets/icons/cross.svg?react";

const CenterdContainer = styled.div`
  display: flex;
  width: 400px;
  height: calc(100vh - 140px);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  input {
    user-select: none;
  }
`;

const InputBox = styled.div`
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0px;
  }

  > p {
    color: ${({ theme: { colors } }) => {
      return colors.gray["60"];
    }};
    font-weight: ${({ theme: { typo } }) => {
      return typo.weight.medium;
    }};
    margin-top: 10px;
    text-align: right;
`;

const Title = styled.h2`
  font-size: ${({ theme: { typo } }) => {
    return typo.size.xl;
  }};
  font-weight: ${({ theme: { typo } }) => {
    return typo.weight.bold;
  }};
  margin-bottom: 40px;
  user-select: none;
`;

const NoticeMent = styled.p`
  color: ${({ theme: { colors } }) => {
    return colors.gray["60"];
  }};
  text-align: center;
  line-height: 25px;
  margin-bottom: 30px;
`;

const LoginPageMoveButton = styled(Link)`
  display: block;
  margin-top: 25px;
  text-align: center;
  color: ${({ theme: { colors } }) => {
    return colors.primary;
  }};
  font-weight: ${({ theme: { typo } }) => {
    return typo.weight.bold;
  }};
  cursor: pointer;
  user-select: none;
`;

const SuccessModalBox = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99999;
`;

const SuccessModal = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 480px;
  padding: 50px 40px 40px;
  background-color: ${({ theme: { colors } }) => {
    return colors.white;
  }};
  border-radius: 40px;
  > h2 {
    font-size: ${({ theme: { typo } }) => {
      return typo.size.xl;
    }};
    font-weight: ${({ theme: { typo } }) => {
      return typo.weight.bold;
    }};
    text-align: center;
    margin-bottom: 75px;
    user-select: none;
  }
`;

const ConfirmButton = styled.div`
  width: 400px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  color: ${({ theme: { colors } }) => {
    return colors.white;
  }};
  font-size: ${({ theme: { typo } }) => {
    return typo.size.md;
  }};
  font-weight: ${({ theme: { typo } }) => {
    return typo.weight.bold;
  }};
  background-color: ${({ theme: { colors } }) => {
    return colors.primary;
  }};
  border: none;
  border-radius: 15px;
  user-select: none;
  cursor: pointer;
`;

const CloseButton = styled(Cross)`
  position: absolute;
  display: block;
  top: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

export {
  CenterdContainer,
  InputBox,
  Title,
  LoginPageMoveButton,
  NoticeMent,
  SuccessModalBox,
  SuccessModal,
  ConfirmButton,
  CloseButton,
};
