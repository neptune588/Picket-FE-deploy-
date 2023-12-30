import styled from "styled-components";

const Container = styled.ul`
  display: flex;
  > li {
    margin-right: 40px;
    margin-top: 40px;
    &:nth-child(4n) {
      margin-right: 0px;
    }
  }
  flex-wrap: wrap;
  padding-bottom: 40px;
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
