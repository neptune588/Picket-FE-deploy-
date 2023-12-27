import { Link } from "react-router-dom";

import styled from "styled-components";
import Alarm from "@/assets/icons/alarm.svg?react";
import Symbol from "@/assets/icons/symbol.svg?react";

const NavBarWrapper = styled.div`
  height: 70px;
  margin: 0px 20px;
  padding: 5px;
  display: flex;
  border-bottom: solid 1px
    ${({ theme: { colors } }) => {
      return colors.gray["40"];
    }};
`;

const SymbolIcon = styled(Symbol)`
  margin: 10px;
`;

const NavStyle = styled(Link)`
  width: 60px;
  height: 40px;
  margin: 5px;
  display: grid;
  place-content: center;
  text-align: center;
  font-size: ${({ theme: { typo } }) => {
    return typo.size.md;
  }};
  outline: none;
  border-radius: 2em;
  cursor: pointer;
  &:hover {
    background: ${({ theme: { colors } }) => {
      return colors.gray["80"];
    }};
    color: white;
  }
  &.active {
    background: ${({ theme: { colors } }) => {
      return colors.gray["80"];
    }};
    color: white;
  }
`;

const SearchBar = styled.input`
  width: 60%;
  hegiht: 56px;
  justify-content: center;
  margin: 5px;
  padding: 1px;
  background: ${({ theme: { colors } }) => {
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
  border-radius: 1em;
`;

const AlarmBox = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  user-select: none;
`;
const AlarmIcon = styled(Alarm)`
  cursor: pointer;
`;

const Profile = styled.div`
  cursor: pointer;
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
  cursor: pointer;
  user-select: none;
`;

const SearchWrraper = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: ${({ theme: { colors } }) => {
    return colors.gray["80"];
  }};
`;

const SearchModal = styled.div`
  padding: 45px 40px 40px;
  background-color: ${({ theme: { colors } }) => {
    return colors.white;
  }};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

export {
  NavBarWrapper,
  SymbolIcon,
  NavStyle,
  SearchBar,
  AlarmBox,
  AlarmIcon,
  Profile,
  Dropdown,
  LoginNotice,
  SearchWrraper,
  SearchModal,
};
