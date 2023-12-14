import styled from "styled-components";

const ContentBox = styled.p`
  color: ${({ $isThumnail = null, theme: { colors } }) => {
    return $isThumnail ? colors.gray["80"] : colors.gray["100"];
  }};
  line-height: 23px;
`;

export default function CardContent({ isThumnail, content }) {
  return <ContentBox $isThumnail={isThumnail}>{content}</ContentBox>;
}
