import { useState } from "react";

import ThumnailImg from "@/components/ThumnailImg/ThumnailImg";
import ProfileAvatar from "@/components/ProfileAvatar/ProfileAvatar";
import LikeButton from "@/components/LikeButton/LikeButton";
import ScrapButton from "@/components/ScrapButton/ScrapButton";

import {
  Container,
  ThumnailImgBox,
  ProfileWrapper,
  ButtonBox,
} from "@/components/ThumnailCard/style";

export default function ThumnailCard({ width, height }) {
  const [heartClicked, setHeartClicked] = useState(false);
  const [scrapClicked, setScrapClicked] = useState(false);

  return (
    <Container $width={width}>
      <ThumnailImgBox $height={height}>
        <ThumnailImg thumnailSrc={"/images/test_thumnail.jpg"} />
        <h2>여행의 순간들 기록하기</h2>
      </ThumnailImgBox>
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
