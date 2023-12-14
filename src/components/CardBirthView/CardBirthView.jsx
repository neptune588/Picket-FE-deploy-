import styled from "styled-components";

const BirthViewBox = styled.p`
  color: ${({ theme: { colors } }) => {
    return colors.gray["80"];
  }};
  font-size: ${({ theme: { typo } }) => {
    return typo.size.sm;
  }};
  font-weight: ${({ theme: { typo } }) => {
    return typo.weight.medium;
  }};
  margin: ${({ $margin }) => {
    return $margin;
  }};
`;

export default function CardBirthView({ content, margin }) {
  return <BirthViewBox $margin={margin}>{content}</BirthViewBox>;
}
