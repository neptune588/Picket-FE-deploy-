import styled from "styled-components";

const Container = styled.div`
  width: 80%;
  height: 80%;
  margin: 0 auto;
  display: flex;
  background: white;
  border-radius: 2em;
`;


const ImgBox = styled.img`
  width: 50%;
  max-height: 100%;
  overflow: hidden;
  margin: 0px;
  display: block;
  justify-content:center;
  border-top-left-radius: 2em;
  border-bottom-left-radius: 2em;
`;

const Wrapper = styled.div`
  width: 50%;
  max-height: 100%;
  padding: 0px 2em;
  position: relative;
`;

const WriterBox = styled.div`
  display: flex;
  > span {
    font-size: 12pt;
    height: 30px;
    justify-content: center;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  > span {
      margin-right: 10px;
  }
`;

const ReplyBox = styled.div`
  display: flex;
  align-items: center;
`;

export { Container, ImgBox, Wrapper, WriterBox, ButtonBox, ReplyBox };