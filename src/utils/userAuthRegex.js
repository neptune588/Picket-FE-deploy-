const emailReg =
  /^([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|"([^\t -~]|(\\[\t -~]))+")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|[\t -Z^-~]*)$/;

const pwReg = /^[a-z0-9]{8,15}$/;

const nickNameReg = /^[가-힣]{2,6}$/;

export { emailReg, pwReg, nickNameReg };
