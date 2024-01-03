import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ProfileAvatar from "@/components/ProfileAvatar/ProfileAvatar";
import LikeButton from "@/components/LikeButton/LikeButton";
import ScrapButton from "@/components/ScrapButton/ScrapButton";

import useBucketOptions from "@/hooks/useBucketOptions";

import {
  Container,
  ModalCloseArea,
  ModalCloseButton,
  BucketWrraper,
  ImgWrapper,
  TotalContentWrapper,
  ProfileBox,
  Title,
  CardCreatedDate,
  ContentBox,
  IconsBox,
  CommentListBox,
  CommentIcon,
  CommentBox,
  CommentListNot,
  CommentUserAvatar,
  SendIcon,
  TextInputArea,
  CloseButton,
  CloseCrossIcon,
} from "@/components/BucketCard/style";

export default function BucketCard({
  boardId,
  nickname,
  avatar,
  title,
  cardImg = "/images/test_thumnail.jpg",
  cardCotent = "그동안 미뤄왔던 크로키 공책을 꺼냈다. 연필도 다시 깎아 가지런히 두었다. 하루에 하나씩 만이라도 가지런히 드로잉 해야지! 퀄리티에 상관없이 하는것에 의의를 둘것이다. 그동안 미뤄왔던 크로키 공책을 꺼냈다. 연필도 다시 깎아 가지런히 두었다. 하루에 하나씩 만이라도 가지런히 드로잉 해야지! 퀄리티에 상관없이 하는것에 의의를 둘것이다.",
  cardCreated,
  heartCount,
  scrapCount,
  commentList,
  handleHeartClick,
  handleScrapClick,
  modalHandle,
}) {
  const {
    commentValue,
    commentCreateInput,
    handleLoginCheck,
    handleChange,
    handleCommentDel,
    handleCommentCreate,
  } = useBucketOptions();
  return (
    <Container>
      <BucketWrraper>
        <ImgWrapper>
          <img src={cardImg} />
        </ImgWrapper>
        <TotalContentWrapper>
          <ModalCloseButton onClick={modalHandle} />
          <ProfileBox>
            <ProfileAvatar
              avatarSrc={avatar}
              nickname={nickname}
            ></ProfileAvatar>
          </ProfileBox>
          <Title>{title}</Title>
          <CardCreatedDate>{cardCreated}</CardCreatedDate>
          <ContentBox>
            <p>{cardCotent}</p>
          </ContentBox>
          {commentList && commentList.length > 0 ? (
            <CommentListBox>
              {commentList.map((comment, idx) => (
                <p key={idx}>{comment}</p>
              ))}
            </CommentListBox>
          ) : (
            <CommentListNot>코멘트가 존재하지 않아요!</CommentListNot>
          )}

          <IconsBox>
            <div>
              <LikeButton
                handleHeartClick={handleHeartClick}
                width={16}
                height={16}
              />
              <span>{heartCount}</span>
            </div>
            <div>
              <ScrapButton
                handleScrapClick={handleScrapClick}
                width={18}
                height={18}
              />
              <span>{scrapCount}</span>
            </div>
            <div>
              <CommentIcon />
              <span>{commentList ? commentList?.length : 0}</span>
            </div>
          </IconsBox>
          <CommentBox>
            {localStorage.getItem("userAccessToken") ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCommentCreate(boardId);
                }}
              >
                <CommentUserAvatar />
                <TextInputArea
                  ref={commentCreateInput}
                  value={commentValue}
                  onChange={handleChange}
                  placeholder="댓글을 입력하세요."
                  maxLength={150}
                ></TextInputArea>
                <CloseButton onClick={handleCommentDel}>
                  <CloseCrossIcon />
                </CloseButton>
                <SendIcon>
                  <input type="submit" value="" />
                  <FontAwesomeIcon icon={faPaperPlane} />
                </SendIcon>
              </form>
            ) : (
              <>
                <p onClick={handleLoginCheck}>댓글달기</p>
                <CommentIcon />
              </>
            )}
          </CommentBox>
        </TotalContentWrapper>
      </BucketWrraper>

      <ModalCloseArea onClick={modalHandle} />
    </Container>
  );
}
