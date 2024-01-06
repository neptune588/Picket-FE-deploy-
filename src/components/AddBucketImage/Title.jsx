import styled from "styled-components";

const Wrappar = styled.div`
  margin-bottom: 45px;
`;

const BigTitle = styled.div`
  color: black;
  font-size: ${({ theme: { typo } }) => {
    return typo.size.lg;
  }};
  font-weight: ${({ theme: { typo } }) => {
    return typo.weight.bold;
  }};
  margin-bottom: 15px;
`;

const TitleInput = styled.input`
  width: 575px;
  height: 60px;
  padding: 15px;
  font-size: ${({ theme: { typo } }) => {
    return typo.size.md;
  }};
  border: 1px solid
    ${({ theme: { colors } }) => {
      return colors.gray["40"];
    }};
  border-radius: 15px;
`;

export default function Title({ context, updateContext }) {
  return (
    <Wrappar>
      <BigTitle>제목</BigTitle>
      <TitleInput
        maxLength={25}
        placeholder="제목을 입력하세요"
        value={context.title}
        onChange={(e) => {
          updateContext("title", e.target.value);
        }}
      ></TitleInput>
    </Wrappar>
  );
}
