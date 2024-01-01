import useNavBarOptions from "@/hooks/useNavBarOptions";

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
  const {
    searchValue,
    dropdownOpen,
    userNickName,
    currentModalState,
    handleSearchModalControl,
    handleChange,
    handleSearch,
    handleSignOut,
    handleNavigate,
    OnClickDropdown,
  } = useNavBarOptions();
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
            value={searchValue}
            onChange={handleChange}
            placeholder="검색"
            onClick={handleSearchModalControl}
            onKeyUp={handleSearch}
          />
          <SearchIcon />
          {currentModalState && (
            <CloseButton>
              <CloseCrossIcon />
            </CloseButton>
          )}
        </SearchBarBox>
        <AlarmBox>
          <AlarmIcon
            onClick={handleNavigate("/alarm")}
            $width={"24px"}
            $height={"24px"}
          />
          {userNickName ? (
            <Profile onClick={OnClickDropdown}>
              <p>{userNickName}</p>
              {dropdownOpen && (
                <Dropdown>
                  <li onClick={handleNavigate("/profile")}>내 프로필</li>
                  <li onClick={handleSignOut}>로그아웃</li>
                </Dropdown>
              )}
            </Profile>
          ) : (
            <LoginNotice onClick={handleNavigate("/auth/signin")}>
              로그인
            </LoginNotice>
          )}
        </AlarmBox>
      </NavBarWrapper>
      {currentModalState && (
        <SearchModalWrraper>
          <SearchModal>
            <SubTitle>최근 검색어</SubTitle>
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
