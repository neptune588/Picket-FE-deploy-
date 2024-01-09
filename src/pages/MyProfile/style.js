import styled from "styled-components";
import editImg from "@/assets/icons/editImg.svg?react";
import editProfileButton from "@/assets/icons/editProfileButton.svg?react";

const Container = styled.div`
  height: calc(100vh - 70px);
`;

const ProfileViewBox = styled.section`
  padding-top: 70px;
  > div {
    &:first-child {
      width: 150px;
      height: 150px;
      margin: 0 auto;
      overflow: hidden;
      margin-bottom: 35px;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  > div {
    &:last-child {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    > h2 {
      text-align: center;
      font-size: ${({ theme: { typo } }) => {
        return typo.size.xl;
      }};
      font-weight: ${({ theme: { typo } }) => {
        return typo.weight.bold;
      }};
      margin-right: 10px;
    }
  }
`;

const EditProfileButton = styled(editProfileButton)`
  width: 20px;
  height: 20px;
  cursor: pointer;
  user-select: none;
`;

const EditModalOuter = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 99999;
`;

const EditModal = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 480px;
  height: 500px;
  padding: 50px 40px 40px 40px;
  border-radius: 30px;
  background-color: ${({ theme: { colors } }) => {
    return colors.white;
  }};

  > h2 {
    font-size: ${({ theme: { typo } }) => {
      return typo.size.xl;
    }};
    font-weight: ${({ theme: { typo } }) => {
      return typo.weight.bold;
    }};
    margin-bottom: 25px;
  }

  z-index: 1;
`;

const DoubleCheckButton = styled.button`
  width: 110px;
  height: 60px;
  font-weight: ${({ theme: { typo } }) => {
    return typo.weight.bold;
  }};
  color: ${({ theme: { colors } }) => {
    return colors.white;
  }};
  background-color: ${({ theme: { colors } }) => {
    return colors.primary;
  }};
  border-radius: 15px;
  margin-left: 15px;
`;

const UpLoadBox = styled.div`
  position: relative;
  width: 150px;
  margin: 0 auto 25px;
  label {
    display: block;
    height: 150px;
    background-color: ${({ theme: { colors } }) => {
      return colors.primary;
    }};
    border-radius: 50%;
    cursor: pointer;
    overflow: hidden;
    > input {
      display: none;
    }
    > img {
      width: 100%;
      height: 150px;
      object-fit: cover;
    }
  }
`;

const InputBox = styled.div`
  height: 85px;
  margin-bottom: 45px;
  > p {
    color: ${({ theme: { colors } }) => {
      return colors.gray["60"];
    }};
    font-weight: ${({ theme: { typo } }) => {
      return typo.weight.medium;
    }};
    margin-top: 10px;
    text-align: right;
  }
`;

const ButtonBox = styled.div`
  display: flex;
`;

const ProfileEditCansleButton = styled.div`
  width: 190px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  border: 1px solid
    ${({ theme: { colors } }) => {
      return colors.primary;
    }};
  color: ${({ theme: { colors } }) => {
    return colors.gray["60"];
  }};
  margin-right: 15px;
  border-radius: 15px;
  user-select: none;
  cursor: pointer;
`;
const ProfileImgUploadButton = styled(editImg)`
  position: absolute;
  right: 0px;
  bottom: 0px;
  width: 50px;
  height: 50px;
`;

const ModalCloseArea = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  cursor: pointer;
`;

const BucketLengthWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 640px;
  margin: 35px auto 75px;
`;

const BucketLengthBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  height: 80px;
  border-radius: 10px;
  padding: 0 30px;
  background-color: ${({ theme: { colors } }) => {
    return colors.gray["0"];
  }};
  > span {
    font-weight: ${({ theme: { typo } }) => {
      return typo.weight.medium;
    }};
    &:first-child {
      color: ${({ theme: { colors } }) => {
        return colors.gray["60"];
      }};
    }
    &:last-child {
      font-size: ${({ theme: { typo } }) => {
        return typo.size.lg;
      }};
      font-weight: ${({ theme: { typo } }) => {
        return typo.weight.bold;
      }};
    }
  }
`;

const BucketMenuBox = styled.ul`
  display: flex;
  user-select: none;
  border-bottom: 1px solid
    ${({ theme: { colors } }) => {
      return colors.gray["40"];
    }};
`;

const ActiveMenu = styled.li`
  width: 115px;
  color: ${({ $isActiveNum, $number, theme: { colors } }) => {
    return $isActiveNum === $number ? colors.gray["100"] : colors.gray["60"];
  }};
  font-weight: ${({ theme: { typo } }) => {
    return typo.weight.bold;
  }};
  border-bottom: ${({ $isActiveNum, $number, theme: { colors } }) => {
    return $isActiveNum === $number
      ? `1px solid ${colors.gray["100"]}`
      : "none";
  }};
  margin-bottom: -1px;
  padding: 15px 0px;
  text-align: center;
  cursor: pointer;
`;

const CardWrppar = styled.ul`
  display: flex;
  > li {
    margin-right: 40px;
    margin-top: 60px;
    &:nth-child(4n) {
      margin-right: 0px;
    }
  }
  flex-wrap: wrap;
  padding-bottom: 40px;
`;

const ContentsNotBox = styled.div`
  display: flex;
  margin-top: 80px;
  justify-content: center;
  align-items: center;
  > p {
    color: ${({ theme: { colors } }) => {
      return colors.gray["40"];
    }};
    font-weight: ${({ theme: { typo } }) => {
      return typo.weight.bold;
    }};
  }
`;

export {
  Container,
  ProfileViewBox,
  EditProfileButton,
  EditModalOuter,
  EditModal,
  InputBox,
  ButtonBox,
  DoubleCheckButton,
  ProfileEditCansleButton,
  UpLoadBox,
  ProfileImgUploadButton,
  ModalCloseArea,
  BucketLengthWrapper,
  BucketLengthBox,
  BucketMenuBox,
  ActiveMenu,
  ContentsNotBox,
  CardWrppar,
};
