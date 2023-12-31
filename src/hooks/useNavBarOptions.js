import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

export default function useNavBarOptions() {
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userNickName, setUserNickName] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const OnClickDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const loginCheck = () => {
    const condition = localStorage.getItem("userNickname");
    if (condition) {
      setUserNickName(JSON.parse(condition));
    }
  };

  const handleSignOut = () => {
    //일단은 로컬스토리지에서 지우는걸로 간단설정 보안을 생각하면 보완필요
    localStorage.removeItem("userAccessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userNickname");

    setUserNickName("");
  };

  const handleNavigate = (params) => {
    return () => {
      navigate(params);
    };
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      searchValue === "" ||
      searchValue === undefined ||
      searchValue === null
    ) {
      return;
    } else {
      if (submitLoading) {
        return;
      }
      setSubmitLoading(true);
    }
  };

  useEffect(() => {
    loginCheck();
  }, []);

  return {
    searchValue,
    dropdownOpen,
    userNickName,
    handleChange,
    handleSignOut,
    handleNavigate,
    OnClickDropdown,
  };
}
