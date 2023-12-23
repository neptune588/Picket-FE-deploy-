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
const vaildTotalData = {
  checkData: {
    emailVaild: false,
    emailRepeatVaild: false,
    pwVaild: false,
    pwReConfirmVaild: false,
    isChecked: false,
    nickNameVaild: false,
    stepOneVaild: false,
  },
  inspectionData: {
    emailVaild: false,
    pwVaild: false,
    nickNameVaild: false,
  },
  errorData: {
    userEmailMsg: "",
    userPwMsg: "",
    userPwReConfirmMsg: "",
    userNickNameMsg: "",
    nextButtonMsg: "",

    emailInvaildNotice: false,
    pwInvaildNotice: false,
    pwReConfirmInvaildNotice: false,
    nickNameInvaildNotice: false,
  },
};

export {
  emailDefaultData,
  pwDefaultData,
  pwReconfirmDefaultData,
  nickNameDefaultData,
  vaildTotalData,
};
