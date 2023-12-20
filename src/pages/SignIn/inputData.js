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

const vaildTotalData = {
  checkData: {
    emailVaild: false,
    pwVaild: false,
  },
  inspectionData: {
    emailVaild: false,
    pwVaild: false,
  },
  errorData: {
    userEmailMsg: "",
    userPwMsg: "",

    emailInvaildNotice: false,
    pwInvaildNotice: false,
  },
};

export { emailDefaultData, pwDefaultData, vaildTotalData };
