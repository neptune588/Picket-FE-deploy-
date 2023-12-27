import styled, { keyframes } from "styled-components";

const Container = styled.div`
  width: 290px;
  user-select: none;
`;

const Animation = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const SkeletonAnimater = styled.div`
  width: 100%;
  height: 290px;
  border-radius: 15px;
  background: linear-gradient(
    90deg,
    rgba(198, 198, 205, 0.8) 25%,
    rgba(198, 198, 205, 0.5) 50%,
    rgba(198, 198, 205, 0.8) 75%
  );
  background-size: 200% 100%;
  animation: ${Animation} 1.8s linear infinite;
`;

const CardSkeleton = styled.div`
  position: relative;
  height: 290px;
  margin-top: 40px;
  &::after {
    content: "";
    display: block;
    position: absolute;
    left: 20px;
    bottom: 20px;
    width: 70%;
    height: 20px;
    border-radius: 15px;
    background: linear-gradient(90deg, #e9e9ee 30%, #f5f5f9 50%, #e9e9ee 75%);
    background-size: 200% 100%;
    animation: ${Animation} 2s linear infinite;
  }
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const AvatarSkeleton = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(90deg, #e9e9ee 30%, #f5f5f9 50%, #e9e9ee 75%);
  background-size: 200% 100%;
  animation: ${Animation} 2s linear infinite;
`;

const ButtonSkeleton = styled.div`
  display: block;
  width: calc(90% - 24px);
  height: 24px;
  border-radius: 15px;
  background: linear-gradient(90deg, #e9e9ee 30%, #f5f5f9 50%, #e9e9ee 75%);
  background-size: 200% 100%;
  animation: ${Animation} 2s linear infinite;
`;

export {
  Container,
  SkeletonAnimater,
  CardSkeleton,
  ProfileWrapper,
  AvatarSkeleton,
  ButtonSkeleton,
};
