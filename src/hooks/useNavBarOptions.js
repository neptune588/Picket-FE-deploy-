import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setBoolean } from "@/store/searchModalSlice";
import {
  setTotalParams,
  setPageParams,
  setCategoryListParams,
  setLastBoardParams,
  setKewordParams,
} from "@/store/parameterSlice";

export default function useNavBarOptions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentModalState = useSelector((state) => {
    return state.searchModal.currentModalState;
  });
  const params = useSelector((state) => {
    return state.parameter;
  });

  let { page, categoryList, totalParams } = params;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userNickName, setUserNickName] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const OnClickDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSearchModalControl = () => {
    dispatch(setBoolean());
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

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      if (
        searchValue === "" ||
        searchValue === undefined ||
        searchValue === null
      ) {
        setKewordParams(["", ""]);
      } else {
        setKewordParams(["&keword=", searchValue]);
      }
      setTotalParams();
      navigate("/search");
    }
  };

  useEffect(() => {
    loginCheck();
  }, []);

  return {
    searchValue,
    dropdownOpen,
    userNickName,
    currentModalState,
    handleSearchModalControl,
    handleChange,
    handleSearch,
    handleSignOut,
    handleNavigate,
    OnClickDropdown,
  };
}
