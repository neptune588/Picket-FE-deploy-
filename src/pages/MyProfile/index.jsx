import useMyProfile from "@/hooks/useMyProfile";

import HomeThumnailCard from "@/components/HomeThumnailCard";
import BucketCard from "@/components/BucketCard";
import Input from "@/components/Input/Input";
import SubmitButton from "@/components/SubmitButton/SubmitButton";

import {
  Container,
  ProfileViewBox,
  EditProfileButton,
  EditModalOuter,
  EditModal,
  InputBox,
  UpLoadBox,
  ButtonBox,
  ProfileEditCansleButton,
  ProfileImgUploadButton,
  ModalCloseArea,
  BucketLengthWrapper,
  BucketLengthBox,
  BucketMenuBox,
  ActiveMenu,
  ContentsNotBox,
  CardWrppar,
} from "@/pages/MyProfile/style";

export default function MyProfile() {
  const {
    completeCount,
    scrapCardData,
    activeNumber,
    detailModal,
    profileEditModal,
    profileHomeCardData,
    profileHomeCardDetailData,
    profileObserver,
    handleProfileEditModalState,
    handleMenuClick,
    handleHomeDetailView,
    handleBucketDelete,
    handleBucketComplete,
    handleHomeDetailModalClose,
    handleHomeDetailBucketComplete,
    handleHomeDetailBucketDelete,
    handleDetailHeartAndScrapClick,
  } = useMyProfile();
  const contentMaxViewLength = 18;
  const titleMaxViewLength = 15;
  return (
    <>
      {detailModal && (
        <BucketCard
          boardId={profileHomeCardDetailData.boardId}
          nickname={profileHomeCardDetailData.nickname}
          avatar={
            profileHomeCardDetailData.avatar
              ? profileHomeCardDetailData.avatar
              : "/images/default_profile.png"
          }
          title={profileHomeCardDetailData.title}
          cardImg={profileHomeCardDetailData.cardImg}
          cardContent={profileHomeCardDetailData.cardContent}
          commentList={profileHomeCardDetailData.commentList}
          cardCreated={profileHomeCardDetailData.created}
          heartCount={profileHomeCardDetailData.heartCount}
          scrapCount={profileHomeCardDetailData.scrapCount}
          isCompleted={profileHomeCardDetailData.isCompleted}
          modalCloseHandle={handleHomeDetailModalClose}
          handleHeartClick={handleDetailHeartAndScrapClick(
            "heart",
            profileHomeCardDetailData.boardId
          )}
          handleScrapClick={handleDetailHeartAndScrapClick(
            "scrap",
            profileHomeCardDetailData.boardId
          )}
          handleDetailBucketDelete={handleHomeDetailBucketDelete(
            profileHomeCardDetailData.boardId
          )}
          handleDetailBucketComplete={handleHomeDetailBucketComplete(
            profileHomeCardDetailData.boardId
          )}
        />
      )}
      {profileEditModal && (
        <EditModalOuter>
          <EditModal>
            <h2>프로필 편집</h2>
            <form>
              <UpLoadBox>
                <label>
                  <ProfileImgUploadButton></ProfileImgUploadButton>
                </label>
              </UpLoadBox>
              <InputBox>
                <Input width={"400px"} />
              </InputBox>
              <ButtonBox>
                <ProfileEditCansleButton onClick={handleProfileEditModalState}>
                  취소
                </ProfileEditCansleButton>
                <SubmitButton width={"190px"} value={"확인"} />
              </ButtonBox>
            </form>
          </EditModal>
          <ModalCloseArea onClick={handleProfileEditModalState} />
        </EditModalOuter>
      )}
      <Container>
        <ProfileViewBox>
          <div></div>
          <div>
            <h2>테스트</h2>
            <EditProfileButton onClick={handleProfileEditModalState} />
          </div>
        </ProfileViewBox>
        <BucketLengthWrapper>
          <BucketLengthBox>
            <span>달성 완료한 버킷</span>
            <span>{completeCount}</span>
          </BucketLengthBox>
          <BucketLengthBox>
            <span>스크랩한 버킷</span>
            <span>{scrapCardData.length}</span>
          </BucketLengthBox>
        </BucketLengthWrapper>
        <BucketMenuBox>
          <ActiveMenu
            $isActiveNum={activeNumber}
            $number={0}
            onClick={handleMenuClick(0)}
          >
            마이 버킷{" "}
            {Array.isArray(profileHomeCardData) && profileHomeCardData.length}
          </ActiveMenu>
          <ActiveMenu
            $isActiveNum={activeNumber}
            $number={1}
            onClick={handleMenuClick(1)}
          >
            스크랩한 버킷 {scrapCardData.length}
          </ActiveMenu>
        </BucketMenuBox>
        <CardWrppar>
          {Array.isArray(profileHomeCardData) &&
          profileHomeCardData.length > 0 ? (
            profileHomeCardData.map((data, idx) => {
              return (
                <HomeThumnailCard
                  key={"homeThumnail" + data.boardId}
                  boardId={data.boardId}
                  curThumnail={idx}
                  title={
                    data.title.length > titleMaxViewLength
                      ? data.title.substring(0, titleMaxViewLength) + "..."
                      : data.title
                  }
                  content={
                    data.content?.length > contentMaxViewLength
                      ? data.content.substring(0, contentMaxViewLength) +
                        "\n" +
                        data.content.substring(
                          contentMaxViewLength,
                          contentMaxViewLength * 2
                        ) +
                        "..."
                      : data.content
                  }
                  deadline={data.deadline}
                  Dday={data.Dday}
                  thumnailSrc={data.filepath}
                  avatar={data.filename}
                  isFinish={data.finishTotal}
                  isCompleted={data.isCompleted}
                  isProgress={data.progressTotal}
                  putOptionModalState={data.putOptions}
                  handleHomeDetailModal={handleHomeDetailView(data.boardId)}
                  handleBucketDelete={handleBucketDelete(data.boardId)}
                  handleBucketComplete={handleBucketComplete(data.boardId)}
                />
              );
            })
          ) : (
            <ContentsNotBox></ContentsNotBox>
          )}
          {activeNumber === 1 && scrapCardData.length > 0 ? (
            "데이터"
          ) : (
            <ContentsNotBox></ContentsNotBox>
          )}
        </CardWrppar>
      </Container>
      {((Array.isArray(profileHomeCardData) &&
        profileHomeCardData.length > 0) ||
        scrapCardData.length > 0) && <div ref={profileObserver}></div>}
    </>
  );
}
