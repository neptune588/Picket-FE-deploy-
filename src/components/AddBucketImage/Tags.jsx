import { useState } from "react";
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
    background: ${({ $isCliked, theme: { colors } }) => {
        return $isCliked ? colors.gray["80"] : colors.gray["20"];
    }};
    color: ${({ $isCliked, theme: { colors } }) => {
        return $isCliked ? colors.white : colors.gray["80"];
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
    const [selectedTags, setSelectedTags] = useState({});

    const handleClick = (tag) => {
        setSelectedTags(prevTags => ({
            ...prevTags,
            [tag]: !prevTags[tag],
        }));
    };

    return (
        <>
            <TagTitle>태그</TagTitle>
            <TagBox>
                <TagStyle $isCliked={selectedTags['일상']} onClick={() => handleClick('일상')}>일상</TagStyle>
                <TagStyle $isCliked={selectedTags['여행']} onClick={() => handleClick('여행')}>여행</TagStyle>
                <TagStyle $isCliked={selectedTags['건강']} onClick={() => handleClick('건강')}>건강</TagStyle>
                <TagStyle $isCliked={selectedTags['자기계발']} onClick={() => handleClick('자기계발')}>자기계발</TagStyle>
                <TagStyle $isCliked={selectedTags['가족']} onClick={() => handleClick('가족')}>가족</TagStyle>
                <TagStyle $isCliked={selectedTags['커플']} onClick={() => handleClick('커플')}>커플</TagStyle>
            </TagBox>
        </>
    )
};
