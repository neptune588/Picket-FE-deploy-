import styled from "styled-components";

import Tags from "./Tags";
import Title from "./Title";
import Content from "./Content";
import NextButton from "./NextBtn";
import MyDropzone from "../UploadBox/UploadBox";

const Container = styled.div`
    margin: 0 auto;
`;

const AddImageWrapper = styled.div`
    display: flex;
    margin: 0 auto;
    padding: 20px;
`;

const DetailBox = styled.div`
    width: 400px;
    height: 400px;
    margin: 20px;
    background: white;
    color: ${({ theme: { colors } }) => {
        return colors.gray["80"]
    }};
`;

export default function AddImg(){
    return (
        <Container>
            <AddImageWrapper>
                <MyDropzone />
                <DetailBox>
                    <Tags />
                    <Title />
                    <Content />
                </DetailBox>
            </AddImageWrapper>
            <NextButton onClick={()=>{setImgToAlarm(true)}} />
        </Container>
    )
};