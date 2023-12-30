import styled from "styled-components";

const CategoryBox = styled.li`
  padding: 18px 27px;
  font-size: ${({ theme: { typo } }) => {
    return typo.size.md;
  }};
  color: ${({ $isActive, theme: { colors } }) => {
    return $isActive ? colors.white : colors.gray["80"];
  }};
  background-color: ${({ $isActive, theme: { colors } }) => {
    return $isActive ? colors.gray["80"] : colors.gray["20"];
  }};
  outline: none;
  border-radius: 27px;
  cursor: pointer;
  user-select: none;
  &:hover {
    background: ${({ theme: { colors } }) => {
      return colors.gray["80"];
    }};
    color: white;
  }
`;

export default function Category({ isActive, onClick, content }) {
  return (
    <CategoryBox $isActive={isActive} onClick={onClick}>
      {content}
    </CategoryBox>
  );
}
