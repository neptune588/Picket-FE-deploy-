import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "@/services/api";
import { postData } from "@/services/api";

export default function useForm(vaildSearch, defaultVaildData, dataRefineFnc) {
  //useNavigate
  const navigate = useNavigate("test");

  const { checkData, errorData, inspectionData } = defaultVaildData;

  //state
  const [values, setValues] = useState({});
  const [checks, setChecks] = useState({ checkData });
  const [errors, setErrors] = useState({ errorData });
  const [inspection, setInspection] = useState({ inspectionData });
  const [vaildData, setVaildData] = useState(defaultVaildData);
  const [isLoaidng, setIsLoading] = useState(false);

  //ChangeFnc
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  //termsCheckFnc
  const handleTermsCheck = () => {
    setVaildData((prev) => {
      return {
        ...prev,
        checkData: {
          ...prev.checkData,
          isChecked: !vaildData.checkData.isChecked,
        },
      };
    });
    setChecks(vaildData.checkData);
  };
  //errorCheckFnc
  const handleErrorCheck = (e) => {
    e.preventDefault();
    setVaildData((prev) => {
      return vaildSearch(prev, values, e.target.name);
    });
    setChecks(vaildData.checkData);
    setInspection(vaildData.inspectionData);
    setErrors(vaildData.errorData);
  };

  //emailRepeatCheckFnc
  const handleEmailRepeatCheck = async (e) => {
    e.preventDefault();

    if (checks.emailVaild) {
      console.log(values.userEmail);
      const result = await instance.post(
        "auth/signup/check-email",
        values.userEmail
      );

      try {
        if (result.status === 200) {
          setVaildData((prev) => {
            return {
              ...prev,
              checkData: {
                ...prev.checkData,
                emailRepeatVaild: true,
              },
            };
          });
          setChecks(vaildData.checkData);
          console.log(result.data);
        } else {
          console.log("중복된 이메일입니다.");
        }
      } catch (error) {
        console.error("error:", error);
      }
    }
  };

  const handleTotalCheck = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (isLoaidng) {
      const inspect = Object.keys(inspection).every((key) => {
        return inspection[key];
      });

      if (inspect) {
        dataRefineFnc(values);
        setValues("");
        navigate("/auth/signin");
      }

      setIsLoading(false);
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
    handleTotalCheck,
  };
}
