import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
  Title,
  InputBox,
  SocialLogin,
  UserAuthBox,
} from "@/pages/SignIn/style";

import Input from "@/components/Input/Input";
import SubmitButton from "@/components/SubmitButton/SubmitButton";

import {
  emailDefaultData,
  pwDefaultData,
  vaildTotalData,
} from "@/pages/Signin/InputData";

export default function SignIn() {
  const navigate = useNavigate();

  const emailInput = useRef();

  useEffect(() => {
    emailInput.current && emailInput.current.focus();
  }, []);
  return (
    <>
      <Title>로그인</Title>
      <form>
        <InputBox>
          <Input {...emailDefaultData} inputRef={emailInput} />
        </InputBox>
        <InputBox>
          <Input {...pwDefaultData} />
        </InputBox>
        <InputBox>
          <SubmitButton width={"400px"} value={"로그인"} disabled />
        </InputBox>
        <InputBox>
          <SocialLogin disabled>Google 로그인</SocialLogin>
        </InputBox>
        <UserAuthBox>
          <p
            onClick={() => {
              navigate("/auth/signup");
            }}
          >
            회원가입
          </p>
          <p>아이디/비밀번호 찾기</p>
        </UserAuthBox>
      </form>
    </>
  );
}
