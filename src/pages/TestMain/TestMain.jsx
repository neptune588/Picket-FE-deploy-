import { useState, useEffect } from "react";

import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";

import Bucket from "../../components/Bucket/Bucket";
//import Categories from "../../components/Categories/Categories";
import AddBucketIcon from "../../components/AddBucket/AddBucketIcon";
import HomeThumnailCard from "../../components/HomeThumnailCard";
import { getData } from "@/services/api";

const Empty = styled.div`
  margin: 40px;
`;

/* const CateBox = styled.div`
  display: flex;
  justify-content: center;
`; */

const BucketWrapper = styled.div`
  margin: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  overflow-y: auto;
  text-align: center;
`;

const MainBucket = styled.img`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddBucketBox = styled.div`
  position: fixed;
  bottom: 40px;
  right: 100px;
  width: 160px;
  height: 160px;
  display: flex;
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
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
`;

export default function TestMain() {
  const [bucketList, setBucketList] = useState([]);
  const [next, setNext] = useState(true);
  const [page, setPage] = useState(0);
  const [modal, setModal] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState(-1);

  /*   const loadSize = 8;

  const init = async () => {
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
    });

    console.log(response);
    if (response.data) {
      setBucketList(response.data);
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
    init();
  }, [page]); */

  return <></>;
}
