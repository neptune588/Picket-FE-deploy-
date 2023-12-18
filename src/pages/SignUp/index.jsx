import { useEffect, useRef, useState } from "react";

import useForm from "@/hooks/useForm";

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

import {
  emailDefaultData,
  pwDefaultData,
  pwReconfirmDefaultData,
  nickNameDefaultData,
} from "@/pages/SignUp/inputData";

export default function SignUp() {
  const { values, handleChange } = useForm();

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

  return (
    <>
      <Title>{nextPage ? "닉네임을 입력 해주세요." : "회원가입"}</Title>
      <form>
        {nextPage ? (
          <>
            <InputBox>
              <Input
                {...nickNameDefaultData}
                value={values.userNickname}
                inputRef={nickNameInput}
                onChange={handleChange}
              />
            </InputBox>
            <SubmitButton width={"400px"} value={"완료"} disabled />
          </>
        ) : (
          <>
            <InputBox>
              <Input
                {...emailDefaultData}
                value={values.userEmail}
                inputRef={emailInput}
                onChange={handleChange}
              />
              <DoubleCheckButton disabled>중복 확인</DoubleCheckButton>
            </InputBox>
            <InputBox>
              <Input
                {...pwDefaultData}
                value={values.userPassword}
                onChange={handleChange}
              />
            </InputBox>
            <InputBox>
              <Input
                {...pwReconfirmDefaultData}
                value={values.userPasswordConfirmation}
                onChange={handleChange}
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
