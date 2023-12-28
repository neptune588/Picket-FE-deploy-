import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setBoolean } from "@/store/searchModalSlice";

import ThumnailCard from "@/components/ThumnailCard";

import {
  NavBarWrapper,
  SymbolIcon,
  NavStyle,
  NavLinkBox,
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
} from "@/components/NavBar/style";

export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentModalState = useSelector((state) => {
    return state.searchModal.currentModalState;
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userNickName, setUserNickName] = useState(null);

  const OnClickDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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
        <NavLinkBox>
          <NavStyle to="/" $width={"50px"}>
            홈
          </NavStyle>
          <NavStyle to="/search" $width={"60px"}>
            탐색
          </NavStyle>
        </NavLinkBox>
        <SearchBarBox>
          <SearchBar
            placeholder="검색"
            onClick={() => {
              dispatch(setBoolean());
            }}
          />{" "}
          <SearchIcon />
          {currentModalState && (
            <CloseButton>
              <CloseCrossIcon />
            </CloseButton>
          )}
        </SearchBarBox>
        <AlarmBox>
          <AlarmIcon
            onClick={() => {
              navigate("/alarm");
            }}
            $width={"24px"}
            $height={"24px"}
          />
          {userNickName ? (
            <Profile onClick={OnClickDropdown}>
              {userNickName}
              {dropdownOpen && (
                <Dropdown>
                  <li
                    onClick={() => {
                      navigate("/profile");
                    }}
                  >
                    내 프로필
                  </li>
                  <li>프로필 편집</li>
                  <li onClick={handleSignOut}>로그아웃</li>
                </Dropdown>
              )}
            </Profile>
          ) : (
            <LoginNotice
              onClick={() => {
                navigate("/auth/signin");
              }}
            >
              로그인
            </LoginNotice>
          )}
        </AlarmBox>
      </NavBarWrapper>
      {currentModalState && (
        <SearchModalWrraper>
          <SearchModal>
            <SubTitle>추천 버킷 리스트</SubTitle>
            <NavTagBox>
              <NavTag>유튜브 시작하기</NavTag>
              <NavTag>타투하기</NavTag>
              <NavTag>미라클 모닝</NavTag>
              <NavTag>공모전 나가기</NavTag>
              <NavTag>커플링 맞추기</NavTag>
            </NavTagBox>
            <SubTitle>최근 본 버킷 리스트</SubTitle>
            <ThumnailCardBox>
              <ThumnailCard width={"230px"} height={"230px"}></ThumnailCard>
              <ThumnailCard width={"230px"} height={"230px"}></ThumnailCard>
              <ThumnailCard width={"230px"} height={"230px"}></ThumnailCard>
              <ThumnailCard width={"230px"} height={"230px"}></ThumnailCard>
            </ThumnailCardBox>
          </SearchModal>
        </SearchModalWrraper>
      )}
    </>
  );
}
