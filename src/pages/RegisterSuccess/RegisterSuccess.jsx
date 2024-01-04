import styled from "styled-components";

import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";

import NavBar from "@/components/NavBar";
import LocationBar from "@/components/LocationBar/LocationBar";

const CenterdContainer = styled.div`
  display: flex;
  width: 400px;
  height: calc(100vh - 70px);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  input {
    user-select: none;
  }
`;

const Ment = styled.p`
  font-size: ${({ theme: { typo } }) => {
    return typo.size.xl;
  }};
  font-weight: ${({ theme: { typo } }) => {
    return typo.weight.bold;
  }};
`;

const MoveButton = styled(Link)`
  display: flex;
  width: 80%;
  height: 60px;
  margin-top: 50px;
  justify-content: center;
  align-items: center;
  font-weight: ${({ theme: { typo } }) => {
    return typo.weight.bold;
  }};
  color: ${({ theme: { colors } }) => {
    return colors.white;
  }};
  background-color: ${({ theme: { colors } }) => {
    return colors.primary;
  }};
  border-radius: 20px;
`;

export default function RegisterSuccess() {
  const { message } = useParams();

  return (
    <>
      <NavBar />
      <LocationBar content={"회원가입"} />
      <CenterdContainer>
        <Ment>{message}</Ment>
        <MoveButton to="/auth/signin">로그인 페이지로</MoveButton>
      </CenterdContainer>
    </>
  );
}
