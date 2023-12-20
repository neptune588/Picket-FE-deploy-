import { useState } from "react";

export default function useForm(vaildSearch, defaultVaildData, onSubmit) {
  const { checkData, errorData, inspectionData } = defaultVaildData;

  const [values, setValues] = useState({});
  const [checks, setChecks] = useState({ checkData });
  const [errors, setErrors] = useState({ errorData });
  const [inspection, setInspection] = useState({ inspectionData });
  const [vaildData, setVaildData] = useState(defaultVaildData);
  const [isLoading, setIsLoading] = useState(false);

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

    if (isLoading) {
      Object.keys(inspection).every((key) => {
        return inspection[key];
      }) && onSubmit(values);

      setValues("");
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
