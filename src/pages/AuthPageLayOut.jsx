import { useEffect } from "react";

import { useLocation, Outlet } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setSearchModal } from "@/store/modalsSlice";
import {
  setKeywordParams,
  setPrevParams,
  setTotalParams,
} from "@/store/parameterSlice";

export default function AuthPageLayOut() {
  const dispatch = useDispatch();
  const searchModalState = useSelector((state) => {
    return state.modals.searchModal;
  });
  const location = useLocation();

  useEffect(() => {
    searchModalState && dispatch(setSearchModal());

    if (!location.pathname.split("/").includes("search")) {
      dispatch(setKeywordParams(["", ""]));
      dispatch(setTotalParams());
      dispatch(setPrevParams());
    }
  }, [location]);

  return (
    <>
      <Outlet />
    </>
  );
}
