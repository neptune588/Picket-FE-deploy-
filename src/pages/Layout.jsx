import { Outlet } from "react-router-dom";

import { useSelector } from "react-redux";

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
  const searchModalState = useSelector((state) => {
    return state.searchModal.currentModalState;
  });

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
