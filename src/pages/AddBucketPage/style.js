import styled from "styled-components";
import addButton from "@/assets/icons/addbutton.svg?react";
import editImg from "@/assets/icons/editImg.svg?react";
import colordBell from "@/assets/icons/coloredbell.svg?react";

const Container = styled.div`
  display: flex;
  width: 1155px;
  margin: 0 auto;
  align-items: center;
  height: calc(100vh - 70px - 70px);
  > form {
    display: flex;
    height: 580px;
  }
`;

const ImageUploadWrapper = styled.label`
  position: relative;
  display: flex;
  width: 510px;
  height: 510px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  margin-right: 50px;
  background: ${({ theme: { colors } }) => {
    return colors.gray["20"];
  }};
  color: ${({ theme: { colors } }) => {
    return colors.gray["80"];
  }};
  border-radius: 40px;
  cursor: pointer;
  > input {
    display: none;
  }
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const GuideBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AddButtonIcon = styled(addButton)`
  display: block;
`;

const AddImgMsg = styled.p`
  margin-top: 20px;
  text-align: center;
  color: ${({ theme: { colors } }) => {
    return colors.gray["80"];
  }};
  font-size: ${({ theme: { typo } }) => {
    return typo.size.md;
  }};
  white-space: pre-line;
`;

const ContentsWrapper = styled.div`
  position: relative;
  width: 595px;
`;

const InputBox = styled.div`
  margin-bottom: 45px;
  > h2 {
    color: black;
    font-size: ${({ theme: { typo } }) => {
      return typo.size.lg;
    }};
    font-weight: ${({ theme: { typo } }) => {
      return typo.weight.bold;
    }};
    margin-bottom: 15px;
  }
  > ul {
    display: flex;
    > li {
      flex: 0 0 auto;
      margin-right: 15px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  > input {
    font-size: ${({ theme: { typo } }) => {
      return typo.size.md;
    }};
    border: 1px solid
      ${({ theme: { colors } }) => {
        return colors.gray["40"];
      }};
    &:focus {
      border: 1px solid
        ${({ theme: { colors } }) => {
          return colors.gray["100"];
        }};
    }
  }
  &:last-child {
    margin-bottom: 0;
  }
`;

const InputTextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 20px 25px;
  font-size: ${({ theme: { typo } }) => {
    return typo.size.md;
  }};
  background: white;
  border: 1px solid
    ${({ theme: { colors } }) => {
      return colors.gray["40"];
    }};
  border-radius: 15px;
  resize: none;
  outline: none;
  &:focus {
    border: 1px solid
      ${({ theme: { colors } }) => {
        return colors.gray["100"];
      }};
  }
`;

const ThumnailEditButton = styled(editImg)`
  position: absolute;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  user-select: none;
`;

const CalanderSetButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 25px;
  border-radius: 15px;
  border: 1px solid
    ${({ theme: { colors } }) => {
      return colors.gray["60"];
    }};
  cursor: pointer;
  user-select: none;
  > p {
    color: ${({ theme: { colors } }) => {
      return colors.gray["100"];
    }};
  }
`;

const ColordBell = styled(colordBell)`
  width: 25px;
  height: 25px;
`;

const buttonStyle = `
  width: 195px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border-radius: 15px;
  user-select: none;
  cursor: pointer;
`;

const NextButton = styled.div`
  ${buttonStyle}
  font-weight: ${({ theme: { typo } }) => {
    return typo.weight.bold;
  }};
  color: ${({ theme: { colors } }) => {
    return colors.white;
  }};
  background-color: ${({ theme: { colors } }) => {
    return colors.primary;
  }};

  margin-left: auto;
`;

const PrevButton = styled.div`
  ${buttonStyle}
  font-weight: ${({ theme: { typo } }) => {
    return typo.weight.bold;
  }};
  color: ${({ theme: { colors } }) => {
    return colors.gray["60"];
  }};
  border: 1px solid
    ${({ theme: { colors } }) => {
      return colors.secondary;
    }};
`;

const ButtonBox = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 400px;
  bottom: 0;
  right: 0;
`;

export {
  Container,
  ImageUploadWrapper,
  ThumnailEditButton,
  GuideBox,
  AddButtonIcon,
  AddImgMsg,
  ContentsWrapper,
  InputBox,
  InputTextArea,
  ButtonBox,
  NextButton,
  PrevButton,
  CalanderSetButton,
  ColordBell,
};
