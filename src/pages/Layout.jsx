import { Outlet } from "react-router-dom";

import styled from "styled-components";
import NavBar from "../components/Navbar/Navbar";

const CenterdContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;
export default function LayOut() {
  return (
    <>
      <NavBar />
      <CenterdContainer>
        <Outlet />
      </CenterdContainer>
    </>
    
  );
}
