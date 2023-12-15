import styled from "styled-components";

// 카테고리 변경을 한다면 url이 ?cate=family 등으로 변경되는지 의문.
// 만약 변경된다면 NavLink를 사용하여 링크에 알맞은 스타일을 적용하는 게 좋다고 생각합니다.
// https://velog.io/@jm1225/styled-components-NavLink-active-styled-input

const CategoriesBtn = styled.button`
    width: 60px;
    height: 40px;
    margin: 4px;
    background: ${({ theme: { colors } }) => {
        return colors.gray["20"]
    }};
    color: ${({ theme: { colors } }) => {
        return colors.gray["80"]
    }};
    border-radius: 2em;
    cursor: pointer;
    &:hover {
        background: ${({ theme: { colors } }) => {
            return colors.gray["80"]
        }};
        color: white;
    }
`;

const WholeBtn = styled(CategoriesBtn)``;

const EverydayBtn = styled(CategoriesBtn)``;

const TravelBtn = styled(CategoriesBtn)``;

const HealthBtn = styled(CategoriesBtn)``;

const FamilyBtn = styled(CategoriesBtn)``;

const ImprovementBtn = styled(CategoriesBtn)``;

const CoupleBtn = styled(CategoriesBtn)``;


export default function Categories() {
    return (
        <div>
            <WholeBtn>전체</WholeBtn>
            <EverydayBtn>일상</EverydayBtn>
            <TravelBtn>여행</TravelBtn>
            <HealthBtn>건강</HealthBtn>
            <ImprovementBtn>자기계발</ImprovementBtn>
            <FamilyBtn>가족</FamilyBtn>
            <CoupleBtn>커플</CoupleBtn>
        </div>
    )
};