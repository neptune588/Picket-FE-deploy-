import styled from "styled-components";

const ContentTitle = styled.div`
  color: black;
  font-size: ${({ theme: { typo } }) => {
    return typo.size.lg;
  }};
  font-weight: ${({ theme: { typo } }) => {
    return typo.weight.bold;
  }};
  margin-bottom: 15px;
`;

const ContentText = styled.textarea`
  width: 575px;
  height: 150px;
  bottom: 0;
  padding: 15px;
  font-size: ${({ theme: { typo } }) => {
    return typo.size.md;
  }};
  background: white;
  border: 1px solid
    ${({ theme: { colors } }) => {
      return colors.gray["40"];
    }};
  border-radius: 15px;
  resize: none;
`;

export default function Content({ context, updateContext }) {
  return (
    <>
      <ContentTitle>설명</ContentTitle>
      <ContentText
        maxLength={100}
        placeholder="내용을 입력하세요"
        value={context.content}
        onChange={(e) => {
          updateContext("content", e.target.value);
        }}
      />
    </>
  );
}
