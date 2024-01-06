import { useEffect } from "react";

import { useLocation, Outlet } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setSearchModal, setDetailBucketModal } from "@/store/modalsSlice";
import { deleteThumnailCard } from "@/store/bucketThumnailSlice";
import {
  setKeywordParams,
  setPrevParams,
  setTotalParams,
} from "@/store/parameterSlice";

import useSelectorList from "@/hooks/useSelectorList";

import styled from "styled-components";
import NavBar from "@/components/NavBar";

const CenterdContainer = styled.div`
  position: relative;
  width: 1440px;
  height: ${({ $isSearchModal, $isDetailModal, $isProfileEditModal }) => {
    return (
      ($isSearchModal || $isDetailModal || $isProfileEditModal) &&
      "calc(100vh - 70px)"
    );
  }};
  overflow: ${({ $isSearchModal, $isDetailModal, $isProfileEditModal }) => {
    return $isSearchModal || $isDetailModal || $isProfileEditModal
      ? "hidden"
      : "visible";
  }};
  padding: 0px 80px;
  margin: 0 auto;
`;

export default function LayOut() {
  const { detailModal, profileEditModal, searchModal } = useSelectorList();

  const dispatch = useDispatch();

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
        $isProfileEditModal={profileEditModal}
        $isSearchModal={searchModal}
        $isDetailModal={detailModal}
      >
        <Outlet />
      </CenterdContainer>
    </>
  );
}
7;
