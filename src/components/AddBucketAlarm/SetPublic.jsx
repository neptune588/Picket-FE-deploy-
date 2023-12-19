import styled from "styled-components";

const SetPublicTitle = styled.div`
    margin-top: 20px;
    color: black;
    font-size: ${({ theme: { typo } }) => {
        return typo.size.xl
    }};
    font-weight: bold;
`;

const SetPublicBtn = styled.input`
    width: 400px;
    height: 40px;
    margin: 10px 0px;
    padding: 15px;
    font-size: ${({ theme: { typo } }) => {
        return typo.size.md
    }};
    border: 1px solid  ${({ theme: { colors } }) => {
        return colors.gray["40"];
    }};;
    border-radius: 1em;
`;

export default function SetPublic(){
    return (
        <>
            <SetPublicTitle>공개 설정</SetPublicTitle>
            <SetPublicBtn/>
        </>
    )
};
