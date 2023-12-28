import styled from "styled-components";

const CenterdContainer = styled.div`
  display: flex;
  width: 400px;
  height: calc(100vh - 140px);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  input {
    user-select: none;
  }
`;

const InputBox = styled.div`
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0px;
  }

  > p {
    color: ${({ theme: { colors } }) => {
      return colors.inVaild;
    }};
    font-weight: ${({ theme: { typo } }) => {
      return typo.weight.medium;
    }};
    margin-top: 10px;
    text-align: left;
  }
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

const TotalErrorMsg = styled.p`
  color: ${({ theme: { colors } }) => {
    return colors.inVaild;
  }};
  text-align: center;
  font-weight: ${({ theme: { typo } }) => {
    return typo.weight.medium;
  }};
  margin-top: 10px;
`;

const SocialLogin = styled.button`
  width: 400px;
  height: 60px;
  border: 1px solid
    ${({ theme: { colors } }) => {
      return colors.primary;
    }};
  color: ${({ theme: { colors } }) => {
    return colors.gray["60"];
  }};
  font-weight: ${({ theme: { typo } }) => {
    return typo.weight.bold;
  }};
  border-radius: 15px;
  user-select: none;
`;

const UserAuthBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 35px;
  p {
    cursor: pointer;
    &:first-child {
      color: ${({ theme: { colors } }) => {
        return colors.primary;
      }};
      font-weight: ${({ theme: { typo } }) => {
        return typo.weight.bold;
      }};
    }
  }
`;
export {
  CenterdContainer,
  Title,
  InputBox,
  TotalErrorMsg,
  SocialLogin,
  UserAuthBox,
};
