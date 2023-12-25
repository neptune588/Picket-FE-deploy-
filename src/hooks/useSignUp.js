import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "@/services/api";

export default function useSignUp(vaildCheks, defaultData, onSubmit) {
  const navigate = useNavigate();

  const { checkData, errorData, finalCheckData } = defaultData;

  const [values, setValues] = useState({});
  const [checks, setChecks] = useState({ ...checkData });
  const [errors, setErrors] = useState({ ...errorData });
  const [finalChecks, setFinalChecks] = useState({ ...finalCheckData });
  const [isLoaidng, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });

    if (e.target.name === "userEmail") {
      setChecks({
        ...checks,
        emailRepeatVaild: "default",
      });
      setErrors({
        ...errors,
        emailInvaildNotice: "default",
      });
    }

    if (e.target.name === "userNickName") {
      setChecks({
        ...checks,
        nickNameRepeatVaild: "default",
      });
      setErrors({
        ...errors,
        nickNameInvaildNotice: "default",
      });
    }
  };

  const handleTermsCheck = () => {
    setChecks({ ...checks, isChecked: !checks.isChecked });
  };

  const handleErrorCheck = (e) => {
    e.preventDefault();

    const { errorList, checkList, finalCheckList } = vaildCheks(
      e.target.name,
      values,
      {
        errors,
        checks,
        finalChecks,
      }
    );

    setErrors(errorList);
    setChecks(checkList);
    setFinalChecks(finalCheckList);
  };

  const handleEmailRepeatCheck = async (e) => {
    e.preventDefault();

    if (checks.emailVaild) {
      try {
        const result = await postData(
          "auth/signup/check-email",
          values.userEmail,
          {
            headers: {
              "Content-Type": "text/plain",
            },
          }
        );

        if (result.status === 200) {
          setChecks({
            ...checks,
            emailRepeatVaild: "vaild",
          });
          setErrors({
            ...errors,
            emailInvaildNotice: "vaild",
          });
        }
      } catch (error) {
        const { response } = error;

        if (response.status === 409) {
          setChecks({
            ...checks,
            emailRepeatVaild: "inVaild",
          });
          setErrors({
            ...errors,
            userEmailMsg: `${response.data.message}`,
            emailInvaildNotice: "inVaild",
          });
        } else {
          setChecks({
            ...checks,
            emailRepeatVaild: "inVaild",
          });
          setErrors({
            ...errors,
            userEmailMsg:
              "서버와의 연결이 끊겼습니다. 다시 한번 시도 해주세요.",
            emailInvaildNotice: "inVaild",
          });
        }
      }
    }
  };

  const handleNickNameRepeatCheck = async (e) => {
    e.preventDefault();

    if (checks.nickNameVaild) {
      try {
        const result = await postData(
          "auth/signup/check-nickname",
          values.userNickname,
          {
            headers: {
              "Content-Type": "text/plain",
            },
          }
        );

        if (result.status === 200) {
          setChecks({
            ...checks,
            nickNameRepeatVaild: "vaild",
          });
          setErrors({
            ...errors,
            nickNameInvaildNotice: "vaild",
          });
        }
      } catch (error) {
        const { response } = error;

        if (response.status === 409) {
          setChecks({
            ...checks,
            nickNameRepeatVaild: "inVaild",
          });
          setErrors({
            ...errors,
            userNickNameMsg: `${response.data.message}`,
            nickNameInvaildNotice: "inVaild",
          });
        } else {
          setErrors({
            ...errors,
            userNickNameMsg:
              "서버와의 연결이 끊겼습니다. 다시 한번 시도 해주세요.",
            nickNameInvaildNotice: "inVaild",
          });
        }
      }
    }
  };

  const handleTotalCheck = async (e) => {
    e.preventDefault();

    if (isLoaidng) {
      return;
    }

    setIsLoading(true);
    if (checks.nickNameRepeatVaild === "vaild") {
      const inspect = Object.keys(finalChecks).every((key) => {
        return finalChecks[key];
      });

      try {
        if (inspect) {
          const result = await postData("auth/signup", onSubmit(values), {
            headers: {
              "Content-Type": "application/json",
            },
          });
          setValues("");

          navigate(`/auth/registerSuccess/${result.data.message}`);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    } else if (!checks.nickNameVaild) {
      setErrors({
        ...errors,
        lastPageMsg: "유효한 닉네임이 아닙니다. 다시 한번 확인 해주세요!",
      });
      setIsLoading(false);
      return;
    } else {
      setErrors({
        ...errors,
        lastPageMsg: "닉네임 중복확인을 해주세요!",
      });
      setIsLoading(false);
      return;
    }
  };

  return {
    values,
    checks,
    errors,
    handleChange,
    handleTermsCheck,
    handleErrorCheck,
    handleEmailRepeatCheck,
    handleNickNameRepeatCheck,
    handleTotalCheck,
  };
}
