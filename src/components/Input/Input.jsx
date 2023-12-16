import styled from "styled-components";

const InputBox = styled.input`
  outline: none;
  width: ${({ $width }) => {
    return $width;
  }};
  height: 60px;
  color: ${({ theme: { colors } }) => {
    return colors.gray["100"];
  }};
  padding: 20px 25px;
  border: 1px solid
    ${({ theme: { colors } }) => {
      return colors.gray["40"];
    }};
  border-radius: 15px;
  &:focus {
    border: 1px solid
      ${({ theme: { colors } }) => {
        return colors.gray["100"];
      }};
  }
`;

export default function Input({
  width,
  type,
  inputRef = null,
  placeholder,
  onChange,
}) {
  return (
    <InputBox
      $width={width}
      type={type}
      ref={inputRef || undefined}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
