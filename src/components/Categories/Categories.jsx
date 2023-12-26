import { useState } from "react";

import { useNavigate, NavLink } from "react-router-dom";

import styled from "styled-components";

import { categoriesData } from "@/components/Categories/data";
// useNavigate를 사용하여 카테고리 버튼 클릭할 경우 카테고리 페이지로 이동하도록 했습니다.
// 다만 카테고리 코드가 필요하여,
// 백엔드에게 api 추가 요청해야합니다.
// [전체: 코드없음, 일상: everyday, 여행: travel, 건강:health, 자기계발:improvement, 가족: family, 커플: couple]

const CategoriesBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 680px;
  margin: 0px 20px;
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

export default function Categories({ cateCode }) {
  const nav = useNavigate();

  const [activeCategory, setActiveCategory] = useState(0);
  const OnClickCate = () => {
    nav(`/cate=${cateCode}`);
  };
  return (
    <CategoriesBox onClick={OnClickCate}>
      {categoriesData.map((data, idx) => {
        return (
          <CateStyle
            key={data.id}
            to={data.query}
            $activeNumber={idx}
            $isActive={activeCategory}
            onClick={() => {
              setActiveCategory(idx);
            }}
          >
            {data.content}
          </CateStyle>
        );
      })}
    </CategoriesBox>
  );
}
