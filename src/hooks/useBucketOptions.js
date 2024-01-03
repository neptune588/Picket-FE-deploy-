import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useMutation } from "@tanstack/react-query";
import { postData } from "@/services/api";

export default function useBucketOptions() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [commentValue, setCommentValue] = useState("");
  const { bucketDetailData, curScrollLocation } = bucketDetailObj;

  const commentCreateInput = useRef();

  const handleChange = (e) => {
    setCommentValue(e.target.value);
  };

  const handleCommentDel = () => {
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
      console.log(commentValue);
      alert("댓글 내용을 작성 해주세요!");
    } else {
      createCommentReq.mutate({
        boardId: boardId,
        content: JSON.stringify({ content: commentValue }),
      });
    }
  };

  return {
    commentValue,
    commentCreateInput,
    handleChange,
    handleCommentDel,
    handleLoginCheck,
    handleCommentCreate,
  };
}
