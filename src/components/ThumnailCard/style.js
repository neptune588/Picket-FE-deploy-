import styled from "styled-components";

const Container = styled.div`
  width: 290px;
  user-select: none;
`;

const ThumnailImgWrapper = styled.div`
  position: relative;
  height: 290px;
  overflow: hidden;
  border-radius: 15px;
  > p {
    position: absolute;
    left: 20px;
    bottom: 20px;
    color: white;
    font-size: ${({ theme: { typo } }) => {
      return typo.size.lg;
    }};
    font-weight: ${({ theme: { typo } }) => {
      return typo.weight.bold;
    }};
    z-index: 10;
  }
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
    z-index: 1;
  }
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  > span {
    &:nth-child(2) {
      margin-right: 10px;
    }
  }
`;

export { Container, ThumnailImgWrapper, ProfileWrapper, ButtonBox };
