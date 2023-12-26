import { useEffect, useRef } from "react";

import useSignUp from "@/hooks/useSignUp";

import {
  InputBox,
  Title,
  InputCheckWrapper,
  DoubleCheckButton,
  NextButton,
  ButtonBox,
} from "@/pages/SignUp/style";

import Input from "@/components/Input/Input";
import CheckBox from "@/components/CheckBox";
import SubmitButton from "@/components/SubmitButton/SubmitButton";

import {
  emailDefaultData,
  pwDefaultData,
  pwConfirmDefaultData,
  nickNameDefaultData,
  vaildTotalData,
} from "@/pages/SignUp/inputData";

import vaildCheck from "@/pages/SignUp/vaildCheck";
import dataRefine from "@/pages/SignUp/dataRefine";

export default function SignUp() {
  const {
    values,
    checks,
    errors,
    handleChange,
    handleTermsCheck,
    handleErrorCheck,
    handleEmailRepeatCheck,
    handleNickNameRepeatCheck,
    handleTotalCheck,
  } = useSignUp(vaildCheck, vaildTotalData, dataRefine);

  const emailInput = useRef();
  const nickNameInput = useRef();

  useEffect(() => {
    emailInput.current && emailInput.current.focus();
  }, []);
  useEffect(() => {
    nickNameInput.current && nickNameInput.current.focus();
  }, [checks.stepOneVaild]);

  return (
    <>
      <Title>
        {checks.stepOneVaild ? "닉네임을 입력 해주세요." : "회원가입"}
      </Title>
      <form onSubmit={handleTotalCheck}>
        {checks.stepOneVaild ? (
          <>
            <InputBox>
              <div>
                <Input
                  {...nickNameDefaultData}
                  value={values.userNickname}
                  inputRef={nickNameInput}
                  onChange={handleChange}
                  onBlur={handleErrorCheck}
                  vaildState={errors.nickNameInvaildNotice}
                />
                <DoubleCheckButton onClick={handleNickNameRepeatCheck}>
                  중복 확인
                </DoubleCheckButton>
              </div>
              {(!checks.nickNameVaild ||
                checks.nickNameRepeatVaild === "inVaild") && (
                <p>{errors.userNickNameMsg}</p>
              )}
            </InputBox>
            <ButtonBox>
              <SubmitButton
                name={"submitButton"}
                width={"400px"}
                value={"완료"}
              />
              {errors.lastPageMsg && <p>{errors.lastPageMsg}</p>}
            </ButtonBox>
          </>
        ) : (
          <>
            <InputBox>
              <div>
                <Input
                  {...emailDefaultData}
                  value={values.userEmail}
                  inputRef={emailInput}
                  onChange={handleChange}
                  onBlur={handleErrorCheck}
                  vaildState={errors.emailInvaildNotice}
                />
                <DoubleCheckButton onClick={handleEmailRepeatCheck}>
                  중복 확인
                </DoubleCheckButton>
              </div>
              {(!checks.emailVaild ||
                checks.emailRepeatVaild === "inVaild") && (
                <p>{errors.userEmailMsg}</p>
              )}
            </InputBox>
            <InputBox>
              <div>
                <Input
                  {...pwDefaultData}
                  value={values.userPassword}
                  onChange={handleChange}
                  onBlur={handleErrorCheck}
                  vaildState={errors.pwInvaildNotice}
                />
              </div>
              {!checks.pwVaild && <p>{errors.userPwMsg}</p>}
            </InputBox>
            <InputBox>
              <div>
                <Input
                  {...pwConfirmDefaultData}
                  value={values.userPasswordConfirm}
                  onChange={handleChange}
                  onBlur={handleErrorCheck}
                  vaildState={errors.pwConfirmInvaildNotice}
                />
              </div>
              {!checks.pwConfirmVaild && <p>{errors.userPwConfirmMsg}</p>}
            </InputBox>
            <InputCheckWrapper>
              <CheckBox
                inputId={"termsCheck"}
                inputType={"checkbox"}
                onChange={handleTermsCheck}
                checked={checks.isChecked}
                ChkContent={"개인정보 수집 및 이용에 동의합니다."}
              />
            </InputCheckWrapper>
            <ButtonBox>
              <NextButton name={"nextButton"} onClick={handleErrorCheck}>
                회원가입
              </NextButton>
              {!checks.stepOneVaild && <p>{errors.nextButtonMsg}</p>}
            </ButtonBox>
          </>
        )}
      </form>
    </>
  );
}
