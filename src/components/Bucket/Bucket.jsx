import { useState, useEffect } from "react";

import styled from "styled-components";

import { Container, ImgBox, Wrapper, WriterBox, ButtonBox, ReplyBox } from "@/components/Bucket/style";
import LikeButton from "../LikeButton/LikeButton";
import ScrapButton from "../ScrapButton/ScrapButton";
import CardBirthView from "../CardBirthView/CardBirthView";

import ThreeDot from "@/assets/icons/threedot.svg?react";
import Reply from "@/assets/icons/reply.svg?react";

const ProfileImg = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 2em;
    margin-right: 5px;
`;

const ThreeDotIcon = styled(ThreeDot)`
    margin-left: auto;
`;

const BucketTitle = styled.div`
    margin: 10px 0px;
    font-size: 24px;
    font-weight: bold;
`;

const Content = styled.div`
    height: 60%;
    background: white;
    font-size: 12pt;
`;

const ReplyIcon = styled(Reply)`
    margin-right: 5px;
`

const ReplyBar = styled.input`
    width: 90%;
    height: 24px;
    margin: 5px 0px;
    bottom: 0;
    background: ${({ theme: { colors } }) => {
        return colors.gray["20"]
    }};
    color: ${({ theme: { colors } }) => {
        return colors.black;
    }};
    text-indent: 1em;
    font-size: 16px;
    outline: none;
    border: none;
    border-radius: 1em;
`;

export default function Bucket(){
    const [heartcount, setHeartCount] = useState(0);
    const [heartClicked, setHeartClicked] = useState(false);
    const [scrapcount, setScrapCount] = useState(0);
    const [scrapClicked, setScrapClicked] = useState(false);
    
    return (
        <Container>
            <ImgBox src="/images/test_photo.jpg" />
            <Wrapper>
                <WriterBox>
                    <ProfileImg src="/images/test_writer.jpg" />
                    <span>미도</span>
                    <ThreeDotIcon />
                </WriterBox>
                <BucketTitle>24년도 첫 사진찍기</BucketTitle>
                <CardBirthView margin={"0 0 20px"} content={"2023.12.09"} />
                <Content>
                    이번에 새로 산 필름카메라가 아직 제 기능을 다하지 못한 채 집에 박혀있다. 기왕 마련한 거 제대로 예쁜 사진을 찍으러...
                </Content>
                <ButtonBox>
                    <LikeButton
                        onClick={() => {
                        setHeartClicked((prev) => {
                            return !prev;
                        });
                        }}
                        isClicked={heartClicked}
                        width={16}
                        height={16}/>
                    <span>0</span>
                    <ScrapButton
                        onClick={() => {
                            setScrapClicked((prev) => {
                                return !prev;
                            });
                            }}
                            isClicked={scrapClicked}
                            width={16}
                            height={16}
                    />
                    <span>0</span>
                    <ReplyIcon />
                    <span>0</span>
                </ButtonBox>
                <ReplyBox>
                    <ProfileImg src="/images/test_replier.jpg" />
                    <ReplyBar placeholder="댓글 추가"/>
                </ReplyBox>
            </Wrapper>
        </Container>
            
    )
};