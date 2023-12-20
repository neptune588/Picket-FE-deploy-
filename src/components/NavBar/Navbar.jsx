import { useNavigate, NavLink } from "react-router-dom";
import styled from "styled-components";

import Symbol from "@/assets/icons/symbol.svg?react";
import Alarm from "@/assets/icons/alarm.svg?react";
import Circle from "@/assets/icons/ellipse.svg?react";

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
    font-size: 1rem;
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
        return colors.gray["20"]
    }};
    color: ${({ theme: { colors } }) => {
        return colors.black;
    }};
    text-indent: 1em;
    font-size: 1rem;
    outline: none;
    border: none;
    border-radius: 1em;
`;

const AlarmBox = styled.div`
    margin-left: auto;
    float: right;
`
const AlarmIcon = styled(Alarm)`
    margin: 5px 0px;
    cursor: pointer;
`;

const MypageBtn = styled(Circle)`
    width: 32px;
    hegiht: 32px;
    margin: 10px 0px;
    justify-content: center;
    cursor: pointer;
`;

export default function NavBar() {
    const nav = useNavigate();
    const OnClickAlarm = ()=>{
        nav(`/alarm`)
    };
    const OnClickMypage = ()=>{
        nav(`/mypage`)
    };

    return (
        <NavBarWrapper>
            <SymbolIcon />
            <NavStyle to="/">홈</NavStyle>
            <NavStyle to="/search">탐색</NavStyle>
            <SearchBar placeholder="검색"/>
            <AlarmBox>
                <AlarmIcon onClick={OnClickAlarm} />
                <MypageBtn onClick={OnClickMypage} />
            </AlarmBox>
        </NavBarWrapper>
    );
};