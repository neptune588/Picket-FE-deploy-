import { useEffect, useState } from "react";
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

export default function Tags({ context, updateContext }){
    const [selectedTags, setSelectedTags] = useState({ ...context.categoryList });

    const handleClick = (tag) => {
        setSelectedTags(prevTags => ({
            ...prevTags,
            [tag]: !prevTags[tag],
        }));
    };

    useEffect(() => {
        updateContext("categoryList", selectedTags)
    }, [selectedTags]);

    return (
        <>
            <TagTitle>태그</TagTitle>
            <TagBox>
            <TagStyle $isCliked={selectedTags[1]} onClick={() => handleClick(1)}>일상</TagStyle>
                <TagStyle $isCliked={selectedTags[2]} onClick={() => handleClick(2)}>여행</TagStyle>
                <TagStyle $isCliked={selectedTags[3]} onClick={() => handleClick(3)}>건강</TagStyle>
                <TagStyle $isCliked={selectedTags[4]} onClick={() => handleClick(4)}>자기계발</TagStyle>
                <TagStyle $isCliked={selectedTags[5]} onClick={() => handleClick(5)}>가족</TagStyle>
                <TagStyle $isCliked={selectedTags[6]} onClick={() => handleClick(6)}>커플</TagStyle>
            </TagBox>
        </>
    )
};
