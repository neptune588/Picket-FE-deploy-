import styled from "styled-components";

const Container = styled.div`
  width: 80%;
  height: 80%;
  margin: 0 auto;
  display: flex;
  background: white;
  border-radius: 2em;
`;

const ImgBox = styled.div`
  width: 50%;
  max-height: 100%;
  overflow: hidden;
  margin: 0px;
  display: block;
  justify-content: center;
  border-top-left-radius: 2em;
  border-bottom-left-radius: 2em;
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
    return typo.size.md;
  }};
  border-radius: 2em;
`;

const Wrapper = styled.div`
  width: 50%;
  max-height: 100%;
  padding: 0px 2em;
  position: relative;
`;

const WriterBox = styled.div`
  display: flex;
  justify-content: space-between;
  > span {
    font-size: ${({ theme: { typo } }) => {
      return typo.size.md;
    }};
    height: 30px;
    justify-content: center;
  }
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  > span {
    margin-right: 10px;
  }
`;

const ReplyBox = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0px;
`;

export {
  Container,
  ImgBox,
  Dday,
  Wrapper,
  WriterBox,
  FlexBox,
  ButtonBox,
  ReplyBox,
};
