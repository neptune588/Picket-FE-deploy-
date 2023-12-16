import styled from "styled-components";

const Wrapper = styled.div`
  input[type="checkbox"]:checked + label {
    span {
      background-color: ${({ theme: { colors } }) => {
        return colors.secondary;
      }};
      border: 1px solid
        ${({ theme: { colors } }) => {
          return colors.secondary;
        }};
    }
  }
`;
const CheckInput = styled.input`
  display: none;
`;
const CheckLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  > p {
    color: ${({ theme: { colors } }) => {
      return colors.gray["60"];
    }};
    font-size: ${({ theme: { typo } }) => {
      return typo.size.md;
    }};
    font-weight: ${({ theme: { typo } }) => {
      return typo.weight.medium;
    }};
    user-select: none;
    cursor: pointer;
    margin-left: 15px;
  }
`;

const IconBox = styled.span`
  position: relative;
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 1px solid
    ${({ theme: { colors } }) => {
      return colors.gray["40"];
    }};
  border-radius: 5px;
  background-color: ${({ theme: { colors } }) => {
    return colors.white;
  }};
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 16px;
    height: 16px;
    fill: ${({ theme: { colors } }) => {
      return colors.white;
    }};
  }
`;
export { Wrapper, CheckInput, CheckLabel, IconBox };
