import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "@/utils/categoryData";
import { useMutation } from "@tanstack/react-query";

import { postData } from "@/services/api";

export default function useAddBucket() {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [date, setDate] = useState(new Date());
  const [calanderModalState, setCalanderModalState] = useState(false);
  //multipart
  const [imgData, setImgData] = useState({
    previewImg: null,
    postImg: null,
  });
  const [categoryData, setCategoryData] = useState(() => {
    const data = [...categoriesData];
    data.splice(0, 1);
    return data;
  });
  const [valueData, setValueData] = useState({
    bucketTitle: "", //condition ->  value === "",null,undifined x
    bucketContent: "", //condition ->  value === "",null,undifined x
    categoryList: [], //condition -> length === 0 x
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const handleImageUpload = (e) => {
    const { files } = e.target;

    const fileRead = new FileReader();

    //다 읽고나면 실행되는 콜백
    fileRead.onload = ({ target }) => {
      setImgData((prev) => {
        return { ...prev, previewImg: target.result };
      });
    };
    fileRead.readAsDataURL(files[0]);
    setImgData((prev) => {
      return { ...prev, postImg: files[0] };
    });
  };

  const handleChange = (e) => {
    console.log(valueData);
    setValueData({ ...valueData, [e.target.name]: e.target.value });
  };

  const handleCategoryClick = (activeNumber, queryNumber) => {
    return () => {
      setCategoryData(() => {
        const copy = categoryData.map((data, idx) => {
          return {
            ...data,
            activeState:
              idx === activeNumber ? !data.activeState : data.activeState,
          };
        });

        return copy;
      });
      setValueData(() => {
        const categorySelect = [...valueData.categoryList];

        categorySelect.indexOf(queryNumber) === -1
          ? categorySelect.push(queryNumber)
          : categorySelect.splice(categorySelect.indexOf(queryNumber), 1);

        return { ...valueData, categoryList: categorySelect };
      });
    };
  };

  const handleNextStepCheck = () => {
    const { bucketTitle, bucketContent, categoryList } = valueData;
    const { postImg } = imgData;

    if (
      !bucketTitle ||
      !bucketContent ||
      categoryList.length === 0 ||
      !postImg
    ) {
      console.log(bucketTitle, bucketContent, categoryList, postImg);
      alert("내용 작성 밑 이미지를 업로드 해주세요!");
    } else {
      setStep(1);
    }
  };

  const bucketCreate = useMutation({
    mutationFn: async (formData) => {
      const token = `Bearer ${JSON.parse(
        localStorage.getItem("userAccessToken")
      )}`;
      return await postData(`board`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
    },
    onSuccess: async (res) => {
      alert(res.data.message);
      navigate("/");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (submitLoading) {
      return;
    }
    setSubmitLoading(true);

    //안해도되긴하지만 중복검증
    const { bucketTitle, bucketContent, categoryList } = valueData;
    const { postImg } = imgData;

    if (bucketTitle && bucketContent && categoryList && postImg) {
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
        categoryList: categoryList,
      };
      formData.append(
        "postBoardRequestDTO",
        new Blob([JSON.stringify(contents)], {
          type: "application/json",
        })
      );
      formData.append("file", postImg);

      bucketCreate.mutate(formData);
    }

    setSubmitLoading(false);
  };
  return {
    date,
    imgData,
    valueData,
    categoryData,
    step,
    calanderModalState,
    handleImageUpload,
    handleChange,
    handleCategoryClick,
    handleNextStepCheck,
    handleSubmit,
    setDate,
    setStep,
    setCalanderModalState,
  };
}
