import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Title,
  InputBox,
  SocialLogin,
  UserAuthBox,
} from "@/pages/SignIn/style";

import Input from "@/components/Input/Input";
import SubmitButton from "@/components/SubmitButton/SubmitButton";

export default function SignIn() {
  const navigate = useNavigate();

  const [emailValue, setEmailValue] = useState("");
  const [pwValue, setPwValue] = useState("");

  const emailInput = useRef();

  useEffect(() => {
    emailInput.current.focus();
  }, []);
  return (
    <>
      <Title>로그인</Title>
      <form>
        <InputBox>
          <Input
            width={"400px"}
            type={"text"}
            inputRef={emailInput}
            placeholder={"이메일"}
            onChange={(e) => {
              setEmailValue(e.target.value);
            }}
          />
        </InputBox>
        <InputBox>
          <Input
            width={"400px"}
            type={"password"}
            placeholder={"비밀번호"}
            onChange={(e) => {
              setPwValue(e.target.value);
            }}
          />
        </InputBox>
        <InputBox>
          <SubmitButton width={"400px"} value={"로그인"} />
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
