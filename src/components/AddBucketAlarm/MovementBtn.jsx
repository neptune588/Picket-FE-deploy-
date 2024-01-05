import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ButtonBox = styled.div`
  width: 395px;
  margin-left: auto;
  background: white;
`;

const PrevBtn = styled.button`
  width: 190px;
  height: 60px;
  padding: 10px;
  background: white;
  color: black;
  text-align: center;
  border: 1px solid
    ${({ theme: { colors } }) => {
      return colors.secondary;
    }};
  border-radius: 1em;
  margin-right: 15px;
`;

const NextBtn = styled.button`
  width: 190px;
  height: 60px;
  padding: 10px;
  background: ${({ theme: { colors } }) => {
    return colors.primary;
  }};
  color: white;
  text-align: center;
  border: none;
  border-radius: 1em;
`;

export default function MovementBtn({ setDetailToAlarm }) {
  const navigate = useNavigate();
  const callback = () => {
    navigate("/");
  };

  return (
    <ButtonBox>
      <PrevBtn
        onClick={() => {
          setDetailToAlarm(false);
        }}
      >
        이전
      </PrevBtn>
      <NextBtn>완료</NextBtn>
      {/* <NextBtn onClick={()=>{submitHandler(callback)}}>완료</NextBtn> */}
    </ButtonBox>
  );
}
