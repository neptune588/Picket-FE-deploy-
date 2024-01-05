import { useState, useEffect } from "react";

import styled from "styled-components";
import BucketHandle from "@/components/Bucket/BucketHandleModal";
import {
  Container,
  ImgBox,
  Dday,
  Wrapper,
  WriterBox,
  ButtonBox,
  ReplyBox,
} from "@/components/Bucket/style";

import LikeButton from "../LikeButton/LikeButton";
import ScrapButton from "../ScrapButton/ScrapButton";
/* import CardBirthView from "../CardBirthView/CardBirthView"; */

import ThreeDot from "@/assets/icons/threedot.svg?react";
import Reply from "@/assets/icons/reply.svg?react";
import { BiSend } from "react-icons/bi";
import { MdClear } from "react-icons/md";

import { getData, postData, delData } from "@/services/api";

const ProfileImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 2em;
  margin-right: 5px;
`;

const ThreeDotIcon = styled(ThreeDot)`
  margin-left: auto;
  cursor: pointer;
`;

const BucketTitle = styled.div`
  margin: 10px 0px;
  font-size: ${({ theme: { typo } }) => {
    return typo.size.xl;
  }};
  font-weight: bold;
`;

const Content = styled.div`
  height: 55%;
  background: white;
  font-size: 12pt;
`;

const CommentBox = styled.div``;

const ReplyIcon = styled(Reply)`
  margin-right: 5px;
`;

const ReplyBar = styled.input`
  width: 100%;
  height: 24px;
  background: ${({ theme: { colors } }) => {
    return colors.gray["20"];
  }};
  color: ${({ theme: { colors } }) => {
    return colors.black;
  }};
  text-indent: 1em;
  font-size: ${({ theme: { typo } }) => {
    return typo.size.md;
  }};
  outline: none;
  border: none;
  border-radius: 1em;
`;

const StyledWrapper = styled(Wrapper)`
  position: relative;
  padding: 40px;
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export default function Bucket({ boardId, onModal }) {
  const [openModal, setOpenModal] = useState(false);
  const [heartClicked, setHeartClicked] = useState(false);
  const [scrapClicked, setScrapClicked] = useState(false);

  const [data, setData] = useState({});
  const [value, setValue] = useState("");

  const getDday = (dateString) => {
    const today = new Date();
    const targetDate = new Date(dateString);
    const timeDiff = targetDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return daysLeft === 0 ? "D-day" : `D-${daysLeft}`;
  };

  const getToken = () => {
    const token = `Bearer ${JSON.parse(
      localStorage.getItem("userAccessToken")
    )}`;
    return token;
  };
  const init = async () => {
    const token = getToken();

    const headers = {
      Authorization: token,
    };

    const response = await getData(`board/${boardId}`, { headers });
    if (response.data) {
      setData(response.data);
    }
    console.log(response);
  };

  const likeHandler = async () => {
    const token = getToken();

    const data = { boardId };
    const headers = {
      Authorization: token,
    };

    const response = await postData(`board/${boardId}/like`, {}, { headers });
    setHeartClicked(response.data ? true : false);
  };

  const scrapHandler = async () => {
    const token = getToken();
    const data = { boardId };

    const headers = {
      Authorization: token,
    };

    const response = await postData(`board/${boardId}/scrap`, {}, { headers });
    setScrapClicked(response.data ? true : false);
    console.log(response);
  };

  const commentSubmit = async () => {
    const token = getToken();
    const data = { boardId };

    const headers = {
      Authorization: token,
    };

    const response = await postData(
      `board/${boardId}/comments`,
      { content: value },
      { headers }
    );
    console.log(response);
  };

  const commentDelete = async (commentId) => {
    const token = getToken();
    const data = { boardId, commentId };

    const headers = {
      Authorization: token,
    };

    const response = await delData(`board/${boardId}/comments/${commentId}`, {
      headers,
    });
    console.log(response);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Container>
      <ImgBox>
        <img
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          src={data.filepath ? data.filepath : "/images/no-image.png"}
        ></img>
        <Dday>{getDday(data.deadline)}</Dday>
      </ImgBox>
      <StyledWrapper>
        <WriterBox>
          <div>
            <ProfileImg src={data.profileImg} />
            <span>{data.nickname}</span>
          </div>
          <FlexBox>
            <ThreeDotIcon onClick={() => setOpenModal(true)} />
            <div onClick={onModal}>
              <MdClear style={{ cursor: "pointer" }} />
            </div>
          </FlexBox>
        </WriterBox>
        {openModal && <BucketHandle setOpenModal={setOpenModal} />}
        <BucketTitle>{data.title}</BucketTitle>
        {/* <CardBirthView margin={"0 0 20px"} content={data.deadline} /> */}
        <Content>{data.content}</Content>
        <ButtonBox>
          <LikeButton
            onClick={() => {
              likeHandler();
            }}
            isClicked={heartClicked}
            width={16}
            height={16}
          />
          <span>{data.heartCount}</span>
          <ScrapButton
            onClick={() => {
              scrapHandler();
            }}
            isClicked={scrapClicked}
            width={16}
            height={16}
          />
          <span>{data.scrapCount}</span>
          <ReplyIcon />
          <span>{data.commentList?.length ?? 0}</span>
        </ButtonBox>
        <CommentBox>
          {data.commentList &&
            data.commentList.map((comment) => (
              <div key={comment.id}>
                <img
                  style={{ width: "32px", height: "32px", objectFit: "cover" }}
                  src={comment.profileUrl}
                />
                {comment.nickname}
                {comment.content}
                {comment.createDate}
                <MdClear
                  style={{ cursor: "pointer" }}
                  onClick={() => commentDelete(comment.id)}
                />
              </div>
            ))}
        </CommentBox>
        <ReplyBox>
          <ProfileImg src="/images/test_replier.jpg" />
          <ReplyBar
            placeholder="댓글 추가"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <BiSend style={{ cursor: "pointer" }} onClick={commentSubmit} />
        </ReplyBox>
      </StyledWrapper>
    </Container>
  );
}
