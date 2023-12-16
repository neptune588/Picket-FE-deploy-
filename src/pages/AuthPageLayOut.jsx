import { Outlet } from "react-router-dom";
import styled from "styled-components";

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
    <CenterdContaier>
      <Outlet />
    </CenterdContaier>
  );
}
