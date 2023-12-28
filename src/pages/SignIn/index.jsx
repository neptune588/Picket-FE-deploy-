import { useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";

import useSignIn from "@/hooks/useSignIn";

import LocationBar from "@/components/LocationBar/LocationBar";

import {
  CenterdContainer,
  Title,
  InputBox,
  TotalErrorMsg,
  SocialLogin,
  UserAuthBox,
} from "@/pages/SignIn/style";

import Input from "@/components/Input/Input";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import SiteLoading from "@/components/SiteLoading/SiteLoading";
import { emailDefaultData, pwDefaultData } from "@/pages/Signin/InputData";

export default function SignIn() {
  const navigate = useNavigate();
  const { errors, values, handleSubmit, handleChange, isLoading } = useSignIn();
  const emailInput = useRef();

  useEffect(() => {
    console.log(isLoading);
    emailInput.current && emailInput.current.focus();
  }, [isLoading]);

  if (isLoading) {
    return <SiteLoading />;
  }
  return (
    <>
      <LocationBar content={"로그인"} />
      <CenterdContainer>
        <Title>로그인</Title>
        <form onSubmit={handleSubmit}>
          <InputBox>
            <Input
              {...emailDefaultData}
              value={values.userLoginEmail}
              inputRef={emailInput}
              onChange={handleChange}
              vaildState={errors.emailInvaildNotice}
            />
            {errors.userEmailMsg && <p>{errors.userEmailMsg}</p>}
          </InputBox>
          <InputBox>
            <Input
              {...pwDefaultData}
              value={values.userLoginPassword}
              onChange={handleChange}
              vaildState={errors.pwInvaildNotice}
            />
            {errors.userPwMsg && <p>{errors.userPwMsg}</p>}
          </InputBox>
          <InputBox>
            <SubmitButton width={"400px"} value={"로그인"} />
          </InputBox>
          <InputBox>
            <SocialLogin disabled>Google 로그인</SocialLogin>
          </InputBox>
          {errors.submitErrorMsg && (
            <TotalErrorMsg>{errors.submitErrorMsg}</TotalErrorMsg>
          )}
          <UserAuthBox>
            <p
              onClick={() => {
                navigate("/auth/signup");
              }}
            >
              회원가입
            </p>
            <p
              onClick={() => {
                navigate("/auth/passwordResearch");
              }}
            >
              비밀번호 찾기
            </p>
          </UserAuthBox>
        </form>
      </CenterdContainer>
    </>
  );
}
