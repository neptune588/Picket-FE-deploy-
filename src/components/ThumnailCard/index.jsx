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

export default function ThumnailCard({
  width,
  height,
  title,
  avatarSrc = "/images/test_avatar.jpg",
  nickname = "빈값",
  thumnailSrc = "/images/test_thumnail.jpg",
  likeCount,
  scrapCount,
  handledetailView,
  handleHeartClick,
  handleScrapClick,
}) {
  return (
    <Container $width={width}>
      <ThumnailImgBox $height={height} onClick={handledetailView}>
        <ThumnailImg thumnailSrc={thumnailSrc} />
        <h2>{title}</h2>
      </ThumnailImgBox>
      <ProfileWrapper>
        <ProfileAvatar nickname={nickname} avatarSrc={avatarSrc} />
        <ButtonBox>
          <LikeButton
            handleHeartClick={handleHeartClick}
            width={16}
            height={16}
          />
          <span>{likeCount}</span>
          <ScrapButton
            handleScrapClick={handleScrapClick}
            width={18}
            height={18}
          />
          <span>{scrapCount}</span>
        </ButtonBox>
      </ProfileWrapper>
    </Container>
  );
}
