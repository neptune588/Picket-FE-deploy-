const emailDefaultData = {
  name: "userEmail",
  width: "275px",
  type: "text",
  placeholder: "이메일",
  autoComplete: "username",
};
const pwDefaultData = {
  name: "userPassword",
  width: "400px",
  type: "password",
  placeholder: "비밀번호",
  autoComplete: "new-password",
};
const pwReconfirmDefaultData = {
  name: "userPasswordConfirmation",
  width: "400px",
  type: "password",
  placeholder: "비밀번호 확인",
  autoComplete: "new-password",
};
const nickNameDefaultData = {
  name: "userNickname",
  width: "400px",
  type: "text",
  placeholder: "2~6자의 한글만 입력 가능합니다.",
};

/* const emailErrorMsg = "유효한 형식의 이메일이 아닙니다.";
const emailConfirmMsg = "이미 가입 되어있는 이메일 입니다.";
const pwErrorMsg = "유효한 형식의 이메일이 아닙니다.";
const pwReconfirmErrorMsg = "비밀번호가 같지 않습니다.";
const checkConfirmErrorMsg = "개인정보 수집 및 이용에 동의 해주세요.";
const nickNameErrorMsg = "이미 존재하는 닉네임 입니다."; */

export {
  emailDefaultData,
  pwDefaultData,
  pwReconfirmDefaultData,
  nickNameDefaultData,
};
