import { Link } from "react-router-dom";

import styled from "styled-components";
import Alarm from "@/assets/icons/alarm.svg?react";
import Symbol from "@/assets/icons/symbol.svg?react";
import Search from "@/assets/icons/search.svg?react";
import Cross from "@/assets/icons/cross.svg?react";

const NavBarWrapper = styled.header`
  display: flex;
  align-items: center;
  height: 70px;
  padding: 0px 20px;
  border-bottom: solid 1px
    ${({ theme: { colors } }) => {
      return colors.gray["40"];
    }};
`;

const SymbolIcon = styled(Symbol)`
  margin-right: 15px;
`;

const NavLinkBox = styled.div`
  a {
    margin-right: 5px;
  }
`;
const NavStyle = styled(Link)`
  display: inline-block;
  width: ${({ $width }) => {
    return $width;
  }};
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: ${({ theme: { typo } }) => {
    return typo.size.md;
  }};
  outline: none;
  border-radius: 30px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme: { colors } }) => {
      return colors.gray["80"];
    }};
    color: white;
  }
  &:active {
    background-color: ${({ theme: { colors } }) => {
      return colors.gray["80"];
    }};
    color: white;
  }
`;

const SearchBarBox = styled.div`
  width: 1060px;
  position: relative;
  margin: 0 auto;
`;

const SearchIcon = styled(Search)`
  position: absolute;
  top: 10px;
  left: 20px;
  width: 20px;
  height: 20px;
`;

const SearchBar = styled.input`
  display: block;
  width: 100%;
  height: 40px;
  padding: 10px 10px 10px 30px;
  background-color: ${({ theme: { colors } }) => {
    return colors.gray["20"];
  }};
  color: ${({ theme: { colors } }) => {
    return colors.black;
  }};
  text-indent: 1em;
  font-size: ${({ theme: { typo } }) => {
    return typo.size.md;
  }};
  outline: none;
  border: none;
  border-radius: 30px;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  width: 20px;
  height: 20px;
  background-color: ${({ theme: { colors } }) => {
    return colors.gray["80"];
  }};
  border-radius: 50%;
  cursor: pointer;
  user-select: none;
`;

const CloseCrossIcon = styled(Cross)`
  position: absolute;
  display: inline-block;
  width: 10px;
  height: 10px;
  top: 50%;
  left: 51%;
  transform: translate(-50%, -50%);
`;
const AlarmBox = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100px;
  margin-left: auto;
  align-items: center;
  user-select: none;
`;
const AlarmIcon = styled(Alarm)`
  width: ${({ $width }) => {
    return $width;
  }};
  height: ${({ $height }) => {
    return $height;
  }};
  cursor: pointer;
`;

const Profile = styled.div`
  cursor: pointer;
  > p {
    width: 70px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 5px;
  }
`;

const Dropdown = styled.ul`
  top: 65px;
  right: calc((100% - 1500px) / 2);
  width: 260px;
  height: 210px;
  border-radius: 2em;
  position: absolute;
  background: white;
  box-shadow: gray 0px 3px 8px;

  & > li {
    height: calc(220px / 3);
    text-align: center;
    display: flex;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

const LoginNotice = styled.p`
  font-weight: ${({ theme: { typo } }) => {
    return typo.weight.medium;
  }};
  color: ${({ theme: { colors } }) => {
    return colors.gray["80"];
  }};
  margin-left: 5px;
  cursor: pointer;
  user-select: none;
`;

const SearchModalWrraper = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme: { colors } }) => {
    return colors.gray["40"];
  }};
  z-index: 9999;
`;

const SearchModal = styled.div`
  width: 1060px;
  margin: 0 auto;
  padding: 0 40px 40px;
  background-color: ${({ theme: { colors } }) => {
    return colors.white;
  }};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const SubTitle = styled.h2`
  font-size: ${({ theme: { typo } }) => {
    return typo.size.lg;
  }};
  font-weight: ${({ theme: { typo } }) => {
    return typo.weight.bold;
  }};
  padding: 45px 0 20px;
`;

const NavTagBox = styled.div`
  display: flex;
  > div {
    margin-right: 15px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

const NavTag = styled.div`
  padding: 20px 25px;
  color: ${({ theme: { colors } }) => {
    return colors.gray["60"];
  }};
  background-color: ${({ theme: { colors } }) => {
    return colors.gray["0"];
  }};
  border-radius: 30px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme: { colors } }) => {
      return colors.gray["80"];
    }};
    color: white;
  }
`;

const ThumnailCardBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
export {
  NavBarWrapper,
  SymbolIcon,
  NavLinkBox,
  NavStyle,
  SearchBarBox,
  SearchIcon,
  SearchBar,
  CloseButton,
  CloseCrossIcon,
  AlarmBox,
  AlarmIcon,
  Profile,
  Dropdown,
  LoginNotice,
  SubTitle,
  NavTagBox,
  NavTag,
  ThumnailCardBox,
  SearchModalWrraper,
  SearchModal,
};
