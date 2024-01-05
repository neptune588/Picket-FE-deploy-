import { useEffect, useState } from "react";
import styled from "styled-components";

const TagTitle = styled.div`
  color: black;
  font-size: ${({ theme: { typo } }) => {
    return typo.size.lg;
  }};
  font-weight: ${({ theme: { typo } }) => {
    return typo.weight.bold;
  }};
  margin-bottom: 15px;
`;

const TagBox = styled.div`
  width: 575px;
  margin-bottom: 45px;
  display: flex;
`;
const TagStyle = styled.button`
  padding: 20px 25px;
  text-align: center;
  font-size: ${({ theme: { typo } }) => {
    return typo.size.md;
  }};
  background: ${({ $isCliked, theme: { colors } }) => {
    return $isCliked ? colors.gray["80"] : colors.gray["20"];
  }};
  color: ${({ $isCliked, theme: { colors } }) => {
    return $isCliked ? colors.white : colors.gray["80"];
  }};
  outline: none;
  border-radius: 30px;
  cursor: pointer;
  &:hover {
    background: ${({ theme: { colors } }) => {
      return colors.gray["80"];
    }};
    color: white;
  }
  margin-right: 15px;
  &:last-child {
    margin-right: 0;
  }
`;

export default function Tags({ context, updateContext }) {
  const [selectedTags, setSelectedTags] = useState({ ...context.categoryList });

  const handleClick = (tag) => {
    setSelectedTags((prevTags) => ({
      ...prevTags,
      [tag]: !prevTags[tag],
    }));
  };

  useEffect(() => {
    updateContext("categoryList", selectedTags);
  }, [selectedTags]);

  return (
    <>
      <TagTitle>태그</TagTitle>
      <TagBox>
        <TagStyle
          type="button"
          $isCliked={selectedTags[1]}
          onClick={() => handleClick(1)}
        >
          일상
        </TagStyle>
        <TagStyle
          type="button"
          $isCliked={selectedTags[2]}
          onClick={() => handleClick(2)}
        >
          여행
        </TagStyle>
        <TagStyle
          type="button"
          $isCliked={selectedTags[3]}
          onClick={() => handleClick(3)}
        >
          건강
        </TagStyle>
        <TagStyle
          type="button"
          $isCliked={selectedTags[4]}
          onClick={() => handleClick(4)}
        >
          자기계발
        </TagStyle>
        <TagStyle
          type="button"
          $isCliked={selectedTags[5]}
          onClick={() => handleClick(5)}
        >
          가족
        </TagStyle>
        <TagStyle
          type="button"
          $isCliked={selectedTags[6]}
          onClick={() => handleClick(6)}
        >
          커플
        </TagStyle>
      </TagBox>
    </>
  );
}
