import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

import Alarm from "@/assets/icons/alarm.svg?react";
import Symbol from "@/assets/icons/symbol.svg?react";
import { useEffect } from "react";

const NavBarWrapper = styled.div`
    width: 100%
    height: 10%;
    margin: 0px 20px;
    padding: 5px;
    display: flex;
    border-bottom: solid 1px ${({ theme: { colors } }) => {
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
  height: 150px;
  border-radius: 2em;
  position: absolute;
  background: white;
  box-shadow: gray 0px 3px 8px;

  & > li {
    height: calc(150px / 2);
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
export default function NavBar() {
  const nav = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userNickName, setUserNickName] = useState(null);

  const OnClickAlarm = () => {
    nav(`/alarm`);
  };
  const OnClickDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const OnClickMypage = () => {
    nav(`/profile`);
  };

  const loginCheck = () => {
    const condition = localStorage.getItem("userInfo");
    if (condition) {
      const refine = JSON.parse(condition);

      setUserNickName(`유저 ${refine.memberId}`);
    }
  };

  const handleSignOut = () => {
    const condition = localStorage.getItem("userInfo");
    if (condition) {
      //일단은 로컬스토리지에서 지우는걸로 간단설정 보안을 생각하면 보완필요
      localStorage.removeItem("userInfo");
      setUserNickName("");
    }
  };
  useEffect(() => {
    loginCheck();
  }, []);

  return (
    <NavBarWrapper>
      <SymbolIcon />
      <NavStyle to="/">홈</NavStyle>
      <NavStyle to="/search">탐색</NavStyle>
      <SearchBar placeholder="검색" />
      <AlarmBox>
        <AlarmIcon onClick={OnClickAlarm} />
        {userNickName ? (
          <Profile onClick={OnClickDropdown}>
            {userNickName}
            {dropdownOpen && (
              <Dropdown>
                <li onClick={OnClickMypage}>내 프로필</li>
                <li onClick={handleSignOut}>로그아웃</li>
              </Dropdown>
            )}
          </Profile>
        ) : (
          <LoginNotice
            onClick={() => {
              nav("/auth/signin");
            }}
          >
            로그인
          </LoginNotice>
        )}
      </AlarmBox>
    </NavBarWrapper>
  );
}
