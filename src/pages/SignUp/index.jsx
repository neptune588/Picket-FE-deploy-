import { useEffect, useRef, useState } from "react";

import {
  Container,
  InputBox,
  Title,
  InputCheckWrapper,
  DoubleCheckButton,
  NextButton,
} from "@/pages/SignUp/style";

import Input from "@/components/Input/Input";
import CheckBox from "@/components/CheckBox";

export default function SignUp() {
  const [emailValue, setEmailValue] = useState("");
  const [pwValue, setPwValue] = useState("");
  const [pwReplyValue, setPwReplyValue] = useState("");

  const [isChecked, setIsChecked] = useState(false);

  const emailInput = useRef();

  useEffect(() => {
    emailInput.current.focus();
  }, []);
  return (
    <Container>
      <Title>회원가입</Title>
      <form>
        <InputBox>
          <Input
            width={"275px"}
            type={"text"}
            inputRef={emailInput}
            placeholder={"이메일"}
            onChange={(e) => {
              setEmailValue(e.target.value);
            }}
          />
          <DoubleCheckButton disabled>중복 확인</DoubleCheckButton>
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
          <Input
            width={"400px"}
            type={"password"}
            placeholder={"비밀번호 확인"}
            onChange={(e) => {
              setPwReplyValue(e.target.value);
            }}
          />
        </InputBox>
        <InputCheckWrapper>
          <CheckBox
            inputId={"termsCheck"}
            inputType={"checkbox"}
            onChange={() => {
              setIsChecked((prev) => !prev);
            }}
            checked={isChecked}
            ChkContent={"개인정보 수집 및 이용에 동의합니다."}
          />
        </InputCheckWrapper>
        <NextButton disabled>회원가입</NextButton>
      </form>
    </Container>
  );
}
