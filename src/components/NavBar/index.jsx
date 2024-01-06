import useNavBarOptions from "@/hooks/useNavBarOptions";

import ThumnailCard from "@/components/ThumnailCard";
import BucketCard from "@/components/BucketCard";

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
  NavTagDelButton,
  ThumnailCardBox,
  SearchModalWrraper,
  SearchModalCloseArea,
  SearchModal,
} from "@/components/NavBar/style";

export default function NavBar() {
  const {
    keyword,
    keywordListData,
    searchTextBar,
    searchValue,
    dropdownOpen,
    userNickName,
    searchModal,
    detailModal,
    latestDetailCard,
    setSearchValue,
    handleSearchModalControl,
    handleChange,
    handleSearch,
    handleSignOut,
    handleNavigate,
    handleKeywordClick,
    handleLatestKeywordDelete,
    handleDetailCardReq,
    handleDetailModalState,
    handleHeartAndScrapClick,
    handleDetailHeartAndScrapClick,
    OnClickDropdown,
  } = useNavBarOptions();
  const nicknameViewLength = 8;
  const titleViewLength = 12;
  return (
    <>
      {detailModal && (
        <BucketCard
          boardId={latestDetailCard.boardId}
          nickname={latestDetailCard.nickname}
          avatar={latestDetailCard.avatar}
          title={latestDetailCard.title}
          cardImg={
            latestDetailCard.cardImg
              ? latestDetailCard.cardImg
              : "/images/default_profile.png"
          }
          cardContent={latestDetailCard.cardContent}
          commentList={latestDetailCard.commentList}
          cardCreated={latestDetailCard.created}
          heartCount={latestDetailCard.heartCount}
          scrapCount={latestDetailCard.scrapCount}
          handleHeartClick={handleDetailHeartAndScrapClick(
            "heart",
            latestDetailCard.boardId
          )}
          handleScrapClick={handleDetailHeartAndScrapClick(
            "scrap",
            latestDetailCard.boardId
          )}
          modalCloseHandle={handleDetailModalState}
        />
      )}
      <NavBarWrapper>
        <SymbolIcon />
        <NavLinkBox>
          <NavStyle to="/" $width={"50px"}>
            홈
          </NavStyle>
          <NavStyle
            to={`/search/${keyword.value ? keyword.value : "default"}`}
            $width={"60px"}
          >
            탐색
          </NavStyle>
        </NavLinkBox>
        <SearchBarBox>
          <SearchBar
            ref={searchTextBar}
            value={searchValue}
            onChange={handleChange}
            placeholder="검색"
            onClick={handleSearchModalControl}
            onKeyUp={handleSearch}
            maxLength={15}
          />
          <SearchIcon />
          {searchModal && (
            <CloseButton
              onClick={() => {
                setSearchValue("");
              }}
            >
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
      {searchModal && (
        <SearchModalWrraper>
          <SearchModal>
            <SubTitle>최근 검색어</SubTitle>
            <NavTagBox>
              {keywordListData.length > 0
                ? keywordListData.map((data, idx) => {
                    return (
                      <>
                        <NavTag
                          key={"keywordTag" + data.id}
                          onClick={handleKeywordClick(data.value)}
                        >
                          {data.value}
                        </NavTag>
                        <NavTagDelButton
                          key={"keywordDel" + data.id}
                          onClick={handleLatestKeywordDelete(idx)}
                        />
                      </>
                    );
                  })
                : "최근 검색하신 단어가 없습니다."}
            </NavTagBox>
            <SubTitle>최근 본 버킷 리스트</SubTitle>
            <ThumnailCardBox>
              {JSON.parse(localStorage.getItem("latestBucket"))
                ? JSON.parse(localStorage.getItem("latestBucket")).map(
                    (card) => (
                      <ThumnailCard
                        key={"latestBoard" + card.boardId}
                        width={"230px"}
                        height={"230px"}
                        title={
                          card.title.length > titleViewLength
                            ? card.title.substring(0, titleViewLength) + "..."
                            : card.title
                        }
                        thumnailSrc={card.filepath}
                        avatarSrc={
                          /* card.filename */ "/images/default_profile.png"
                        }
                        nickname={
                          card.nickname?.length > nicknameViewLength
                            ? card.nickname.substring(0, nicknameViewLength) +
                              "..."
                            : card.nickname
                        }
                        likeCount={card.likeCount}
                        scrapCount={card.scrapCount}
                        isCompleted={card.isCompleted}
                        handledetailView={handleDetailCardReq(card.boardId)}
                        handleHeartClick={handleHeartAndScrapClick(
                          "heart",
                          card.boardId
                        )}
                        handleScrapClick={handleHeartAndScrapClick(
                          "scrap",
                          card.boardId
                        )}
                      />
                    )
                  )
                : "최근 본 버킷리스트가 없습니다."}
            </ThumnailCardBox>
          </SearchModal>
          <SearchModalCloseArea onClick={handleSearchModalControl} />
        </SearchModalWrraper>
      )}
    </>
  );
}
