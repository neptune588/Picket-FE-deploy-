import { useNavigate } from "react-router-dom";
import styled from "styled-components"

const ButtonBox = styled.div`
    bottom: 0;
    padding-right: 30px;
    float: right;
    background: white;
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

export default function NextButton(){
    const navigate = useNavigate();
    return (
        <ButtonBox>
            <NextBtn onClick={()=>{navigate(`/add-alarm`)}}>다음</NextBtn>
        </ButtonBox>
    )
};