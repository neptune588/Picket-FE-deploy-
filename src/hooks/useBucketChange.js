import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import {
  setHomeTumnailCards,
  deleteHomeThumnailCard,
} from "@/store/bucketThumnailSlice";
import { setBucketChangeModal } from "@/store/modalsSlice";

import useAddBucket from "@/hooks/useAddBucket";
import useMypage from "@/hooks/useMypage";
import useSelectorList from "@/hooks/useSelectorList";

import { postData } from "@/services/api";
import { getData } from "@/services/api";

export default function useBucketChange(type, boardId) {
  const dispatch = useDispatch();
  const {
    date,
    imgData,
    valueData,
    calanderModalState,
    submitLoading,
    handleImageUpload,
    handleChange,
    setDate,
    setCalanderModalState,
    setSubmitLoading,
  } = useAddBucket();

  const { homeCardDetailReq } = useMypage();
  const { homePage, bucketDetailData, curScrollLocation, bucketChangeModal } =
    useSelectorList();

  const bucketChangeModalClose = () => {
    bucketChangeModal && dispatch(setBucketChangeModal());
  };

  const homeCardReq = async () => {
    try {
      const token = `Bearer ${JSON.parse(
        localStorage.getItem("userAccessToken")
      )}`;
      const { data } = await getData(
        `board/myposts?size=${homePage.value * 8 + 8}`,
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
  };

  const bucketChange = useMutation({
    mutationFn: async (formData) => {
      const token = `Bearer ${JSON.parse(
        localStorage.getItem("userAccessToken")
      )}`;

      const END_POINT =
        type === "home" || type === "profile"
          ? `board/${boardId}`
          : `board/${bucketDetailData.boardId}`;

      return await postData(END_POINT, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
    },
    onSuccess: async () => {
      alert("버킷을 수정 했습니다!");

      if (type === "home" || type === "profile") {
        homeCardReq();
        bucketChangeModal && dispatch(setBucketChangeModal());
        setTimeout(() => {
          window.scroll({ top: curScrollLocation, left: 0 });
        }, 50);
      } else {
        homeCardDetailReq(bucketDetailData.boardId);
        bucketChangeModal && dispatch(setBucketChangeModal());
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });
  s;
  const handleSubmit = (e) => {
    e.preventDefault();

    if (submitLoading) {
      return;
    }
    setSubmitLoading(true);

    //안해도되긴하지만 중복검증
    const { bucketTitle, bucketContent } = valueData;
    const { postImg } = imgData;

    if (bucketTitle && bucketContent && postImg) {
      const formData = new FormData();

      const contents = {
        title: bucketTitle,
        content: bucketContent,
        deadline:
          date.getFullYear() +
          "-" +
          String(date.getMonth() + 1).padStart(2, 0) +
          "-" +
          String(date.getDate()).padStart(2, 0),
      };
      formData.append(
        "patchBoardRequestDTO",
        new Blob([JSON.stringify(contents)], {
          type: "application/json",
        })
      );
      formData.append("file", postImg);

      bucketChange.mutate(formData);
    } else {
      alert("내용 작성 밑 이미지를 업로드 해주세요!");
    }

    setSubmitLoading(false);
  };
  return {
    date,
    imgData,
    valueData,
    calanderModalState,
    handleImageUpload,
    handleChange,
    handleSubmit,
    setDate,
    setCalanderModalState,
    bucketChangeModalClose,
  };
}
