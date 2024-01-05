import styled from "styled-components";

const ButtonBox = styled.div`
  width: 190px;
  margin-left: auto;
`;

const NextBtn = styled.button`
  width: 100%;
  height: 60px;
  padding: 10px;
  background: ${({ theme: { colors } }) => {
    return colors.primary;
  }};
  color: white;
  text-align: center;
  border: none;
  border-radius: 15px;
`;

export default function NextButton({ onClick }) {
  return (
    <ButtonBox>
      <NextBtn onClick={onClick}>다음</NextBtn>
    </ButtonBox>
  );
}
