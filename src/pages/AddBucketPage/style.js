import styled from "styled-components";
import addButton from "@/assets/icons/addbutton.svg?react";

const Container = styled.div`
  display: flex;
  width: 1135px;
  margin: 0 auto;
  align-items: center;
  height: calc(100vh - 70px - 70px);
`;

const ImageUploadWrapper = styled.div`
  display: flex;
  width: 510px;
  height: 510px;
  margin-right: 50px;
  justify-content: center;
  align-items: center;
  background: ${({ theme: { colors } }) => {
    return colors.gray["20"];
  }};
  color: ${({ theme: { colors } }) => {
    return colors.gray["80"];
  }};
  border-radius: 25px;
  overflow: hidden;
`;

export { Container, ImageUploadWrapper };
