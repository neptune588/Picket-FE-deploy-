import styled from "styled-components";
import ToggleBtn from "../ToggleBtn/ToggleBtn";

const PublicBox = styled.div`
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const SetPublicTitle = styled.div`
    margin: 20px 0;
    color: black;
    font-size: ${({ theme: { typo } }) => {
        return typo.size.xl
    }};
    font-weight: bold;
`;

export default function SetPublic(){
    return (
        <PublicBox>
            <SetPublicTitle>공개 설정</SetPublicTitle>
            <ToggleBtn />
        </PublicBox>
    )
};
