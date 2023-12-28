import {
  Container,
  SkeletonAnimater,
  CardSkeleton,
  ProfileWrapper,
  AvatarSkeleton,
  ButtonSkeleton,
} from "@/components/ThumnailCardSkeleton/style";

export default function ThumnailCardSkeleton({ width, height }) {
  return (
    <Container $width={width}>
      <CardSkeleton $height={height}>
        <SkeletonAnimater $height={height} />
      </CardSkeleton>
      <ProfileWrapper>
        <AvatarSkeleton />
        <ButtonSkeleton />
      </ProfileWrapper>
    </Container>
  );
}
