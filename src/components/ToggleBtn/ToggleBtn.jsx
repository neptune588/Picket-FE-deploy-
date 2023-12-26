import { useState } from "react";
import styled from "styled-components";

const ToggleBox = styled.div`
    display: flex;
    z-index: 0;
`;

const ButtonLabel = styled.label`
    width: 60px;
    height: 30px;
    position: relative;
    background: ${({ theme: { colors } }) => {
        return colors.primary;
    }};;
    border-radius: 2em;
    cursor: pointer;
    transition: 0.5s;

    &:after{
        content: '';
        width: 28px;
        height: 28px;
        margin: 1px;
        position: absolute;
        background: white;
        border-radius: 2em;
        left: 1px;
        transition: 0.5s;
    }
`;

const ToggleInput = styled.input`
    display: none;
    &: checked + ${ButtonLabel} {
        background: ${({ theme: { colors } }) => {
            return colors.gray["40"];
        }};;
    }
    &: checked + ${ButtonLabel}:after {
        left: 30px;
    }
`;

export default function ToggleBtn(){
    const [open, setOpen] = useState(true);
    const toggleHandler = ()=>{
        setOpen((prev) => !prev)
    };

    return (
        <ToggleBox>
            <ToggleInput type="checkbox" id="toggleBtn" onChange={toggleHandler} />
            <ButtonLabel htmlFor="toggleBtn" open = {open} />
        </ToggleBox>
    )
};