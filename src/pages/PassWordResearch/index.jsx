import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import Input from "@/components/Input/Input";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import SiteLoading from "@/components/SiteLoading/SiteLoading";
import LocationBar from "@/components/LocationBar/LocationBar";

import { pwResearchDefaultData } from "@/pages/PassWordResearch/inputData";

import {
  CenterdContainer,
  InputBox,
  Title,
  LoginPageMoveButton,
  NoticeMent,
  SuccessModalBox,
  SuccessModal,
  ConfirmButton,
  CloseButton,
} from "@/pages/PassWordResearch/style";

import usePwResearch from "@/hooks/usePwResearch";

export default function PassWordResearch() {
  const navigate = useNavigate();

  const {
    value,
    errors,
    dataLoading,
    submitSuccess,
    setSubmitSuccess,
    handleChange,
    handleSubmit,
  } = usePwResearch();
  const pwResearchInput = useRef();

  if (dataLoading) {
    return <SiteLoading />;
  }

  return (
    <>
      <LocationBar content={"비밀번호 찾기"} />
      {submitSuccess && (
        <SuccessModalBox>
          <SuccessModal>
            <h2>이메일을 전송하였습니다.</h2>
            <ConfirmButton
              onClick={() => {
                navigate("/auth/signin");
                setSubmitSuccess(false);
              }}
            >
              확인
            </ConfirmButton>
          </SuccessModal>
          <CloseButton
            onClick={() => {
              navigate("/auth/signin");
              setSubmitSuccess(false);
            }}
          />
        </SuccessModalBox>
      )}
      <CenterdContainer>
        <Title>비밀번호 찾기</Title>
        <NoticeMent>
          가입하신 이메일 주소를 입력 해주세요. <br />
          입력하신 이메일로 임시 비밀번호를 보내드립니다.
        </NoticeMent>
        <form onSubmit={handleSubmit}>
          <InputBox>
            <Input
              {...pwResearchDefaultData}
              value={value.userPwResearch}
              inputRef={pwResearchInput}
              onChange={handleChange}
              vaildState={errors.pwResearchInvaildNotice}
            />
            {errors.userPwResearchMsg && <p>{errors.userPwResearchMsg}</p>}
          </InputBox>
          <InputBox>
            <SubmitButton width={"400px"} value={"전송하기"} />
          </InputBox>
          <LoginPageMoveButton to="/auth/signin">
            로그인하기
          </LoginPageMoveButton>
        </form>
      </CenterdContainer>
    </>
  );
}
