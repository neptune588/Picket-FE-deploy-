import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AddButton from "@/assets/icons/addbutton.svg?react";

const AddBucketIcon = styled(AddButton)`
    width: 40%;
    height: 40%;
    margin-left: auto;
    cursor: pointer;
`;

export default function AddBucket(){
    const nav = useNavigate();
    const OnClickAdd = ()=>{
        nav(`/add`)
    };

    return (
        <AddBucketIcon onClick={OnClickAdd}/>
    )
};