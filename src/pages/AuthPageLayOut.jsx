import { useEffect } from "react";

import { useLocation, Outlet } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteThumnailCard } from "@/store/bucketThumnailSlice";
import { setSearchModal, setDetailBucketModal } from "@/store/modalsSlice";
import {
  setKeywordParams,
  setPrevParams,
  setTotalParams,
} from "@/store/parameterSlice";

export default function AuthPageLayOut() {
  const dispatch = useDispatch();

  const modals = useSelector((state) => {
    return state.modals;
  });
  const { searchModal, detailModal } = modals;
  const location = useLocation();

  useEffect(() => {
    searchModal && dispatch(setSearchModal());
    detailModal && dispatch(setDetailBucketModal());

    if (!location.pathname.split("/").includes("search")) {
      dispatch(setKeywordParams(["", ""]));
      dispatch(setTotalParams());
      dispatch(setPrevParams());
      dispatch(deleteThumnailCard());
    }
  }, [location]);

  return (
    <>
      <Outlet />
    </>
  );
}
