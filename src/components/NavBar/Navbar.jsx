import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import styled from "styled-components";

import Alarm from "@/assets/icons/alarm.svg?react"
import Symbol from "@/assets/icons/symbol.svg?react"

const NavBarWrapper = styled.div`
    width: 100%
    height: 10%;
    margin: 0px 20px;
    padding: 5px;
    display: flex;
    border-bottom: solid 1px ${({ theme: { colors } }) => {
        return colors.gray["40"]
    }};
`;

const SymbolIcon = styled(Symbol)`
    margin: 10px;
`;

const NavStyle = styled(NavLink)`
    width: 60px;
    height: 40px;
    margin: 5px;
    display: grid;
    place-content: center;
    text-align: center;
    font-size: ${({ theme: { typo } }) => {
        return typo.size.md
    }};
    outline: none;
    border-radius: 2em;
    cursor: pointer; 
    &:hover {
        background: ${({ theme: { colors } }) => {
            return colors.gray["80"]
        }};
        color: white;
    }
    &.active {
        background: ${({ theme: { colors } }) => {
            return colors.gray["80"]
        }};
        color: white;
    }
`

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
    float: right;
`
const AlarmIcon = styled(Alarm)`
    margin: 5px 0px;
    cursor: pointer;
`;

const Profile = styled.div`
    width: 25px;
    height: 25px;
    display: flex;
    background: ${({ theme: { colors } }) => {
        return colors.primary
    }};
    border-radius: 50%;
    cursor: pointer;
`;

const Dropdown = styled.div`
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
`


export default function NavBar() {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const nav = useNavigate();

    const OnClickAlarm = ()=>{
        nav(`/alarm`)
    };
    const OnClickDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    };
    const OnClickMypage = ()=>{
        nav(`/profile`)
    };

    return (
        <NavBarWrapper>
            <SymbolIcon />
            <NavStyle to="/">홈</NavStyle>
            <NavStyle to="/search">탐색</NavStyle>
            <SearchBar placeholder="검색"/>
            <AlarmBox>
                <AlarmIcon onClick={OnClickAlarm} />
                <Profile onClick={OnClickDropdown}>
                {
                    dropdownOpen &&
                    <Dropdown>
                        <li onClick={OnClickMypage}>내 프로필</li>
                        <li>프로필 편집</li>
                        <li>로그아웃</li>
                    </Dropdown>
                }
                </Profile>
            </AlarmBox>
        </NavBarWrapper>
    );
};