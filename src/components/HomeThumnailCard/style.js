import styled from "styled-components";

const Container = styled.div`
  width: 290px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0px 14px 20px rgba(0, 0, 0, 0.1),
    inset 0 0 10px rgba(255, 255, 255, 0.5);
`;

const ContentsWrapper = styled.div`
  height: 169px;
  overflow: hidden;
  padding: 20px;
  background-color: white;
`;

const ThumnailImgBox = styled.div`
  height: 290px;
`;

export { Container, ContentsWrapper, ThumnailImgBox };
