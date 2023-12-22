import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
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

  //mutatation
  const { mutate, isError, error, isSuccess } = useMutation(postData);

  //handlerFnc
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

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

  const handleErrorCheck = (e) => {
    e.preventDefault();
    setVaildData((prev) => {
      return vaildSearch(prev, values, e.target.name);
    });
    setChecks(vaildData.checkData);
    setInspection(vaildData.inspectionData);
    setErrors(vaildData.errorData);
  };

  const handleTotalCheck = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (isLoaidng) {
      const inspect = Object.keys(inspection).every((key) => {
        return inspection[key];
      });

      if (inspect) {
        mutate("auth/signup", dataRefineFnc(values));

        if (isError) {
          console.log(error);
        }

        if (isSuccess) {
          console.log(error);
          setValues("");
          navigate("/auth/signin");
        }
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
    handleTotalCheck,
  };
}
