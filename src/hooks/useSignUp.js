import { useEffect, useState } from "react";
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

  /*   1. blur 일어날때마다 유효성 검사
  2. 중복확인이 됐으면 repeat true
  3. onchange일어났을때 다시 default로 바꾸기.
  4. bodrer는 default로바꾸고 이후에 blur일어나면 유효성검사로 체크해서 border 바뀜. */

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });

    if (e.target.name === "userEmail") {
      setChecks((prev) => {
        return {
          ...prev,
          emailRepeatVaild: "default",
          nickNameRepeatVaild: "default",
        };
      });
      setErrors((prev) => {
        return {
          ...prev,
          emailInvaildNotice: "default",
          nickNameInvaildNotice: "default",
        };
      });
    }

    if (e.target.name === "userNickName") {
      setChecks((prev) => {
        return {
          ...prev,
          emailRepeatVaild: "default",
          nickNameRepeatVaild: "default",
        };
      });
      setErrors((prev) => {
        return {
          ...prev,
          emailInvaildNotice: "default",
          nickNameInvaildNotice: "default",
        };
      });
    }
  };

  const handleTermsCheck = () => {
    setChecks((prev) => {
      return {
        ...prev,
        isChecked: !checks.isChecked,
      };
    });
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
          setChecks((prev) => {
            return {
              ...prev,
              emailRepeatVaild: "vaild",
            };
          });
          setErrors((prev) => {
            return {
              ...prev,
              emailInvaildNotice: "vaild",
            };
          });

          console.log(result);
        }
      } catch (error) {
        const { response } = error;

        if (response.status === 409) {
          setChecks((prev) => {
            return {
              ...prev,
              emailRepeatVaild: "inVaild",
            };
          });
          setErrors((prev) => {
            return {
              ...prev,
              userEmailMsg: `${response.data.message}`,
              emailInvaildNotice: "inVaild",
            };
          });
        } else {
          setChecks((prev) => {
            return {
              ...prev,
              emailRepeatVaild: "inVaild",
            };
          });
          setErrors((prev) => {
            return {
              ...prev,
              userEmailMsg:
                "서버와의 연결이 끊겼습니다. 다시 한번 시도 해주세요.",
              emailInvaildNotice: "inVaild",
            };
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
          setChecks((prev) => {
            return {
              ...prev,
              nickNameRepeatVaild: "vaild",
            };
          });
          setErrors((prev) => {
            return {
              ...prev,
              nickNameInvaildNotice: "vaild",
            };
          });
        }
      } catch (error) {
        const { response } = error;

        if (response.status === 409) {
          setChecks((prev) => {
            return {
              ...prev,
              nickNameRepeatVaild: "inVaild",
            };
          });
          setErrors((prev) => {
            return {
              ...prev,
              userNickNameMsg: `${response.data.message}`,
              nickNameInvaildNotice: "inVaild",
            };
          });
        } else {
          setErrors((prev) => {
            return {
              ...prev,
              userNickNameMsg:
                "서버와의 연결이 끊겼습니다. 다시 한번 시도 해주세요.",
              nickNameInvaildNotice: "inVaild",
            };
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
      setErrors((prev) => {
        return {
          ...prev,
          lastPageMsg: "유효한 닉네임이 아닙니다. 다시 한번 확인 해주세요!",
        };
      });
      setIsLoading(false);
      return false;
    } else {
      setErrors((prev) => {
        return {
          ...prev,
          lastPageMsg: "닉네임 중복확인을 해주세요!",
        };
      });
      setIsLoading(false);
      return false;
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
