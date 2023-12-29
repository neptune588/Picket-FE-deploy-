import styled from "styled-components";

const Container = styled.div`
  width: 290px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0px 14px 20px rgba(0, 0, 0, 0.1),
    inset 0 0 10px rgba(255, 255, 255, 0.5);
  cursor: pointer;
`;

const ContentsWrapper = styled.div`
  height: 169px;
  overflow: hidden;
  padding: 20px;
  background-color: white;
`;

const ThumnailImgBox = styled.div`
  height: 290px;
  position: relative;
`;

const Dday = styled.div`
    width: 60px;
    height: 30px;
    display: flex;
    position: absolute;
    right: 0;
    bottom: 0;
    text-align: center;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: ${({ theme: { typo } }) => {
      return typo.size.md
    }};
    border-radius: 2em;
`

export { Container, ContentsWrapper, ThumnailImgBox, Dday };
