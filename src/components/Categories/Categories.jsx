import styled from "styled-components";
import { useNavigate, NavLink } from "react-router-dom";

// useNavigate를 사용하여 카테고리 버튼 클릭할 경우 카테고리 페이지로 이동하도록 했습니다.
// 다만 카테고리 코드가 필요하여,
// 백엔드에게 api 추가 요청해야합니다.
// [전체: 코드없음, 일상: everyday, 여행: travel, 건강:health, 자기계발:improvement, 가족: family, 커플: couple]

const CategoriesBox = styled.div`
    margin: 0px 20px;
    display: flex;
`

const CateStyle = styled(NavLink)`
    width: 60px;
    height: 40px;
    margin: 4px;
    display: grid;
    place-content: center;
    text-align: center;
    font-size: ${({ theme: { typo } }) => {
        return typo.size.md
    }};
    background: ${({ theme: { colors } }) => {
        return colors.gray["20"]
    }};
    color: ${({ theme: { colors } }) => {
        return colors.gray["80"]
    }};
    outline: none;
    border-radius: 2em;
    cursor: pointer; 

    &:hover {
        background: ${({ theme: { colors } }) => {
            return colors.gray["80"]
        }};
        color: white;
    }

    &.active {
        background: ${({ theme: { colors } }) => {
            return colors.gray["80"]
        }};
        color: white;
    }
`

export default function Categories({cateCode}) {
    const nav = useNavigate();
    const OnClickCate = ()=>{
        nav(`/cate=${cateCode}`)
    }
    return (
        <CategoriesBox onClick={OnClickCate}>
            <CateStyle to="/cate">전체</CateStyle>
            <CateStyle to="/cate=everyday">일상</CateStyle>
            <CateStyle to="/cate=travel">여행</CateStyle>
            <CateStyle to="/cate=health">건강</CateStyle>
            <CateStyle to="/cate=improvement">자기계발</CateStyle>
            <CateStyle to="/cate=family">가족</CateStyle>
            <CateStyle to="/cate=couple">커플</CateStyle>
        </CategoriesBox>
    )
};