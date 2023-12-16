import { useEffect, useRef, useState } from "react";

import {
  InputBox,
  Title,
  InputCheckWrapper,
  DoubleCheckButton,
  NextButton,
} from "@/pages/SignUp/style";

import Input from "@/components/Input/Input";
import CheckBox from "@/components/CheckBox";
import SubmitButton from "@/components/SubmitButton/SubmitButton";

export default function SignUp() {
  const [emailValue, setEmailValue] = useState("");
  const [pwValue, setPwValue] = useState("");
  const [pwReplyValue, setPwReplyValue] = useState("");
  const [nickNameValue, setNickNameValue] = useState("");

  const [isChecked, setIsChecked] = useState(false);

  const [nextPage, setNextPage] = useState(false);

  const emailInput = useRef();
  const nickNameInput = useRef();

  useEffect(() => {
    emailInput.current && emailInput.current.focus();
  }, []);
  useEffect(() => {
    nickNameInput.current && nickNameInput.current.focus();
  }, [nextPage]);

  //2단계 회원가입

  //store에 form 데이터 담고
  //뒤로가기 누를시 데이터 지우고
  //닉네입 입력완료까지 되면 submit하자.

  //error

  //useEffect안에 조건부로 나타나는 컴포넌트의 ref를 넣었더니 인식하지 못했음.
  //true(not undifend)일때 포커스 주는걸로 변경
  return (
    <>
      <Title>{nextPage ? "닉네임을 입력 해주세요." : "회원가입"}</Title>
      <form>
        {nextPage ? (
          <>
            <InputBox>
              <Input
                width={"400px"}
                type={"text"}
                inputRef={nickNameInput}
                placeholder={"2~6자의 한글만 입력 가능합니다."}
                onChange={(e) => {
                  setNickNameValue(e.target.value);
                }}
              />
            </InputBox>
            <SubmitButton width={"400px"} value={"완료"} disabled />
          </>
        ) : (
          <>
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
            <NextButton
              onClick={(e) => {
                e.preventDefault();
                setNextPage((prev) => !prev);
              }}
            >
              회원가입
            </NextButton>
          </>
        )}
      </form>
    </>
  );
}
