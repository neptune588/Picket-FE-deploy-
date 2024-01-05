import { useDispatch, useSelector } from "react-redux";

import {
  Container,
  ContentsWrapper,
  ThumnailImgBox,
  CreateDateBox,
  Title,
  ContentBox,
  Dday,
  ThumnailPutButton,
  ThumnailPutModalOuter,
  ThumnailPutModal,
  PutOptionList,
} from "@/components/HomeThumnailCard/style";

import { setHomeThumnailPutModalState } from "@/store/bucketThumnailSlice";

import ThumnailImg from "@/components/ThumnailImg/ThumnailImg";

export default function HomeThumnailCard({
  boardId,
  title,
  content,
  deadline,
  thumnailSrc,
  handleHomeDetailModal,
  curThumnail,
  putOptionModalState,
  handleBucketDelete,
  /*   avatar,
  isFinish,
  isProgress, */
}) {
  /*   const getDday = (dateString) => {
    const today = new Date();
    const targetDate = new Date(dateString);
    const timeDiff = targetDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return daysLeft === 0 ? "D-day" : `D-${daysLeft}`;
  }; */

  const dispatch = useDispatch();

  const handlePutOptionModalState = (curThumnailNumber, curPutOptionsState) => {
    return () => {
      dispatch(
        setHomeThumnailPutModalState({ curThumnailNumber, curPutOptionsState })
      );
    };
  };

  return (
    <Container>
      {putOptionModalState && (
        <ThumnailPutModalOuter>
          <ThumnailPutModal>
            <PutOptionList>버킷 달성</PutOptionList>
            <PutOptionList onClick={handleBucketDelete}>
              버킷 삭제
            </PutOptionList>
            <PutOptionList
              onClick={handlePutOptionModalState(curThumnail, false)}
            >
              취소
            </PutOptionList>
          </ThumnailPutModal>
        </ThumnailPutModalOuter>
      )}
      <ThumnailImgBox onClick={handleHomeDetailModal}>
        <ThumnailImg
          thumnailSrc={thumnailSrc ? thumnailSrc : "/images/test_thumnail.jpg"}
        />
      </ThumnailImgBox>
      <ContentsWrapper>
        <Dday>D-5</Dday>
        <ThumnailPutButton
          onClick={handlePutOptionModalState(curThumnail, true)}
        />
        <CreateDateBox onClick={handleHomeDetailModal}>
          {deadline}
        </CreateDateBox>
        <Title onClick={handleHomeDetailModal}>{title}</Title>
        <ContentBox onClick={handleHomeDetailModal}>{content}</ContentBox>
      </ContentsWrapper>
    </Container>
  );
}
