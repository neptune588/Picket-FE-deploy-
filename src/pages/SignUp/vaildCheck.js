import { emailReg, pwReg, nickNameReg } from "@/utils/userAuthRegex";

export default function vaildCheck(
  prevData,
  {
    userEmail = "",
    userPassword = "",
    userPasswordConfirmation = "",
    userNickname = "",
  },
  currentName
) {
  const vaildData = { ...prevData };
  const { checkData, inspectionData, errorData } = vaildData;

  if (currentName === "userEmail") {
    if (userEmail !== "" && emailReg.test(userEmail)) {
      checkData.emailVaild = true;
      inspectionData.emailVaild = true;
      errorData.emailInvaildNotice = false;
    } else {
      checkData.emailVaild = false;
      inspectionData.emailVaild = false;
      errorData.emailInvaildNotice = true;
      errorData.userEmailMsg = "유효한 형식의 이메일이 아닙니다.";
    }
  }

  if (currentName === "userPassword") {
    if (userPassword !== "" && pwReg.test(userPassword)) {
      checkData.pwVaild = true;
      inspectionData.pwVaild = true;
      errorData.pwInvaildNotice = false;
    } else {
      checkData.pwVaild = false;
      inspectionData.pwVaild = false;
      errorData.pwInvaildNotice = true;
      errorData.userPwMsg =
        "비밀번호는 8자 ~ 15자 사이의 소문자+숫자 형식만 가능합니다.";
    }
  }

  if (currentName === "userPasswordConfirmation") {
    if (userPassword === userPasswordConfirmation) {
      checkData.pwReConfirmVaild = true;
      errorData.pwReConfirmInvaildNotice = false;
    } else {
      checkData.pwReConfirmVaild = false;
      errorData.pwReConfirmInvaildNotice = true;
      errorData.userPwReConfirmMsg = "입력하신 비밀번호와 일치하지 않습니다.";
    }
  }

  if (currentName === "userNickname") {
    if (userNickname !== "" && nickNameReg.test(userNickname)) {
      checkData.nickNameVaild = true;
      inspectionData.nickNameVaild = true;
      errorData.nickNameInvaildNotice = false;
    } else {
      checkData.nickNameVaild = false;
      inspectionData.nickNameVaild = false;
      errorData.userNickNameMsg = "이미 존재하는 닉네임 입니다.";
      errorData.nickNameInvaildNotice = true;
    }
  }

  if (currentName === "nextButton") {
    if (
      checkData.emailVaild &&
      checkData.pwVaild &&
      checkData.pwReConfirmVaild &&
      checkData.isChecked
    ) {
      checkData.stepOneVaild = true;
    } else if (
      checkData.emailVaild &&
      checkData.pwVaild &&
      checkData.pwReConfirmVaild &&
      !checkData.isChecked
    ) {
      errorData.nextButtonMsg = "개인정보 제공 약관에 동의를 해주세요!";
    } else {
      errorData.nextButtonMsg = "필수 입력란에 유효한 내용을 작성 해주세요!";
    }
  }

  return vaildData;
}
