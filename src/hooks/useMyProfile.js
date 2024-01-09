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
import { nickNameReg } from "@/utils/userAuthRegex";

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
  const [submitLoading, setSubmitLoading] = useState(false);

  const [completeCount, setCompleteCount] = useState(0);
  const [pregressCount, setPregressCount] = useState(0);

  const [activeNumber, setActiveNumber] = useState(0);

  const [profileCardData, setProfileCardData] = useState([]);
  const [profileCardDetailData, setProfileCardDetailData] = useState({});

  const [nikcnameValue, setNicknameValue] = useState("");
  const [errors, setErrors] = useState({
    nicknameInvaildNotice: "default",
    nicknameErrorMsg: "",

    totalErrorMsg: "",
  });
  const [postImg, setPostImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  const profileMouted01 = useRef();
  const profileMouted02 = useRef();
  const profileMouted03 = useRef();
  const nicknameRef = useRef();
  const dummyObserver = useRef();

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

  const { ref: profileCardObserver } = useInView({
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
            profileCardData[profileCardData.length - 1].boardId,
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
      setPregressCount(data.progressTotal);
    } catch (error) {
      console.error(error);
    }
  };

  const profileCardDataReq = async (query, type) => {
    try {
      const token = `Bearer ${JSON.parse(
        localStorage.getItem("userAccessToken")
      )}`;

      const { data } = await getData(
        `${
          type === "myCard" ? "/board/myposts" : "/board/myposts/scraps"
        }?${query}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(data);
      if (Array.isArray(data.content) && data.content.length > 0) {
        data.last && setLastPage(true);

        setLastPage(false);
        dispatch(setHomeTumnailCards(data.content));
        setIsLoading(false);
      } else {
        setLastPage(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
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
          isCompleted: profileCardData.find(
            (card) => card.boardId === borardNum
          ).isCompleted,
        })
      );

      //console.log(bucketDetailData);
      const latestBucket = JSON.parse(localStorage.getItem("latestBucket"));

      const latestCard = profileCardData.find(
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
    setPostImg(files[0]);
  };

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

        const res = await postData(
          "/member/profile/check-nickname",
          JSON.stringify({ nickname: nikcnameValue }),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );

        if (res.status === 200) {
          setErrors({
            ...errors,
            nicknameInvaildNotice: "vaild",
          });
        }
      } catch (error) {
        const { response } = error;
        if (response.status === 409) {
          setErrors({
            ...errors,
            nicknameInvaildNotice: "inVaild",
            nicknameErrorMsg: "이미 존재하는 닉네임 입니다",
          });
        }
        console.error(response);
      }
    }
  };

  const handleEditModalClose = () => {
    setNicknameValue("");
    setErrors({
      ...errors,
      nicknameInvaildNotice: "default",
      nicknameErrorMsg: "",

      totalErrorMsg: "",
    });
    setPreviewImg(null);
    handleProfileEditModalState();
  };

  const profileEditReq = async (e) => {
    e.preventDefault();

    if (submitLoading) {
      return;
    }

    setSubmitLoading(true);

    if (errors.nicknameInvaildNotice === "vaild") {
      const formData = new FormData();

      formData.append(
        "patchMemberRequestDTO",
        new Blob([JSON.stringify({ nickname: nikcnameValue })], {
          type: "application/json",
        })
      );
      formData.append("file", postImg);

      try {
        const token = `Bearer ${JSON.parse(
          localStorage.getItem("userAccessToken")
        )}`;

        const res = await postData(`/member/profile`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        });

        console.log(res);
        localStorage.setItem("userNickname", JSON.stringify(res.data.nickname));
        localStorage.setItem("userAvatar", res.data.imageUrl);

        handleEditModalClose();
      } catch (error) {
        console.error(error.data);
      }
      setSubmitLoading(false);
    } else {
      setErrors({
        ...errors,
        nicknameErrorMsg: "닉네임이 유효한지 다시 한번 확인 해주세요!",
      });
      setSubmitLoading(false);
    }
  };

  const handleMenuClick = (curMenuNum) => {
    return () => {
      setActiveNumber(curMenuNum);
      pageAndBoardDataReset();
      curMenuNum === 0
        ? profileCardDataReq(homePage.key + 0, "myCard")
        : profileCardDataReq(homePage.key + 0, "scrap");
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
      console.error(error);
    },
  });

  const handleBucketDelete = (curBoardId) => {
    return () => {
      confirm("버킷을 삭제하시겠습니까?") && bucketDelete.mutate(curBoardId);
    };
  };

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
        alert("권한이 없습니다!");
      }
    },
  });

  const handleMyDetailBucketDelete = (curBoardId) => {
    return () => {
      confirm("버킷을 삭제하시겠습니까?") &&
        myDetailBucketDelete.mutate(curBoardId);
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
    onSuccess: async () => {
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
        alert("권한이 없습니다.");
      }
    },
  });

  const handleBucketComplete = (curBoardId) => {
    return () => {
      confirm("버킷을 달성하시겠습니까?") && bucketComplete.mutate(curBoardId);
    };
  };

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
        console.error(error);
      }
    },
  });

  const handleMyDetailBucketComplete = (curBoardId) => {
    return () => {
      confirm("버킷을 달성하시겠습니까?") &&
        myDetailBucketComplete.mutate(curBoardId);
    };
  };

  const MyCardDetailLikeReq = useMutation({
    mutationFn: async (curParams) => {
      const token = `Bearer ${JSON.parse(
        localStorage.getItem("userAccessToken")
      )}`;
      return await postData(`/board/${curParams}`, null, {
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
      console.error(error);
    },
  });

  const ScrapCardDetailLikeReq = useMutation({
    mutationFn: async (curParams) => {
      const token = `Bearer ${JSON.parse(
        localStorage.getItem("userAccessToken")
      )}`;
      return await postData(`/board/${curParams}`, null, {
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
        const { data } = await getData(
          `/board/myposts/scraps?size=${homePage.value * 8 + 8}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        //눈속임
        dispatch(deleteHomeThumnailCard());
        dispatch(setHomeTumnailCards(data.content));
      } catch (error) {
        console.error("Oh~ :", error);
      }
    },
    onError: (error) => {
      console.error(error);
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
          ScrapCardDetailLikeReq.mutate(`${curBoardId}/like`);
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
      profileCardDataReq(`${homePage.key + 0}`, "myCard");
      profileCompleteCountReq();
    }
  }, []);

  useEffect(() => {
    if (!profileMouted01.current) {
      profileMouted01.current = true;
    } else {
      activeNumber === 0
        ? profileCardDataReq(totalHomeParams.value, "myCard")
        : profileCardDataReq(totalHomeParams.value, "scrap");
    }
  }, [totalHomeParams.value]);

  useEffect(() => {
    if (!profileMouted02.current) {
      profileMouted02.current = true;
    } else {
      setProfileCardData(homeThumnailCards.data);
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
    pregressCount,
    activeNumber,
    detailModal,
    profileCardData,
    profileCardDetailData,
    profileEditModal,
    previewImg,
    nikcnameValue,
    nicknameRef,
    errors,
    isLoading,
    dummyObserver,
    profileCardObserver,
    handleChange,
    handleEditModalClose,
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
