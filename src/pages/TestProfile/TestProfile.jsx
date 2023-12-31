import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";

import { MdModeEdit } from "react-icons/md";
import ProfileEdit from "../../components/ProfileEditModal/ProfileEditModal";
import HomeThumnailCard from "../../components/HomeThumnailCard";
import Bucket from "../../components/Bucket/Bucket";
import { getData } from "@/services/api";

const ProfileImage = styled.div`
  margin: 50px auto 10px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: ${({ theme: { colors } }) => {
    return colors.primary;
  }};
`;

const ProfileName = styled.div`
    margin: 20px;
    text-align: center;
    font-weight: bold;
    font-size: ${({ theme: { typo } }) => {
      return typo.size.xl;
    }};
    cursor: pointer;

    & > svg {
        margin-bottom: -2px;
        color: ${({ theme: { colors } }) => {
          return colors.primary;
        }};
        font-size: ${({ theme: { typo } }) => {
          return typo.size.xl;
        }}
`;

const BucketContainer = styled.div`
  width: 600px;
  height: 60px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  & > div {
    width: 250px;
    height: 100%;
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    background: ${({ theme: { colors } }) => {
      return colors.gray["20"];
    }};
    color: ${({ theme: { colors } }) => {
      return colors.gray["80"];
    }};
    font-size: ${({ theme: { typo } }) => {
      return typo.size.md;
    }};

    & > span {
        color: black;
        font-weight: bold;
      }
    }
  }
`;

const BucketList = styled.div`
  height: 60px;
  margin: auto 20px;
  display: flex;
  align-items: center;
  border-bottom: solid 1px
    ${({ theme: { colors } }) => {
      return colors.gray["40"];
    }};
`;

const NavStyle = styled(NavLink)`
  width: 120px;
  text-align: center;

  &:hover {
    color: black;
    font-weight: bold;
  }
  &.active {
    color: black;
    font-weight: bold;
  }
`;

const BucketListContainer = styled.div`
  min-height: 300px;
  display: flex;
  margin: 0 20px;
  align-items: center;
  justify-content: center;
  color: ${({ theme: { colors } }) => {
    return colors.gray["40"];
  }};
`;

const BucketWrapper = styled.div`
  margin: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  overflow-y: auto;
`;
const ModalBg = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  z-index: 10000;
  background: rgba(0, 0, 0, 0.5);
