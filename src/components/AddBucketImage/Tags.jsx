import styled from "styled-components";

const TagTitle = styled.div`
    color: black;
    font-size: ${({ theme: { typo } }) => {
        return typo.size.xl
    }};
    font-weight: bold;
`;

const TagBox = styled.div`
    width: 400px;
    display: flex;
`
const TagStyle = styled.button`
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
`;

export default function Tags(){
    return (
        <>
            <TagTitle>태그</TagTitle>
            <TagBox>
                <TagStyle>일상</TagStyle>
                <TagStyle>여행</TagStyle>
                <TagStyle>건강</TagStyle>
                <TagStyle>자기계발</TagStyle>
                <TagStyle>가족</TagStyle>
                <TagStyle>커플</TagStyle>
            </TagBox>
        </>
    )
    
};
