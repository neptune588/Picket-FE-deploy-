import { useNavigate } from "react-router-dom";
import styled from "styled-components"

const ButtonBox = styled.div`
    bottom: 0;
    padding-right: 30px;
    float: right;
    background: white;
`;

const PrevBtn = styled.button`
    width: 120px;
    height: 50px;
    margin: 10px;
    padding: 10px;
    background: white;
    color: black;
    text-align: center;
    border: 1px solid ${({ theme: { colors } }) => {
        return colors.primary
    }};
    border-radius: 1em;
`;

const NextBtn = styled.button`
    width: 120px;
    height: 50px;
    margin: 10px;
    padding: 10px;
    background: ${({ theme: { colors } }) => {
        return colors.primary
    }};
    color: white;
    text-align: center;
    border: none;
    border-radius: 1em;
`;

export default function MovementBtn(){
    const navigate = useNavigate();
    return (
        <ButtonBox>
            <PrevBtn onClick={()=>{navigate(-1)}}>이전</PrevBtn>
<<<<<<< HEAD
            <NextBtn>완료</NextBtn>
=======
            <NextBtn onClick={()=>{navigate(`/mybucket`)}}>완료</NextBtn>
>>>>>>> fdeef096d1790f0eeac7f3e333fa89fa31fe236e
        </ButtonBox>
    )
};