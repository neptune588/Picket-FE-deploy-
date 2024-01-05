import { Fragment } from "react";
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
  CommentPutButton,
  CommentPutArea,
  CommentListNot,
  CommentUserAvatar,
  SendIcon,
  TextInputArea,
  MentDelButton,
  CrossIcon,
} from "@/components/BucketCard/style";

export default function BucketCard({
  boardId,
  nickname,
  avatar,
  title,
  cardImg = "/images/test_thumnail.jpg",
  cardContent,
  cardCreated,
  heartCount,
  scrapCount,
  commentList,
  handleHeartClick,
  handleScrapClick,
  modalCloseHandle,
}) {
  const {
    commentValue,
    commentCreateInput,
    handleChange,
    handleCurCommentDel,
    handleLoginCheck,
    handleCommentCreate,
    handlePutModal,
    handleCommentDelReq,
  } = useBucketOptions();
  return (
    <Container>
      <BucketWrraper>
        <ImgWrapper>
          <img src={cardImg} />
        </ImgWrapper>
        <TotalContentWrapper>
          <ModalCloseButton onClick={modalCloseHandle} />
          <ProfileBox>
            <ProfileAvatar
              avatarSrc={avatar}
              nickname={nickname}
            ></ProfileAvatar>
          </ProfileBox>
          <Title>{title}</Title>
          <CardCreatedDate>{cardCreated}</CardCreatedDate>
          <ContentBox>
            <p>{cardContent}</p>
          </ContentBox>
          {commentList && commentList.length > 0 ? (
            <CommentListBox>
              {commentList.map((comment, idx) => (
                <Fragment key={"comment" + comment.id}>
                  <div>
                    <p>{comment.nickname}</p>
                    <p>{comment.content}</p>
                  </div>
                  {localStorage.getItem("userAccessToken") && (
                    <div>
                      {comment.putOptions ? (
                        <CommentPutArea>
                          <li
                            onClick={handleCommentDelReq(boardId, comment.id)}
                          >
                            삭제
                          </li>
                          <li onClick={handlePutModal(idx, false)}>취소</li>
                        </CommentPutArea>
                      ) : (
                        <CommentPutButton onClick={handlePutModal(idx, true)} />
                      )}
                    </div>
                  )}
                </Fragment>
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
                <MentDelButton onClick={handleCurCommentDel}>
                  <CrossIcon />
                </MentDelButton>
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

      <ModalCloseArea onClick={modalCloseHandle} />
    </Container>
  );
}
