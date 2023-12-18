import { emailReg, pwReg, nickNameReg } from "@/utils/userAuthRegex";

export default function vaildCheck({
  userEmail,
  userPassword,
  userPasswordConfirmation,
  userNickname,
}) {
  const error = {};

  if (!emailReg.test(userEmail)) {
    error.userName = "유효한 형식의 이메일이 아닙니다.";
  }

  if (!pwReg.test(userPassword)) {
    error.pwErrorMsg = "유효한 형식의 비밀번호가 아닙니다.";
  }

  if (!nickNameReg.test(userNickname)) {
    error.pwErrorMsg = "이미 존재하는 닉네임 입니다.";
  }
}
