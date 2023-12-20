import { useEffect, useRef } from "react";

import useForm from "@/hooks/useForm";

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
  pwReconfirmDefaultData,
  nickNameDefaultData,
  vaildTotalData,
} from "@/pages/SignUp/inputData";

import vaildCheck from "@/pages/SignUp/vaildCheck";
import dataSend from "@/pages/SignUp/dataSend";

export default function SignUp() {
  const {
    values,
    errors,
    checks,
    handleChange,
    handleTermsCheck,
    handleErrorCheck,
    handleTotalCheck,
  } = useForm(vaildCheck, vaildTotalData, dataSend);

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
                  inVaild={errors.nickNameInvaildNotice}
                />
              </div>
              {!checks.nickNameVaild && errors.userNickNameMsg && (
                <p>{errors.userNickNameMsg}</p>
              )}
            </InputBox>
            <SubmitButton width={"400px"} value={"완료"} />
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
                  inVaild={errors.emailInvaildNotice}
                />
                <DoubleCheckButton disabled>중복 확인</DoubleCheckButton>
              </div>
              {!checks.emailVaild && errors.userEmailMsg && (
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
                  inVaild={errors.pwInvaildNotice}
                />
              </div>
              {!checks.pwVaild && errors.userPwMsg && <p>{errors.userPwMsg}</p>}
            </InputBox>
            <InputBox>
              <div>
                <Input
                  {...pwReconfirmDefaultData}
                  value={values.userPasswordConfirmation}
                  onChange={handleChange}
                  onBlur={handleErrorCheck}
                  inVaild={errors.pwReConfirmInvaildNotice}
                />
              </div>
              {!checks.pwReConfirmVaild && errors.userPwReConfirmMsg && (
                <p>{errors.userPwReConfirmMsg}</p>
              )}
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
              {!checks.stepOneVaild && errors.nextButtonMsg && (
                <p>{errors.nextButtonMsg}</p>
              )}
            </ButtonBox>
          </>
        )}
      </form>
    </>
  );
}
