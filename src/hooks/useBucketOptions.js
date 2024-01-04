import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  setDetailButcket,
  setCommentModalState,
} from "@/store/bucketDetailSlice";

import { postData } from "@/services/api";
import { getData } from "@/services/api";
import { delData } from "@/services/api";

export default function useBucketOptions() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const bucketDetailObj = useSelector((state) => {
    return state.bucketDetail;
  });

  const [commentValue, setCommentValue] = useState("");
  const { bucketDetailData } = bucketDetailObj;

  const commentCreateInput = useRef();

  const handleChange = (e) => {
    setCommentValue(e.target.value);
  };

  const handleCurCommentDel = () => {
    setCommentValue("");
    commentCreateInput.current && commentCreateInput.current.focus();
  };
  const handleLoginCheck = () => {
    const isLogin = localStorage.getItem("userAccessToken");
    if (!isLogin) {
      const question = confirm(
        "로그인을 하셔야 이용 가능합니다. 로그인 하시겠습니까?"
      );
      question && navigate("/auth/signin");
    }
  };

  const createCommentReq = useMutation({
    mutationFn: async ({ boardId, content }) => {
      const token = `Bearer ${JSON.parse(
        localStorage.getItem("userAccessToken")
      )}`;
      return await postData(`/board/${boardId}/comments`, content, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
    },
    onSuccess: async (res) => {
      alert(res.data.message);
      const { data } = await getData(`/board/${bucketDetailData.boardId}`);
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
    },
    onError: (error) => {
      if (error.response.status) {
        console.log("에러러");
      }
    },
  });

  const commentDelReq = useMutation({
    mutationFn: async ({ boardId, commentId }) => {
      const token = `Bearer ${JSON.parse(
        localStorage.getItem("userAccessToken")
      )}`;
      return await delData(`/board/${boardId}/comments/${commentId}`, {
        headers: {
          Authorization: token,
        },
      });
    },
    onSuccess: async (res) => {
      alert(res.data.message);
      const { data } = await getData(`/board/${bucketDetailData.boardId}`);
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
    },
    onError: (error) => {
      if (error.response.status) {
        console.log("에러러");
      }
    },
  });

  const handleCommentCreate = (boardId) => {
    if (
      commentValue === "" ||
      commentValue === null ||
      commentValue === undefined
    ) {
      alert("댓글 내용을 작성 해주세요!");
    } else {
      createCommentReq.mutate({
        boardId: boardId,
        content: JSON.stringify({ content: commentValue }),
      });
      handleCurCommentDel();
    }
  };

  const handleCommentDelReq = (boardId, commentId) => {
    return () => {
      commentDelReq.mutate({ boardId, commentId });
    };
  };

  const handlePutModal = (curCommentNumber, putOptionsState) => {
    return () => {
      dispatch(setCommentModalState({ curCommentNumber, putOptionsState }));
    };
  };

  return {
    commentValue,
    commentCreateInput,
    handleChange,
    handleCurCommentDel,
    handleLoginCheck,
    handleCommentCreate,
    handlePutModal,
    handleCommentDelReq,
  };
}
