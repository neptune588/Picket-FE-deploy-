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
  DoubleCheckButton,
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
    profileMyCardData,
    profileCardDetailData,
    previewImg,
    nikcnameValue,
    errors,
    setPreviewImg,
    setErrors,
    myCardObserver,
    scrapCardObserver,
    setNicknameValue,
    nicknameRef,
    handleChange,
    handleProfileEditModalState,
    handleMenuClick,
    handleCardDetailView,
    handleCardDetailModalClose,
    handleBucketDelete,
    handleBucketComplete,
    handleMyDetailBucketComplete,
    handleMyDetailBucketDelete,
    handleDetailHeartClick,
    handleProfileImgChange,
    handleNicknameRepeatCheck,
    profileEditReq,
  } = useMyProfile();
  const contentMaxViewLength = 18;
  const titleMaxViewLength = 15;
  return (
    <>
      {detailModal && (
        <BucketCard
          boardId={profileCardDetailData.boardId}
          nickname={profileCardDetailData.nickname}
          avatar={
            profileCardDetailData.avatar
              ? profileCardDetailData.avatar
              : "/images/default_profile.png"
          }
          title={profileCardDetailData.title}
          cardImg={profileCardDetailData.cardImg}
          cardContent={profileCardDetailData.cardContent}
          commentList={profileCardDetailData.commentList}
          cardCreated={profileCardDetailData.created}
          heartCount={profileCardDetailData.heartCount}
          scrapCount={profileCardDetailData.scrapCount}
          putModalOptions={activeNumber === 0 && true}
          isCompleted={profileCardDetailData.isCompleted}
          modalCloseHandle={handleCardDetailModalClose}
          handleHeartClick={
            activeNumber === 0
              ? handleDetailHeartClick(0, profileCardDetailData.boardId)
              : handleDetailHeartClick(1, profileCardDetailData.boardId)
          }
          handleDetailBucketDelete={
            activeNumber === 0 &&
            handleMyDetailBucketDelete(profileCardDetailData.boardId)
          }
          handleDetailBucketComplete={
            activeNumber === 0 &&
            handleMyDetailBucketComplete(profileCardDetailData.boardId)
          }
        />
      )}
      {profileEditModal && (
        <EditModalOuter>
          <EditModal>
            <h2>프로필 편집</h2>
            <form onSubmit={profileEditReq}>
              <UpLoadBox>
                <label htmlFor="profileUpload">
                  <input
                    type="file"
                    id="profileUpload"
                    accept="image/*"
                    onChange={handleProfileImgChange}
                  />
                  <img src={previewImg} alt={previewImg} />
                  <ProfileImgUploadButton></ProfileImgUploadButton>
                </label>
              </UpLoadBox>
              <InputBox>
                <Input
                  maxLength={6}
                  inputRef={nicknameRef}
                  width={"270px"}
                  vaildState={errors.nicknameInvaildNotice}
                  value={nikcnameValue}
                  onChange={handleChange}
                  placeholder={"닉네임을 입력하세요."}
                />
                <DoubleCheckButton onClick={handleNicknameRepeatCheck}>
                  중복확인
                </DoubleCheckButton>
                {errors.nicknameErrorMsg && <p>{errors.nicknameErrorMsg}</p>}
              </InputBox>
              <ButtonBox>
                <ProfileEditCansleButton
                  onClick={() => {
                    setNicknameValue("");
                    setErrors({
                      ...errors,
                      nicknameInvaildNotice: "default",
                      nicknameErrorMsg: "",

                      totalErrorMsg: "",
                    });
                    handleProfileEditModalState();
                  }}
                >
                  취소
                </ProfileEditCansleButton>
                <SubmitButton width={"190px"} value={"확인"} />
              </ButtonBox>
            </form>
          </EditModal>
          <ModalCloseArea
            onClick={() => {
              setNicknameValue("");
              setErrors({
                ...errors,
                nicknameInvaildNotice: "default",
                nicknameErrorMsg: "",

                totalErrorMsg: "",
              });
              handleProfileEditModalState();
            }}
          />
        </EditModalOuter>
      )}
      <Container>
        <ProfileViewBox>
          <div></div>
          <div>
            <h2>{JSON.parse(localStorage.getItem("userNickname"))}</h2>
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
            마이 버킷
            {Array.isArray(profileMyCardData) &&
              "  " + profileMyCardData.length}
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
          {activeNumber === 0 &&
            Array.isArray(profileMyCardData) &&
            profileMyCardData.length > 0 &&
            profileMyCardData.map((data, idx) => {
              return (
                <HomeThumnailCard
                  key={"profilThumnail" + data.boardId}
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
                  putOpitonsControl={true}
                  handleHomeDetailModal={handleCardDetailView(data.boardId)}
                  handleBucketDelete={handleBucketDelete(data.boardId)}
                  handleBucketComplete={handleBucketComplete(data.boardId)}
                />
              );
            })}
          {activeNumber === 1 && scrapCardData.length > 0 ? (
            scrapCardData.map((data, idx) => {
              return (
                <HomeThumnailCard
                  key={"scrapCard" + data.boardId}
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
                  DdayView={false}
                  thumnailSrc={data.bucketImg}
                  avatar={data.filename}
                  isFinish={data.finishTotal}
                  isCompleted={data.isCompleted}
                  isProgress={data.progressTotal}
                  handleHomeDetailModal={handleCardDetailView(data.boardId)}
                />
              );
            })
          ) : (
            <ContentsNotBox></ContentsNotBox>
          )}
        </CardWrppar>
      </Container>
      {/*       {Array.isArray(profileHomeCardData) &&
        profileHomeCardData.length > 0 &&
        activeNumber === 0 && <div ref={myCardObserver} />}

      {scrapCardData.length > 0 && activeNumber === 1 && (
        <div ref={scrapCardObserver} />
      )} */}
    </>
  );
}
