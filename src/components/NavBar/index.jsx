import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setBoolean } from "@/store/searchModalSlice";

import {
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
} from "@/components/NavBar/style";

export default function NavBar() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const currentModalState = useSelector((state) => {
    return state.searchModal.currentModalState;
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userNickName, setUserNickName] = useState(null);
  //const [searchModalOpen, setSearchModalOpen] = useState(false);

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

      setUserNickName(`${refine.nickname}`);
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
    <>
      <NavBarWrapper>
        <SymbolIcon />
        <NavStyle to="/">홈</NavStyle>
        <NavStyle to="/search">탐색</NavStyle>
        <SearchBar
          placeholder="검색"
          onClick={() => {
            dispatch(setBoolean());
          }}
        />
        <AlarmBox>
          <AlarmIcon onClick={OnClickAlarm} />
          {userNickName ? (
            <Profile onClick={OnClickDropdown}>
              {userNickName}
              {dropdownOpen && (
                <Dropdown>
                  <li onClick={OnClickMypage}>내 프로필</li>
                  <li>프로필 편집</li>
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
      {currentModalState && (
        <SearchWrraper>
          <SearchModal></SearchModal>
        </SearchWrraper>
      )}
    </>
  );
}
