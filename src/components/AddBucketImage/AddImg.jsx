import { useState } from "react";

import styled from "styled-components";

import MyDropzone from "../UploadBox/UploadBox";
import AlarmBox from "../AddBucketAlarm/AlarmBox";
import DetailBox from "./DetailBox";
import NextButton from "./NextBtn";
import MovementBtn from "../AddBucketAlarm/MovementBtn";
import { postData } from "@/services/api";
import axios from "axios";

const Container = styled.div`
    margin: 0 auto;
`;

const AddImageWrapper = styled.div`
    display: flex;
    margin: 0 auto;
    padding: 20px;
`;

export default function AddImg(){
    const [DetailToAlarm, setDetailToAlarm] = useState(false);

    const [file, setFile] = useState("");
    const [context, setContext] = useState({
          title: "",
          content: "",
          deadline: new Date(),
          categoryList: []
    });
    
    const convertDateToString = (dateData) => {
        let today = dateData;
        let year = today.getFullYear();
        let month = String(today.getMonth() + 1).padStart(2, '0'); 
        let day = String(today.getDate()).padStart(2, '0');
        let formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

    const updateContext = (key, value) => {
        setContext(prev => ({ ...prev, [key]: value }));
    }

    const submitHandler = async(callback) => {
        event.preventDefault();

        let random = JSON.parse(localStorage.getItem("userInfo"));
        const { grantType, accessToken } = random;
        const token = `Bearer ${accessToken}`

        const formData = new FormData();

        const sendData = {
                ...context,
                deadline: convertDateToString(context.deadline),
                categoryList: Object.keys(context.categoryList).map(d => Number(d)),
        }

        formData.append("postBoardRequestDTO", new Blob([JSON.stringify(sendData)], {
            type: 'application/json'
        }));
        
        formData.append("file", file);

        const response = await postData("/board", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': `${token}`,
            }
        });

        console.log(response);
        if(callback) {
            callback();
        }
    }
    
    return (
        <Container>
            <form onSubmit={submitHandler}>
            <AddImageWrapper>
                <MyDropzone context={file} updateContextFile={setFile} />
                {
                    DetailToAlarm ? 
                    <AlarmBox context={context} updateContext={updateContext} />:
                    <DetailBox context={context} updateContext={updateContext} />
                }
            </AddImageWrapper>
            {DetailToAlarm? 
            <MovementBtn 
                setDetailToAlarm={setDetailToAlarm}
            /> : <NextButton onClick={()=>{setDetailToAlarm(true)}} />}
            </form>
        </Container>
    )
};