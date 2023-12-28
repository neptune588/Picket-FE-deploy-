import styled from "styled-components";

const Container = styled.div`
  display: flex;
  > div {
    margin-top: 40px;
  }
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SubTitle = styled.h2`
  margin: 75px 0 50px;
  font-size: ${({ theme: { typo } }) => {
    return typo.size.xl;
  }};
  font-weight: ${({ theme: { typo } }) => {
    return typo.weight.bold;
  }};
`;

export { Container, SubTitle };
