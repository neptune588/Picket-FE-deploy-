import { emailReg, pwReg, nickNameReg } from "@/utils/userAuthRegex";

export default function vaildCheck(
  currentName,
  {
    userEmail = "",
    userPassword = "",
    userPasswordConfirm = "",
    userNickname = "",
  },
  { errors, checks, finalChecks }
) {
  const checkList = { ...checks };
  const errorList = { ...errors };
  const finalCheckList = { ...finalChecks };

  if (currentName === "userEmail") {
    if (userEmail !== "" && emailReg.test(userEmail)) {
      checkList.emailVaild = true;
      finalCheckList.emailVaild = true;
      errorList.emailInvaildNotice = "default";
    } else {
      checkList.emailVaild = false;
      finalCheckList.emailVaild = false;
      errorList.userEmailMsg = "유효한 형식의 이메일이 아닙니다.";
      errorList.emailInvaildNotice = "inVaild";
    }
  }

  if (currentName === "userPassword") {
    if (userPassword !== "" && pwReg.test(userPassword)) {
      checkList.pwVaild = true;
      finalCheckList.pwVaild = true;
      errorList.pwInvaildNotice = "vaild";
    } else {
      checkList.pwVaild = false;
      finalCheckList.pwVaild = false;
      errorList.userPwMsg =
        "비밀번호는 8자 ~ 15자 사이의 소문자+숫자 형식만 가능합니다.";
      errorList.pwInvaildNotice = "inVaild";
    }
  }

  if (currentName === "userPasswordConfirm") {
    if (userPassword === userPasswordConfirm) {
      checkList.pwConfirmVaild = true;
      errorList.pwConfirmInvaildNotice = "vaild";
    } else {
      checkList.pwConfirmVaild = false;
      errorList.userPwConfirmMsg = "입력하신 비밀번호와 일치하지 않습니다.";
      errorList.pwConfirmInvaildNotice = "inVaild";
    }
  }

  if (currentName === "nextButton") {
    if (
      checkList.emailVaild &&
      checkList.emailRepeatVaild === "vaild" &&
      checkList.pwVaild &&
      checkList.pwConfirmVaild &&
      checkList.isChecked
    ) {
      checkList.stepOneVaild = true;
    } else if (
      checkList.emailVaild &&
      checkList.pwVaild &&
      checkList.pwConfirmVaild &&
      !checkList.isChecked
    ) {
      errorList.nextButtonMsg = "개인정보 제공 약관에 동의를 해주세요!";
    } else if (
      checkList.emailVaild &&
      checkList.pwVaild &&
      checkList.pwConfirmVaild &&
      checkList.isChecked &&
      checkList.emailRepeatVaild !== "vaild"
    ) {
      errorList.nextButtonMsg = "이메일 중복 확인을 해주세요!";
    } else {
      errorList.nextButtonMsg = "필수 입력란에 유효한 내용을 작성 해주세요!";
    }
  }

  if (currentName === "userNickname") {
    if (userNickname !== "" && nickNameReg.test(userNickname)) {
      checkList.nickNameVaild = true;
      finalCheckList.nickNameVaild = true;
      errorList.nickNameInvaildNotice = "default";
    } else {
      checkList.nickNameVaild = false;
      finalCheckList.nickNameVaild = false;
      errorList.userNickNameMsg = "닉네임은 한글로 2~6자 사이만 가능합니다.";
      errorList.nickNameInvaildNotice = "inVaild";
    }
  }

  return { errorList, checkList, finalCheckList };
}
