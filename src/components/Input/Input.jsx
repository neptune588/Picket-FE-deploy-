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
    ${({ $vaildState, theme: { colors } }) => {
      if ($vaildState === "vaild") {
        return colors.primary;
      } else if ($vaildState === "inVaild") {
        return colors.inVaild;
      } else {
        return colors.gray["40"];
      }
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
  name,
  value = "",
  width,
  type,
  inputRef = null,
  placeholder,
  autoComplete = null,
  onChange,
  onBlur = null,
  vaildState = null,
}) {
  return (
    <InputBox
      $width={width}
      name={name}
      value={value}
      type={type}
      ref={inputRef || undefined}
      placeholder={placeholder}
      autoComplete={autoComplete || undefined}
      onChange={onChange}
      onBlur={onBlur || undefined}
      $vaildState={vaildState || undefined}
    />
  );
}
