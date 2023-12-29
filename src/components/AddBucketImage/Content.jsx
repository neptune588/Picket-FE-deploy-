import styled from "styled-components"

const ContentTitle = styled.div`
    margin-top: 20px;
    color: black;
    font-size: ${({ theme: { typo } }) => {
        return typo.size.xl
    }};
    font-weight: bold;
`;

const ContentText = styled.textarea`
    width: 400px;
    height: 160px;
    margin: 10px 0px 0px 0px;
    bottom: 0;
    padding: 15px;
    font-size: ${({ theme: { typo } }) => {
        return typo.size.md
    }};
    background: white;
    border: 1px solid  ${({ theme: { colors } }) => {
        return colors.gray["40"];
    }};;
    border-radius: 1em;
    resize: none;
`;

export default function Content({ context, updateContext }){
    return (
        <>
            <ContentTitle>설명</ContentTitle>
            <ContentText 
                placeholder="내용을 입력하세요" 
                value={context.content} 
                onChange={(e) => { updateContext("content", e.target.value) }}
            />
        </>
    )
};
