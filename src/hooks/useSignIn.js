import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postData } from "@/services/api";

//endpoint auth/login
export default function useSignIn(defaultData) {
  const navigate = useNavigate();
  useEffect(() => {
    const condition = localStorage.getItem("userInfo");
    if (condition) {
      navigate("/");
    }
  }, []);

  const [errors, setErrors] = useState({ ...defaultData });
  const [values, setValues] = useState({
    userLoginEmail: "",
    userLoginPassword: "",
  });
  const [submitLoading, setSubmitLoading] = useState(false);

  const { isLoading, mutate } = useMutation({
    mutationFn: async (userData) => {
      return await postData("auth/login", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onMutate: () => {
      const condition = localStorage.getItem("userInfo");
      if (condition) {
        return false;
      }
    },
    //성공시
    onSuccess: (JWT) => {
      const { data: tokenData } = JWT;
      //localstroge는 오직 문자열 형태의 key,value만 가능하다.
      localStorage.setItem("userInfo", JSON.stringify(tokenData));

      setValues({ userLoginEmail: "", userLoginPassword: "" });
      setErrors({ ...defaultData });

      navigate("/");
    },
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });

    if (values.userLoginEmail !== "") {
      setErrors({
        ...values,
        emailInvaildNotice: "default",
        userEmailMsg: "",
      });
    }

    if (values.userLoginPassword !== "") {
      setErrors({
        ...values,
        pwInvaildNotice: "default",
        userPwMsg: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitLoading) {
      return;
    }
    setSubmitLoading(true);

    if (values.userLoginEmail === "") {
      setErrors({
        ...values,
        emailInvaildNotice: "inVaild",
        userEmailMsg: "이메일을 입력 해주세요.",
      });
      setSubmitLoading(false);
      return;
    } else if (values.userLoginPassword === "") {
      setErrors({
        ...values,
        pwInvaildNotice: "inVaild",
        userPwMsg: "비밀번호를 입력 해주세요.",
      });
      setSubmitLoading(false);
      return;
    } else {
      const dataRefine = JSON.stringify({
        email: values.userLoginEmail,
        password: values.userLoginPassword,
      });

      mutate(dataRefine);

      setSubmitLoading(false);
      return;
    }
  };

  return { errors, values, isLoading, handleSubmit, handleChange };
}
