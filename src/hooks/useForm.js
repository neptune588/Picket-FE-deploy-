import { useEffect, useState } from "react";

export default function useForm() {
  const [values, setValues] = useState({});
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  //const handleVaildCheck = (e) => {};
  return { values, handleChange, isError };
}
