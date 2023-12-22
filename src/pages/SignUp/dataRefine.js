export default function dataSend(data) {
  const refineData = {
    email: data.userEmail,
    password: data.userPassword,
    nickName: data.userNickname,
    imageUrl: "test",
  };

  return refineData;
}
