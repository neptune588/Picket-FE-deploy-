const emailReg =
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

const pwReg = /^(?=.*[a-z])(?=.*[0-9])[a-z0-9]{8,15}$/;

const nickNameReg = /^[가-힣]{2,6}$/;

export { emailReg, pwReg, nickNameReg };
