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
  setTotalScrapParams,
  setPageScrapParams,
  setLastBoardScrapParams,
} from "@/store/scrapParameterSlice";

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
import { nickNameReg } from "@/utils/userAuthRegex";

export default function useMyProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    detailModal,
    profileEditModal,
    homePage,
    totalHomeParams,
    scrapPage,
    totalScrapParams,
    homeThumnailCards,
    bucketDetailData,
    curScrollLocation,
  } = useSelectorList();

  const [lastPage, setLastPage] = useState(false);

  const [submitLoading, setSubmitLoading] = useState(false);

  const [completeCount, setCompleteCount] = useState(0);
  const [scrapCardData, setScrapCardData] = useState([]);

  const [activeNumber, setActiveNumber] = useState(0);

  const [profileMyCardData, setProfileMyCardData] = useState([]);
  const [profileCardDetailData, setProfileCardDetailData] = useState({});

  const [nikcnameValue, setNicknameValue] = useState("");
  const [errors, setErrors] = useState({
    nicknameInvaildNotice: "default",
    nicknameErrorMsg: "",

    totalErrorMsg: "",
  });
  const [previewImg, setPreviewImg] = useState("");

  const profileMouted01 = useRef();
  const profileMouted02 = useRef();
  const profileMouted03 = useRef();
  const nicknameRef = useRef();

  const handleChange = ({ target }) => {
    setNicknameValue(target.value);
    setErrors({
      nicknameInvaildNotice: "default",
      nicknameErrorMsg: "",

      totalErrorMsg: "",
    });
  };

  const pageAndBoardDataReset = () => {
    dispatch(setPageHomeParams([`page=`, 0]));
    dispatch(setLastBoardHomeParams(["", ""]));

    dispatch(deleteHomeThumnailCard());

    //setIsLoading(true);
    setLastPage(false);
  };

  const { ref: myCardObserver } = useInView({
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
            `${profileMyCardData[profileMyCardData.length - 1].boardId}`,
          ])
        );
        dispatch(setTotalHomeParams());
      }
    },
  });

  const { ref: scrapCardObserver } = useInView({
    threshold: 0,
    onChange: (view) => {
      //스크롤 내렸을때 라스트페이지가 아닐때
      if (view && !lastPage) {
        dispatch(
          setPageScrapParams([
            `${scrapPage.key}`,
            `${parseInt(scrapPage.value) + 1}`,
          ])
        );
        dispatch(
          setLastBoardScrapParams([
            "&lastBoardId=",
            `${setScrapCardData[scrapCardData.length - 1].boardId}`,
          ])
        );
        dispatch(setTotalScrapParams());
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

  /*   const profileScrapDataReq = async (query) => {
    try {
      const token = `Bearer ${JSON.parse(
        localStorage.getItem("userAccessToken")
      )}`;

      const { data } = await getData(`/board/myposts/scraps?${query}`, {
        headers: {
          Authorization: token,
        },
      });
      setScrapCardData(data.content);
    } catch (error) {
      console.error(error);
    }
  }; */

  const profileScrapCardReq = async (query) => {
    try {
      const token = `Bearer ${JSON.parse(
        localStorage.getItem("userAccessToken")
      )}`;

      const { data } = await getData(`/board/myposts/scraps?size=99999`, {
        headers: {
          Authorization: token,
        },
      });

      setScrapCardData(data.content);
    } catch (error) {
      console.error(error);
    }
  };

  /*   const profileMyCardReq = async (query = "") => {
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
  }; */

  const profileMyCardReq = async (query = "") => {
    try {
      const token = `Bearer ${JSON.parse(
        localStorage.getItem("userAccessToken")
      )}`;
      const { data } = await getData(`/board/myposts?size=99999`, {
        headers: {
          Authorization: token,
        },
      });
      //setMyBucketCount(data.content.length);
      console.log(data);
      dispatch(setHomeTumnailCards(data.content));
    } catch (error) {
      console.error("Oh~ :", error);
    }
  };

  const cardDetailReq = async (borardNum) => {
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

      const latestCard =
        activeNumber === 0
          ? profileMyCardData.find((card) => card.boardId === borardNum)
          : scrapCardData.find((card) => card.boardId === borardNum);

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
      console.error("Oh~", error);
    }
  };

  const handleProfileEditModalState = () => {
    dispatch(setProfileEditModal());
  };

  const handleProfileImgChange = (e) => {
    const { files } = e.target;

    const fileRead = new FileReader();

    //다 읽고나면 실행되는 콜백
    fileRead.onload = ({ target }) => {
      setPreviewImg(target.result);
    };
    fileRead.readAsDataURL(files[0]);
  };

  /*   const nicknameRepeat = useMutation({
    mutationFn: async (nicknameValue) => {
      const token = `Bearer ${JSON.parse(
        localStorage.getItem("userAccessToken")
      )}`;
      return await postData("auth/signup/check-nickname", nicknameValue, {
        headers: {
          "Content-Type": "text/plain",
          Authorization: token,
        },
      });
    },
    onSuccess: async (res) => {
      try {
        
      } catch (error) {
        console.error("Oh~ :", error);
      }
    },
    onError: (error) => {
      if (error.response.status) {
        console.log("에러러");
      }
    },
  }); */
  const handleNicknameRepeatCheck = async (e) => {
    e.preventDefault();

    if (nikcnameValue === "" || !nickNameReg.test(nikcnameValue)) {
      setErrors({
        ...errors,
        nicknameInvaildNotice: "inVaild",
        nicknameErrorMsg: "닉네임은 2~6자 사이의 한글만 가능합니다!",
      });
    } else {
      try {
        const token = `Bearer ${JSON.parse(
          localStorage.getItem("userAccessToken")
        )}`;

        const result = await postData(
          "/member/profile/check-nickname",
          JSON.stringify({ nickname: nikcnameValue }),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );

        if (result.status === 200) {
          setErrors({
            ...errors,
            nicknameInvaildNotice: "vaild",
          });
        } else if (result.status === 409) {
          setErrors({
            ...errors,
            nicknameInvaildNotice: "inVaild",
            nicknameErrorMsg: "서버와의 연결이 끊겼습니다.",
          });
        }
      } catch (error) {
        const { response } = error;

        console.error(response);
      }
    }
  };

  const profileEditReq = async (e) => {
    e.preventDefault();

    if (submitLoading) {
      return;
    }

    setSubmitLoading(true);

    if (errors.nicknameInvaildNotice === "vaild") {
      try {
        const token = `Bearer ${JSON.parse(
          localStorage.getItem("userAccessToken")
        )}`;

        const formData = new FormData();
        formData.append(
          "patchMemberRequestDTO",
          new Blob([JSON.stringify({ nickname: nikcnameValue })], {
            type: "application/json",
          })
        );

        formData.append("file", previewImg);

        /*         const data = {
          patchMemberRequestDTO: JSON.stringify({
            nickname: nikcnameValue,
          }),
          file: previewImg,
        };
 */
        const res = await patchData(`/member/profile`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        });
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    } else {
      setErrors({
        ...errors,
        nicknameErrorMsg: "닉네임이 유효한지 다시 한번 확인 해주세요!",
      });
    }
  };

  const handleMenuClick = (curMenuNum) => {
    return () => {
      setActiveNumber(curMenuNum);
      /*       if (curMenuNum === 0) {
        pageAndBoardDataReset();
        profileHomeCardReq(homePage.key + 0);
      } else {
        pageAndBoardDataReset();
        profileScrapDataReq(scrapPage.key + 0);
      } */
    };
  };

  const handleCardDetailView = (curBoardId) => {
    return () => {
      dispatch(setScrollLocation(window.scrollY));
      cardDetailReq(curBoardId);
    };
  };

  const handleCardDetailModalClose = () => {
    detailModal && dispatch(setDetailBucketModal());
    setTimeout(() => {
      window.scroll({ top: curScrollLocation, left: 0 });
    }, 50);
  };

  /*   const bucketDelete = useMutation({
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
  }); */

  //active === 0
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
        const { data } = await getData(`/board/myposts?size=99999`, {
          headers: {
            Authorization: token,
          },
        });
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

  /*   const homeDetailBucketDelete = useMutation({
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
  }); */

  //active === 0
  const myDetailBucketDelete = useMutation({
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
        const { data } = await getData(`/board/myposts?size=99999`, {
          headers: {
            Authorization: token,
          },
        });

        profileCompleteCountReq();
        dispatch(deleteHomeThumnailCard());
        dispatch(setHomeTumnailCards(data.content));
      } catch (error) {
        console.error("Oh~ :", error);
      }
    },
    onError: (error) => {
      if (error.response.status === 401) {
        alert("권한이 없습니다!");
      }
    },
  });

  //active === 0
  const handleMyDetailBucketDelete = (curBoardId) => {
    return () => {
      confirm("버킷을 삭제하시겠습니까?") &&
        myDetailBucketDelete.mutate(curBoardId);
    };
  };

  /*   const bucketComplete = useMutation({
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
  }); */

  //active === 0
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
        const { data } = await getData(`/board/myposts?size=99999`, {
          headers: {
            Authorization: token,
          },
        });
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
        alert("권한이 없습니다.");
      }
    },
  });
  //active === 0
  const handleBucketComplete = (curBoardId) => {
    return () => {
      confirm("버킷을 달성하시겠습니까?") && bucketComplete.mutate(curBoardId);
    };
  };

  /*   const homeDetailBucketComplete = useMutation({
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
  }); */

  //active === 0
  const myDetailBucketComplete = useMutation({
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
      cardDetailReq(bucketDetailData.boardId);
      try {
        const token = `Bearer ${JSON.parse(
          localStorage.getItem("userAccessToken")
        )}`;
        const { data } = await getData(`/board/myposts?size=99999`, {
          headers: {
            Authorization: token,
          },
        });
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

  const handleMyDetailBucketComplete = (curBoardId) => {
    return () => {
      confirm("버킷을 달성하시겠습니까?") &&
        myDetailBucketComplete.mutate(curBoardId);
    };
  };

  /*   const detailLikeAndScrapReq = useMutation({
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
  }); */

  //active === 0 && actiove === 1
  const MyCardDetailLikeReq = useMutation({
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
      cardDetailReq(bucketDetailData.boardId);
      try {
        const token = `Bearer ${JSON.parse(
          localStorage.getItem("userAccessToken")
        )}`;
        const { data } = await getData(`/board/myposts?size=99999`, {
          headers: {
            Authorization: token,
          },
        });
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

  const ScrapCardDetailLikeReq = useMutation({
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
      cardDetailReq(bucketDetailData.boardId);
      try {
        const token = `Bearer ${JSON.parse(
          localStorage.getItem("userAccessToken")
        )}`;
        const { data } = await getData(`/board/myposts?size=99999`, {
          headers: {
            Authorization: token,
          },
        });
        //눈속임
        setScrapCardData(data.content);
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

  const handleDetailHeartClick = (activeNumber, curBoardId) => {
    return () => {
      switch (activeNumber) {
        case 0: {
          MyCardDetailLikeReq.mutate(`${curBoardId}/like`);
          break;
        }
        case 1: {
          ScrapCardDetailLikeReq.mutate(`${curBoardId}/scrap`);
          break;
        }
      }
    };
  };

  /*   useEffect(() => {
    if (!localStorage.getItem("userAccessToken")) {
      navigate("/");
    } else {
      pageAndBoardDataReset();
      profileHomeCardReq(`${homePage.key + 0}`);
      profileCompleteCountReq();
      profileScrapDataReq();
    }
  }, []); */

  useEffect(() => {
    if (!localStorage.getItem("userAccessToken")) {
      navigate("/");
    } else {
      dispatch(deleteHomeThumnailCard());
      profileMyCardReq();
      profileScrapCardReq();
      profileCompleteCountReq();
    }
  }, []);

  /*   useEffect(() => {
    if (!profileMouted01.current) {
      profileMouted01.current = true;
    } else {
      profileMyCardReq(totalHomeParams.value);

    }
  }, [totalHomeParams.value]); */

  /*   useEffect(() => {
    if (!profileMouted04.current) {
      profileMouted04.current = true;
    } else {
      profileScrapCardReq(totalScrapParams.value);
    }
  }, [totalScrapParams.value]); */

  useEffect(() => {
    if (!profileMouted02.current) {
      profileMouted02.current = true;
    } else {
      setProfileMyCardData(homeThumnailCards.data);
    }
  }, [homeThumnailCards.data]);

  useEffect(() => {
    if (!profileMouted03.current) {
      profileMouted03.current = true;
    } else {
      setProfileCardDetailData(bucketDetailData);
    }
  }, [bucketDetailData]);

  useEffect(() => {
    profileEditModal && nicknameRef.current && nicknameRef.current.focus();
  }, [profileEditModal]);

  return {
    completeCount,
    scrapCardData,
    activeNumber,
    detailModal,
    profileEditModal,
    profileMyCardData,
    profileCardDetailData,
    previewImg,
    nikcnameValue,
    nicknameRef,
    errors,
    setErrors,
    myCardObserver,
    scrapCardObserver,
    handleChange,
    setNicknameValue,
    handleProfileEditModalState,
    handleMenuClick,
    handleCardDetailView,
    handleCardDetailModalClose,
    handleBucketDelete,
    handleBucketComplete,
    handleMyDetailBucketComplete,
    handleMyDetailBucketDelete,
    handleDetailHeartClick,
    handleProfileImgChange,
    handleNicknameRepeatCheck,
    profileEditReq,
  };
}
