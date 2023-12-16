import styled from "styled-components";

const Container = styled.div`
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
const InputBox = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

const Title = styled.h2`
  font-size: ${({ theme: { typo } }) => {
    return typo.size.xl;
  }};
  font-weight: ${({ theme: { typo } }) => {
    return typo.weight.bold;
  }};
  margin-bottom: 75px;
  user-select: none;
`;

const InputCheckWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0 30px;
`;

const DoubleCheckButton = styled.button`
  width: 110px;
  height: 60px;
  color: ${({ theme: { colors } }) => {
    return colors.white;
  }};
  background-color: ${({ theme: { colors } }) => {
    return colors.primary;
  }};
  border-radius: 15px;
  margin-left: 15px;
`;

const NextButton = styled.button`
  width: 400px;
  height: 60px;
  color: ${({ theme: { colors } }) => {
    return colors.white;
  }};
  font-weight: ${({ theme: { typo } }) => {
    return typo.weight.bold;
  }};
  background-color: ${({ theme: { colors } }) => {
    return colors.primary;
  }};
  border-radius: 15px;
  user-select: none;
`;
export {
  Container,
  InputBox,
  Title,
  InputCheckWrapper,
  DoubleCheckButton,
  NextButton,
};
