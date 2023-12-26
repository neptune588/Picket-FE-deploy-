import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postData } from "@/services/api";

//endpoint auth/login
export default function useSignIn(defaultData) {
  const [errors, setErrors] = useState({ ...defaultData });
  const [values, setValues] = useState({
    userLoginEmail: "",
    userLoginPassword: "",
  });
  const [submitLoading, setSubmitLoading] = useState(false);

  const { data, isLoading, mutate } = useMutation({
    mutationFn: async (userData) => {
      await postData(userData);
    },
    //성공시
    onSuccess: () => {
      console.log("요청 성공");
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
      mutate({});
      setSubmitLoading(false);
      return;
    }
  };

  return { errors, values, isLoading, handleSubmit, handleChange };
}
