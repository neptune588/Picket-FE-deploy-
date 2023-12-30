import { useState } from "react";

import { useNavigate, NavLink } from "react-router-dom";

import styled from "styled-components";

import { categoriesData } from "@/components/Categories/data";

const CategoriesBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 680px;
`;

const CateStyle = styled(NavLink)`
  padding: 18px 27px;
  font-size: ${({ theme: { typo } }) => {
    return typo.size.md;
  }};
  color: ${({ $isActive, $activeNumber, theme: { colors } }) => {
    return $isActive === $activeNumber ? colors.white : colors.gray["80"];
  }};
  background-color: ${({ $isActive, $activeNumber, theme: { colors } }) => {
    return $isActive === $activeNumber ? colors.gray["80"] : colors.gray["20"];
  }};
  outline: none;
  border-radius: 27px;
  cursor: pointer;

  &:hover {
    background: ${({ theme: { colors } }) => {
      return colors.gray["80"];
    }};
    color: white;
  }
`;

export default function Categories() {
  const navigation = useNavigate();

  const [activeCategory, setActiveCategory] = useState(1);

  return (
    <CategoriesBox>
      {categoriesData.map((data) => {
        return (
          <CateStyle
            key={data.id}
            $activeNumber={data.query}
            $isActive={activeCategory}
            onClick={() => {
              setActiveCategory(data.query);
            }}
          >
            {data.content}
          </CateStyle>
        );
      })}
    </CategoriesBox>
  );
}
