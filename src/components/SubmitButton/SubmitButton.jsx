import styled from "styled-components";

const Submit = styled.input`
  width: ${({ $width }) => {
    return $width;
  }};
  height: 60px;
  color: ${({ theme: { colors } }) => {
    return colors.white;
  }};
  font-size: ${({ theme: { typo } }) => {
    return typo.size.md;
  }};
  font-weight: ${({ theme: { typo } }) => {
    return typo.weight.bold;
  }};
  background-color: ${({ theme: { colors } }) => {
    return colors.primary;
  }};
  border: none;
  border-radius: 15px;
  user-select: none;
  cursor: pointer;
`;

export default function SubmitButton({ width, value }) {
  return <Submit $width={width} type="submit" value={value} />;
}
