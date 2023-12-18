import { Outlet } from "react-router-dom";

import styled from "styled-components";

import NavBar from "@/components/NavBar/NavBar";

const CenterdContaier = styled.div`
  display: flex;
  width: 400px;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  input {
    user-select: none;
  }
`;
export default function AuthPageLayOut() {
  return (
    <>
      <NavBar />
      <CenterdContaier>
        <Outlet />
      </CenterdContaier>
    </>
  );
}
