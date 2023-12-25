const emailDefaultData = {
  name: "userLoginEmail",
  width: "400px",
  type: "text",
  placeholder: "이메일",
};

const pwDefaultData = {
  name: "userLoginPassword",
  width: "400px",
  type: "password",
  placeholder: "비밀번호",
  autoComplete: "new-password",
};

const errorData = {
  userEmailMsg: "",
  userPwMsg: "",

  emailInvaildNotice: "default",
  pwInvaildNotice: "default",
};

export { emailDefaultData, pwDefaultData, errorData };
