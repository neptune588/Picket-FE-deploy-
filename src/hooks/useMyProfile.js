import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useInView } from "react-intersection-observer";

import { setProfileEditModal } from "@/store/modalsSlice";

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

import useSelectorList from "@/hooks/useSelectorList";

export default function useMyProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    detailModal,
    profileEditModal,
    homePage,
    totalHomeParams,
    homeThumnailCards,
    bucketDetailData,
    curScrollLocation,
  } = useSelectorList();

  const [lastPage, setLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [completeCount, setCompleteCount] = useState(0);
  const [scrapCardData, setScrapCardData] = useState([]);
  const [activeNumber, setActiveNumber] = useState(0);
  const [profileHomeCardData, setProfileHomeCardData] = useState([]);
  const [profileHomeCardDetailData, setprofileHomeCardDetailData] = useState(
    {}
  );

  const profileMouted01 = useRef();
  const profileMouted02 = useRef();
  const profileMouted03 = useRef();

  const pageAndBoardDataReset = () => {
    dispatch(setPageHomeParams([`page=`, 0]));
    dispatch(setLastBoardHomeParams(["", ""]));

    dispatch(deleteHomeThumnailCard());

    //setIsLoading(true);
    setLastPage(false);
  };

  const { ref: profileObserver } = useInView({
    threshold: 0,
    onChange: (view) => {
      //스크롤 내렸을때 라스트페이지가 아닐때
      if (view && !lastPage) {
        dispatch(
          setPageHomeParams([
            `${homePage.key}`,
            `${parseInt(homePage.value) + 1}`,
          ])
        );
        dispatch(
          setLastBoardHomeParams([
            "&lastBoardId=",
            `${profileHomeCardData[profileHomeCardData.length - 1].boardId}`,
          ])
        );
        dispatch(setTotalHomeParams());
      }
    },
  });

  const profileCompleteCountReq = async () => {
    try {
      const token = `Bearer ${JSON.parse(
        localStorage.getItem("userAccessToken")
      )}`;

      const { data } = await getData("/board/myposts/stateTotal", {
        headers: {
          Authorization: token,
        },
      });

      setCompleteCount(data.finishTotal);
    } catch (error) {
      console.error(error);
    }
  };

  const profileScrapDataReq = async () => {
    try {
      const token = `Bearer ${JSON.parse(
        localStorage.getItem("userAccessToken")
      )}`;

      const { data } = await getData("/board/myposts/scraps", {
        headers: {
          Authorization: token,
        },
      });

      setScrapCardData(data.content);
    } catch (error) {
      console.error(error);
    }
  };

  const profileHomeCardReq = async (query = "") => {
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

      const latestCard = profileHomeCardData.find(
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

      //console.log(data);
    } catch (error) {
      if (error.response.status === 401) {
        console.error("error입니다.");
      }
      console.error("Oh~", error);
    }
  };

  const handleProfileEditModalState = () => {
    dispatch(setProfileEditModal());
  };

  const handleMenuClick = (curMenuNum) => {
    return () => {
      setActiveNumber(curMenuNum);
      if (curMenuNum === 0) {
        pageAndBoardDataReset();
        profileHomeCardReq(homePage.key + 0);
      } /* else {
        profileHomeCardReq();
      } */
    };
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
          `/board/myposts?size=${homePage.value * 8 + 8}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        profileCompleteCountReq();
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
          `/board/myposts?size=${homePage.value * 8 + 8}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        profileCompleteCountReq();
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
          `/board/myposts?size=${homePage.value * 8 + 8}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        profileCompleteCountReq();
        dispatch(deleteHomeThumnailCard());
        dispatch(setHomeTumnailCards(data.content));

        alert("버킷을 달성하셨습니다!");
      } catch (error) {
        console.error("Oh~ :", error);
      }
    },
    onError: (error) => {
      if (error.response.status === 409) {
        alert("이미 달성한 버킷입니다!");
      } else {
        console.log("에러러");
      }
    },
  });

  const handleBucketComplete = (curBoardId) => {
    return () => {
      confirm("버킷을 달성하시겠습니까?") && bucketComplete.mutate(curBoardId);
    };
  };

  const homeDetailBucketComplete = useMutation({
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
    onSuccess: async () => {
      homeCardDetailReq(bucketDetailData.boardId);
      try {
        const token = `Bearer ${JSON.parse(
          localStorage.getItem("userAccessToken")
        )}`;
        const { data } = await getData(
          `/board/myposts?size=${homePage.value * 8 + 8}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        profileCompleteCountReq();
        dispatch(deleteHomeThumnailCard());
        dispatch(setHomeTumnailCards(data.content));

        alert("버킷을 달성하셨습니다!");
      } catch (error) {
        console.error("Oh~ :", error);
      }
    },
    onError: (error) => {
      if (error.response.status === 409) {
        alert("이미 달성한 버킷입니다!");
      } else {
        console.log("에러러");
      }
    },
  });

  const handleHomeDetailBucketComplete = (curBoardId) => {
    return () => {
      confirm("버킷을 달성하시겠습니까?") &&
        homeDetailBucketComplete.mutate(curBoardId);
    };
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
          `/board/myposts?size=${homePage.value * 8 + 8}`,
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

  useEffect(() => {
    if (!localStorage.getItem("userAccessToken")) {
      navigate("/");
    } else {
      pageAndBoardDataReset();
      profileHomeCardReq(`${homePage.key + 0}`);
      profileCompleteCountReq();
      profileScrapDataReq();
    }
  }, []);

  useEffect(() => {
    if (!profileMouted01.current) {
      profileMouted01.current = true;
    } else {
      profileHomeCardReq(totalHomeParams.value);
      /*       console.log(
        "totalHomeParams 의존성 배열입니다. 파라미터가 변경되어 데이터 호출 함수를 실행합니다.(데이터호출)"
      ); */
    }
  }, [totalHomeParams.value]);

  useEffect(() => {
    if (!profileMouted02.current) {
      profileMouted02.current = true;
    } else {
      setProfileHomeCardData(homeThumnailCards.data);
      /*       console.log(homeThumnailCards.data);
      console.log(
        "전역 상태에 데이터가 저장이 되었습니다. setCards를 실행합니다."
      ); */
    }
  }, [homeThumnailCards.data]);

  useEffect(() => {
    if (!profileMouted03.current) {
      profileMouted03.current = true;
    } else {
      setprofileHomeCardDetailData(bucketDetailData);
    }
  }, [bucketDetailData]);

  return {
    completeCount,
    scrapCardData,
    activeNumber,
    detailModal,
    profileEditModal,
    profileHomeCardData,
    profileHomeCardDetailData,
    profileObserver,
    handleProfileEditModalState,
    handleMenuClick,
    handleHomeDetailView,
    handleHomeDetailModalClose,
    handleBucketDelete,
    handleBucketComplete,
    handleHomeDetailBucketComplete,
    handleHomeDetailBucketDelete,
    handleDetailHeartAndScrapClick,
  };
}
