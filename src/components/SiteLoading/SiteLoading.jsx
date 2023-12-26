import styled from "styled-components";
import spinner from "@/assets/spinner.gif";
import { useState, useEffect } from "react";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.4);
`;

const SpinnerBox = styled.img`
  user-select: none;
`;

const TextBox = styled.p`
  margin-top: -20px;
  color: ${({ theme: { colors } }) => {
    return colors.gray["80"];
  }};
  font-size: ${({ theme: { typo } }) => {
    return typo.size.xl;
  }};
  font-weight: ${({ theme: { typo } }) => {
    return typo.weight.semiBold;
  }};
`;
export default function SiteLoading() {
  let count = 0;
  const [dot, setDot] = useState("");

  useEffect(() => {
    dotRepeat();
  }, []);

  const dotRepeat = () => {
    const base = "·";

    setInterval(() => {
      setDot((prev) => prev + base);
      count++;

      if (count === 4) {
        setDot("");
        count = 0;
      }
    }, 500);
  };
  return (
    <Wrapper>
      <SpinnerBox src={spinner} alt="로딩중" />
      <TextBox>잠시만 기다려 주세요{dot}</TextBox>
    </Wrapper>
  );
}
