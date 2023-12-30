import { useEffect } from "react";

import { useLocation, Outlet } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setBoolean } from "@/store/searchModalSlice";

import styled from "styled-components";
import NavBar from "@/components/NavBar";

const CenterdContainer = styled.div`
  width: 1440px;
  height: ${({ $isSearchModal }) => {
    return $isSearchModal && "calc(100vh - 70px)";
  }};
  overflow: ${({ $isSearchModal }) => {
    return $isSearchModal ? "hidden" : "visible";
  }};
  padding: 0px 80px;
  margin: 0 auto;
`;

export default function LayOut() {
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
      <NavBar />
      <CenterdContainer $isSearchModal={searchModalState}>
        <Outlet />
      </CenterdContainer>
    </>
  );
}
7;
