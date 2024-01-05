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
import {
  setTotalHomeParams,
  setPrevHomeParams,
} from "@/store/homeParameterSlice";

import styled from "styled-components";
import NavBar from "@/components/NavBar";

const CenterdContainer = styled.div`
  position: relative;
  width: 1440px;
  height: ${({ $isSearchModal, $isDetailModal }) => {
    return ($isSearchModal || $isDetailModal) && "calc(100vh - 70px)";
  }};
  overflow: ${({ $isSearchModal, $isDetailModal }) => {
    return $isSearchModal || $isDetailModal ? "hidden" : "visible";
  }};
  padding: 0px 80px;
  margin: 0 auto;
`;

export default function LayOut() {
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
      <NavBar />
      <CenterdContainer
        $isSearchModal={searchModal}
        $isDetailModal={detailModal}
      >
        <Outlet />
      </CenterdContainer>
    </>
  );
}
7;
