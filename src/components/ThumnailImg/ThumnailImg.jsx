import styled from "styled-components";

const ThumnailImgBox = styled.div`
  height: 100%;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function ThumnailImg({ thumnailSrc }) {
  return (
    <ThumnailImgBox>
      <img src={thumnailSrc}></img>
    </ThumnailImgBox>
  );
}
