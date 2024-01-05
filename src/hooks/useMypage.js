import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";

import {
  setTotalHomeParams,
  setLastBoardHomeParams,
  setPageHomeParams,
} from "@/store/homeParameterSlice";

import {
  setHomeTumnailCards,
  deleteHomeThumnailCard,
} from "@/store/bucketThumnailSlice";
import { setDetailBucketModal } from "@/store/modalsSlice";
import { setDetailButcket, setScrollLocation } from "@/store/bucketDetailSlice";

import { getData } from "@/services/api";
import { postData } from "@/services/api";
import { delData } from "@/services/api";
import { patchData } from "@/services/api";

export default function useMypage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const homeParams = useSelector((state) => {
    return state.homeParameter;
  });
  const moadals = useSelector((state) => {
    return state.modals;
  });
  const homeThumnail = useSelector((state) => {
    return state.bucketThumnail;
  });
  const bucketDetailObj = useSelector((state) => {
    return state.bucketDetail;
  });

  const { detailModal } = moadals;
  const { page, totalParams } = homeParams;
  const { homeThumnailCards } = homeThumnail;
  const { bucketDetailData, curScrollLocation } = bucketDetailObj;

  const [lastPage, setLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [homeCardData, setHomeCardData] = useState([]);
  const [homeCardDetailData, setHomeCardDetailData] = useState({});

  const homeMouted01 = useRef();
  const homeMouted02 = useRef();
  const homeMouted03 = useRef();
  const homeMouted04 = useRef();

  const pageAndBoardDataReset = () => {
    dispatch(setPageHomeParams([`page=`, 0]));
    dispatch(setLastBoardHomeParams(["", ""]));

    dispatch(deleteHomeThumnailCard());

    //setIsLoading(true);
    setLastPage(false);
  };
  const { ref: homeObserver } = useInView({
    threshold: 0,
    onChange: (view) => {
      //스크롤 내렸을때 라스트페이지가 아닐때
      if (view && !lastPage) {
        dispatch(
          setPageHomeParams([`${page.key}`, `${parseInt(page.value) + 1}`])
        );
        dispatch(
          setLastBoardHomeParams([
            "&lastBoardId=",
            `${homeCardData[homeCardData.length - 1].boardId}`,
          ])
        );
        dispatch(setTotalHomeParams());
      }
    },
  });

  const handleAddBucket = () => {
    const loginCheck = localStorage.getItem("userAccessToken");
    if (loginCheck) {
      navigate("/add");
    } else {
      confirm("로그인을 하고 나만의 버킷을 작성 해보세요!") &&
        navigate("/auth/signin");
    }
  };

  const homeCardReq = async (query = "") => {
    try {
      const token = `Bearer ${JSON.parse(
        localStorage.getItem("userAccessToken")
      )}`;
      setIsLoading(true);
      const { data } = await getData(`/board/myposts?${query}`, {
        headers: {
          Authorization: token,
        },
      });

      if (data.content?.length > 0) {
        if (data.last) {
          //마지막페이지 검증로직
          //라스트페이지면 스켈레톤x axios호출x
          setLastPage(true);
          dispatch(setHomeTumnailCards(data.content));
          setIsLoading(false);

          return;
        } else {
          setLastPage(false);
          dispatch(setHomeTumnailCards(data.content));

          setIsLoading(false);
        }
      } else {
        setLastPage(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Oh~ :", error);
    }
  };

  const homeCardDetailReq = async (borardNum) => {
    try {
      const { data } = await getData(`/board/${borardNum}`);
      data.commentList.forEach((obj) => (obj.putOptions = false));

      dispatch(
        setDetailButcket({
          boardId: data.boardId,
          title: data.title,
          categoryList: data.categoryList,
          cardContent: data.content,
          cardImg: data.filepath,
          created: data.deadline.split("-").join("."),
          commentList: data.commentList,
          heartCount: data.heartCount,
          scrapCount: data.scrapCount,
          nickname: data.nickname,
          avatar: data.profileImg,
        })
      );

      const latestBucket = JSON.parse(localStorage.getItem("latestBucket"));

      const latestCard = homeCardData.find(
        (card) => card.boardId === borardNum
      );
      if (latestBucket) {
        const refine = [...latestBucket];
        !refine.some((card) => card.boardId === borardNum) &&
          refine.push(latestCard);

        refine.length > 4 && refine.splice(0, 1);
        localStorage.setItem("latestBucket", JSON.stringify(refine));
      } else {
        localStorage.setItem("latestBucket", JSON.stringify([latestCard]));
      }
      !detailModal && dispatch(setDetailBucketModal());

      console.log(data);
    } catch (error) {
      if (error.response.status === 401) {
        console.error("error입니다.");
      }
      console.error("Oh~", error);
    }
  };

  const handleHomeDetailView = (curBoardId) => {
    return () => {
      dispatch(setScrollLocation(window.scrollY));
      homeCardDetailReq(curBoardId);
    };
  };

  const handleHomeDetailModalClose = () => {
    detailModal && dispatch(setDetailBucketModal());
    setTimeout(() => {
      window.scroll({ top: curScrollLocation, left: 0 });
    }, 50);
  };

  const detailLikeAndScrapReq = useMutation({
    mutationFn: async (curData) => {
      const token = `Bearer ${JSON.parse(
        localStorage.getItem("userAccessToken")
      )}`;
      return await postData(`/board/${curData}`, null, {
        headers: {
          Authorization: token,
        },
      });
    },
    onSuccess: async () => {
      homeCardDetailReq(bucketDetailData.boardId);

      try {
        const token = `Bearer ${JSON.parse(
          localStorage.getItem("userAccessToken")
        )}`;
        const { data } = await getData(
          `/board/myposts?size=${page.value * 8 + 8}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        dispatch(deleteHomeThumnailCard());
        dispatch(setHomeTumnailCards(data.content));
      } catch (error) {
        console.error("Oh~ :", error);
      }
    },
    onError: (error) => {
      if (error.response.status) {
        console.log("에러러");
      }
    },
  });

  const handleDetailHeartAndScrapClick = (type, curBoardId) => {
    return () => {
      switch (type) {
        case "heart": {
          detailLikeAndScrapReq.mutate(`${curBoardId}/like`);
          break;
        }
        case "scrap": {
          detailLikeAndScrapReq.mutate(`${curBoardId}/scrap`);
          break;
        }
      }
    };
  };

  const bucketDelete = useMutation({
    mutationFn: async (curBoardId) => {
      const token = `Bearer ${JSON.parse(
        localStorage.getItem("userAccessToken")
      )}`;
      return await delData(`/board/${curBoardId}`, {
        headers: {
          Authorization: token,
        },
      });
    },
    onSuccess: async () => {
      alert("버킷이 삭제 되었습니다!");
      try {
        const token = `Bearer ${JSON.parse(
          localStorage.getItem("userAccessToken")
        )}`;
        const { data } = await getData(
          `/board/myposts?size=${page.value * 8 + 8}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        dispatch(deleteHomeThumnailCard());
        dispatch(setHomeTumnailCards(data.content));
      } catch (error) {
        console.error("Oh~ :", error);
      }
    },
    onError: (error) => {
      if (error.response.status) {
        console.log("에러러");
      }
    },
  });

  const handleBucketDelete = (curBoardId) => {
    return () => {
      confirm("버킷을 삭제하시겠습니까?") && bucketDelete.mutate(curBoardId);
    };
  };

  const homeDetailBucketDelete = useMutation({
    mutationFn: async (curBoardId) => {
      const token = `Bearer ${JSON.parse(
        localStorage.getItem("userAccessToken")
      )}`;
      return await delData(`/board/${curBoardId}`, {
        headers: {
          Authorization: token,
        },
      });
    },
    onSuccess: async () => {
      alert("버킷이 삭제 되었습니다!");
      dispatch(setDetailBucketModal());
      try {
        const token = `Bearer ${JSON.parse(
          localStorage.getItem("userAccessToken")
        )}`;
        const { data } = await getData(
          `/board/myposts?size=${page.value * 8 + 8}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        dispatch(deleteHomeThumnailCard());
        dispatch(setHomeTumnailCards(data.content));
      } catch (error) {
        console.error("Oh~ :", error);
      }
    },
    onError: (error) => {
      if (error.response.status === 401) {
        alert("로그인이 만료 되었습니다!");
      }
    },
  });

  const handleHomeDetailBucketDelete = (curBoardId) => {
    return () => {
      confirm("버킷을 삭제하시겠습니까?") &&
        homeDetailBucketDelete.mutate(curBoardId);
    };
  };

  const bucketComplete = useMutation({
    mutationFn: async (curData) => {
      const token = `Bearer ${JSON.parse(
        localStorage.getItem("userAccessToken")
      )}`;
      return await patchData(`/board/${curData}/complete`, null, {
        headers: {
          Authorization: token,
        },
      });
    },
    onSuccess: async (res) => {
      console.log(res);
      try {
        const token = `Bearer ${JSON.parse(
          localStorage.getItem("userAccessToken")
        )}`;
        const { data } = await getData(
          `/board/myposts?size=${page.value * 8 + 8}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        dispatch(deleteHomeThumnailCard());
        dispatch(setHomeTumnailCards(data.content));

        alert("버킷을 달성하셨습니다!");
      } catch (error) {
        console.error("Oh~ :", error);
      }
    },
    onError: (error) => {
      if (error.response.status) {
        console.log("에러러");
      }
    },
  });

  const handleBucketComplete = (curBoardId) => {
    return () => {
      confirm("버킷을 달성하시겠습니까?") && bucketComplete.mutate(curBoardId);
    };
  };

  useEffect(() => {
    pageAndBoardDataReset();
    const isLogin = localStorage.getItem("userAccessToken");
    if (isLogin) {
      homeCardReq(`${page.key + 0}`);
      //dispatch(setTotalHomeParams());
      /*       console.log(
        "데이터가 초기화되었고 전체 파라미터가 바뀌었습니다. totalparams 의존성 배열을 실행합니다."
      ); */
    }
  }, []);

  useEffect(() => {
    if (!homeMouted01.current) {
      homeMouted01.current = true;
    } else {
      homeCardReq(totalParams.value);
      /*       console.log(
        "totalparams 의존성 배열입니다. 파라미터가 변경되어 데이터 호출 함수를 실행합니다.(데이터호출)"
      ); */
    }
  }, [totalParams.value]);

  useEffect(() => {
    if (!homeMouted02.current) {
      homeMouted02.current = true;
    } else {
      setHomeCardData(homeThumnailCards.data);
      /*       console.log(homeThumnailCards.data);
      console.log(
        "전역 상태에 데이터가 저장이 되었습니다. setCards를 실행합니다."
      ); */
      console.log(homeThumnailCards);
    }
  }, [homeThumnailCards.data]);

  useEffect(() => {
    if (!homeMouted03.current) {
      homeMouted03.current = true;
    } else {
      setHomeCardDetailData(bucketDetailData);
    }
  }, [bucketDetailData]);

  return {
    detailModal,
    homeCardData,
    homeCardDetailData,
    isLoading,
    homeObserver,
    handleHomeDetailView,
    handleHomeDetailModalClose,
    handleAddBucket,
    handleHomeDetailBucketDelete,
    handleDetailHeartAndScrapClick,
    handleBucketDelete,
    handleBucketComplete,
  };
}
