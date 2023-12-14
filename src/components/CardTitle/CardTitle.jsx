import styled from "styled-components";

const TitleBox = styled.h2`
  color: ${({ theme: { colors } }) => {
    return colors.black;
  }};
  font-size: ${({ $isThumnail = null, theme: { typo } }) => {
    return $isThumnail ? typo.size.lg : typo.size.xl;
  }};
  font-weight: ${({ theme: { typo } }) => {
    return typo.weight.bold;
  }};
  margin: ${({ $margin }) => {
    return $margin;
  }};
`;

export default function CardTitle({ isThumnail, content, margin }) {
  return (
    <TitleBox $isThumnail={isThumnail} $margin={margin}>
      {content}
    </TitleBox>
  );
}
