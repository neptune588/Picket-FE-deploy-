//test용 컴포넌트입니다.

import styled from "styled-components";

import { useState } from "react";

import ThumnailImg from "@/components/ThumnailImg/ThumnailImg";
import LikeButton from "@/components/LikeButton/LikeButton";
import ScrapButton from "@/components/ScrapButton/ScrapButton";
import ProfileAvatar from "@/components/ProfileAvatar/ProfileAvatar";

const Container = styled.div`
  width: 290px;
  margin: 50px auto 0;
  user-select: none;
`;
const ThumnailImgWrapper = styled.div`
  position: relative;
  height: 290px;
  overflow: hidden;
  border-radius: 15px;
  > p {
    position: absolute;
    left: 20px;
    bottom: 20px;
    color: white;
    font-size: ${({ theme: { typo } }) => {
      return typo.size.lg;
    }};
    font-weight: ${({ theme: { typo } }) => {
      return typo.weight.bold;
    }};
    z-index: 10;
  }
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
    z-index: 1;
  }
`;
const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;
const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  > span {
    &:nth-child(2) {
      margin-right: 10px;
    }
  }
`;

export default function OnlyTest() {
  const [heartClicked, setHeartClicked] = useState(false);
  const [scrapClicked, setScrapClicked] = useState(false);

  return (
    <Container>
      <ThumnailImgWrapper>
        <ThumnailImg thumnailSrc={"/images/test_thumnail.jpg"} />
        <p>여행의 순간들 기록하기</p>
      </ThumnailImgWrapper>
      <ProfileWrapper>
        <ProfileAvatar
          nickName={"테스트용 아바타"}
          avatarSrc={"/images/test_avatar.jpg"}
        />
        <ButtonBox>
          <LikeButton
            onClick={() => {
              setHeartClicked((prev) => {
                return !prev;
              });
            }}
            isClicked={heartClicked}
            width={16}
            height={16}
          />
          <span>5</span>
          <ScrapButton
            onClick={() => {
              setScrapClicked((prev) => {
                return !prev;
              });
            }}
            isClicked={scrapClicked}
            width={18}
            height={18}
          />
          <span>7</span>
        </ButtonBox>
      </ProfileWrapper>
    </Container>
  );
}
