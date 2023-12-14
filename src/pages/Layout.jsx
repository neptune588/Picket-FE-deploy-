import { Outlet } from "react-router-dom";

import styled from "styled-components";

const CenterdContainer = styled.div`
  width: 1440px;
  margin: 0 auto;
`;
export default function LayOut() {
  return (
    <CenterdContainer>
      <Outlet />
    </CenterdContainer>
  );
}
