import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  width: 24px;
  height: 24px;
  overflow: hidden;
  border-radius: 50%;
  margin-right: 5px;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Nickname = styled.p`
  font-size: ${({ theme: { typo } }) => {
    return typo.size.md;
  }};
  color: ${({ theme: { colors } }) => {
    return colors.gray["80"];
  }};
`;

export default function ProfileAvatar({ avatarSrc, nickname }) {
  return (
    <Wrapper>
      <Avatar>
        <img src={avatarSrc} alt={"profile_avatar"} />
      </Avatar>
      <Nickname>{nickname}</Nickname>
    </Wrapper>
  );
}
