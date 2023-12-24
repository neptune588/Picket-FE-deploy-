export default function dataSend(data) {
  const refineData = {
    email: data.userEmail,
    password: data.userPassword,
    nickname: data.userNickname,
  };

  return refineData;
}
