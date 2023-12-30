import { useEffect } from "react";

import { useLocation, Outlet } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setBoolean } from "@/store/searchModalSlice";

export default function AuthPageLayOut() {
  const dispatch = useDispatch();
  const searchModalState = useSelector((state) => {
    return state.searchModal.currentModalState;
  });
  const location = useLocation();

  useEffect(() => {
    if (searchModalState) {
      dispatch(setBoolean());
    }
  }, [location]);

  return (
    <>
      <Outlet />
    </>
  );
}
