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
  placeholder: "비밀번호 (8자~15자의 영소문자,숫자 조합)",
  autoComplete: "new-password",
};
const pwConfirmDefaultData = {
  name: "userPasswordConfirm",
  width: "400px",
  type: "password",
  placeholder: "비밀번호 확인",
  autoComplete: "new-password",
};
const nickNameDefaultData = {
  name: "userNickname",
  width: "275px",
  type: "text",
  placeholder: "2~6자의 한글만 입력 가능합니다.",
};
const vaildTotalData = {
  checkData: {
    emailVaild: false,
    emailRepeatVaild: "default",
    pwVaild: false,
    pwConfirmVaild: false,
    isChecked: false,
    nickNameVaild: false,
    nickNameRepeatVaild: "default",
    stepOneVaild: false,
  },
  finalCheckData: {
    emailVaild: false,
    pwVaild: false,
    nickNameVaild: false,
  },
  errorData: {
    userEmailMsg: "",
    userPwMsg: "",
    userPwConfirmMsg: "",
    userNickNameMsg: "",
    nextButtonMsg: "",
    lastPageMsg: "",

    emailInvaildNotice: "default",
    pwInvaildNotice: "default",
    pwConfirmInvaildNotice: "default",
    nickNameInvaildNotice: "default",
  },
};

export {
  emailDefaultData,
  pwDefaultData,
  pwConfirmDefaultData,
  nickNameDefaultData,
  vaildTotalData,
};