`;

export default function TestMyProfile() {
  const [openModal, setOpenModal] = useState(false);
  const [bucketList, setBucketList] = useState([]);
  const [scrapList, setScrapList] = useState([]);
  const [nav, setNav] = useState(1);
  const [nickname, setNickname] = useState("");

  const getNick = () => {
    const condition = localStorage.getItem("userInfo");
    if (condition) {
      const refine = JSON.parse(condition);
      setNickname(`${refine.nickname}`);
      console.log(refine);
    }
  };

  const init = async () => {
    let random = JSON.parse(localStorage.getItem("userInfo"));
    const { grantType, accessToken } = random;
    const token = `Bearer ${accessToken}`;
    console.log(token);
    const response = await getData(
      "board/myposts",
      {
        headers: {
          Authorization: token,
        },
      }
      // {
      //     withCredentials: true
      // }
    );
    console.log(response);
    if (Array.isArray(response.data.content)) {
      setBucketList(response.data.content);
    } else {
      console.error("Error: response.data is not an array");
    }
  };

  useEffect(() => {
    getNick();
  }, []);

  useEffect(() => {
    setBucketList([]);
    setScrapList([]);
  }, [nav]);

  return (
    <>
      <ProfileImage />
      <ProfileName onClick={() => setOpenModal(true)}>
        {nickname} <MdModeEdit />
      </ProfileName>
      {openModal && <ProfileEdit setOpenModal={setOpenModal} />}
      <BucketContainer>
        <div>
          달성 완료한 버킷
          <span>0</span>
        </div>
        <div>
          진행 중인 버킷
          <span>0</span>
        </div>
      </BucketContainer>
      <BucketList>
        <NavStyle
          onClick={() => {
            setNav(1);
          }}
        >
          마이 버킷
        </NavStyle>
        <NavStyle
          onClick={() => {
            setNav(2);
          }}
        >
          스크랩한 버킷
        </NavStyle>
      </BucketList>
      <BucketWrapper>
        {nav === 1 && (
          <BucketListTab
            bucketList={bucketList}
            setBucketList={setBucketList}
          />
        )}
        {nav === 2 && (
          <ScrapListTab bucketList={scrapList} setBucketList={setScrapList} />
        )}
      </BucketWrapper>
    </>
  );
}

function BucketListTab({ bucketList, setBucketList }) {
  const [next, setNext] = useState(true);
  const [page, setPage] = useState(0);
  const [modal, setModal] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState(-1);

  const loadSize = 8;

  const search = async () => {
    let random = JSON.parse(localStorage.getItem("userInfo"));
    const { grantType, accessToken } = random;
    const token = `Bearer ${accessToken}`;

    const params = {
      page: page,
      size: loadSize,
      sort: [],
    };

    if (bucketList.length > 0) {
      params["lastBoardId"] = bucketList.at(-1).boardId;
    }

    const response = await getData("board/myposts", {
      headers: {
        Authorization: token,
      },
      params,
    });
    if (Array.isArray(response.data.content)) {
      setNext(!response.data.last);
      setBucketList((prev) => [...prev, ...response.data.content]);
    } else {
      console.error("Error: response.data is not an array");
    }
  };

  const loadMoreHandler = () => {
    if (bucketList.length === 0) return;
    else {
      setPage((prev) => prev + 1);
    }
  };

  const items = bucketList.map((data, idx) => {
    return (
      <HomeThumnailCard
        key={idx}
        props={data}
        onModal={() => {
          setSelectedBoardId(data.boardId);
          setModal((prev) => !prev);
        }}
      />
    );
  });

  useEffect(() => {
    search();
  }, [page]);

  return (
    <>
      <InfiniteScroll
        pageStart={page}
        next={loadMoreHandler}
        dataLength={items.length}
        hasMore={next}
        loader={<div>loading</div>}
      >
        <BucketWrapper>
          {items.length > 0 ? (
            items
          ) : (
            <BucketListContainer></BucketListContainer>
          )}
        </BucketWrapper>
      </InfiniteScroll>
      {modal && (
        <ModalBg>
          <Bucket
            boardId={selectedBoardId}
            onModal={() => {
              setModal((prev) => !prev);
            }}
          />
        </ModalBg>
      )}
    </>
  );
}

function ScrapListTab({ bucketList, setBucketList }) {
  const [next, setNext] = useState(true);
  const [page, setPage] = useState(0);
  const [modal, setModal] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState(-1);

  const loadSize = 8;

  const search = async () => {
    let random = JSON.parse(localStorage.getItem("userInfo"));
    const { grantType, accessToken } = random;
    const token = `Bearer ${accessToken}`;

    const params = {
      page: page,
      size: loadSize,
      sort: [],
    };

    if (bucketList.length > 0) {
      params["lastBoardId"] = bucketList.at(-1).boardId;
    }

    const response = await getData("board/myposts/scraps", {
      headers: {
        Authorization: token,
      },
      params,
    });
    if (Array.isArray(response.data.content)) {
      setNext(!response.data.last);
      setBucketList((prev) => [...prev, ...response.data.content]);
    } else {
      console.error("Error: response.data is not an array");
    }
  };

  const loadMoreHandler = () => {
    if (bucketList.length === 0) return;
    else {
      setPage((prev) => prev + 1);
    }
  };

  const items = bucketList.map((data, idx) => {
    return (
      <HomeThumnailCard
        key={idx}
        props={data}
        onModal={() => {
          setSelectedBoardId(data.boardId);
          setModal((prev) => !prev);
        }}
      />
    );
  });

  useEffect(() => {
    search();
  }, [page]);

  return (
    <>
      <InfiniteScroll
        pageStart={page}
        next={loadMoreHandler}
        dataLength={items.length}
        hasMore={next}
        loader={<div>loading</div>}
      >
        <BucketWrapper>
          {items.length > 0 ? (
            items
          ) : (
            <BucketListContainer></BucketListContainer>
          )}
        </BucketWrapper>
      </InfiniteScroll>
      {modal && (
        <ModalBg>
          <Bucket
            boardId={selectedBoardId}
            onModal={() => {
              setModal((prev) => !prev);
            }}
          />
        </ModalBg>
      )}
    </>
  );
}
