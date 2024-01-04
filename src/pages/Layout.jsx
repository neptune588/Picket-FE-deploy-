import { useEffect } from "react";

import { useLocation, Outlet } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  setSearchModal,
  setBrowseDetailBucketModal,
} from "@/store/modalsSlice";
import {
  setKeywordParams,
  setPrevParams,
  setTotalParams,
} from "@/store/parameterSlice";

import styled from "styled-components";
import NavBar from "@/components/NavBar";

const CenterdContainer = styled.div`
  width: 1440px;
  height: ${({ $isSearchModal, $isBrowseDetailModal }) => {
    return ($isSearchModal || $isBrowseDetailModal) && "calc(100vh - 70px)";
  }};
  overflow: ${({ $isSearchModal, $isBrowseDetailModal }) => {
    return $isSearchModal || $isBrowseDetailModal ? "hidden" : "visible";
  }};
  padding: 0px 80px;
  margin: 0 auto;
`;

export default function LayOut() {
  const dispatch = useDispatch();
  const modals = useSelector((state) => {
    return state.modals;
  });
  const { searchModal, browseDetailModal } = modals;
  const location = useLocation();

  useEffect(() => {
    searchModal && dispatch(setSearchModal());
    browseDetailModal && dispatch(setBrowseDetailBucketModal());
    if (!location.pathname.split("/").includes("search")) {
      dispatch(setKeywordParams(["", ""]));
      dispatch(setTotalParams());
      dispatch(setPrevParams());
    }
  }, [location]);

  return (
    <>
      <NavBar />
      <CenterdContainer
        $isSearchModal={searchModal}
        $isBrowseDetailModal={browseDetailModal}
      >
        <Outlet />
      </CenterdContainer>
    </>
  );
}
7;
