import { useState } from "react";

import styled from "styled-components";

import MyDropzone from "../UploadBox/UploadBox";
import AlarmBox from "../AddBucketAlarm/AlarmBox";
import DetailBox from "./DetailBox";
import NextButton from "./NextBtn";
import MovementBtn from "../AddBucketAlarm/MovementBtn";

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

    return (
        <Container>
            <AddImageWrapper>
                <MyDropzone />
                {DetailToAlarm ? <AlarmBox />:<DetailBox />
                }
            </AddImageWrapper>
            {DetailToAlarm? <MovementBtn setDetailToAlarm={setDetailToAlarm}/> : <NextButton onClick={()=>{setDetailToAlarm(true)}} />}
        </Container>
    )
};