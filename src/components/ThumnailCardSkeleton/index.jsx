import {
  Container,
  SkeletonAnimater,
  CardSkeleton,
  ProfileWrapper,
  AvatarSkeleton,
  ButtonSkeleton,
} from "@/components/ThumnailCardSkeleton/style";

export default function ThumnailCardSkeleton() {
  return (
    <Container>
      <CardSkeleton>
        <SkeletonAnimater />
      </CardSkeleton>
      <ProfileWrapper>
        <AvatarSkeleton />
        <ButtonSkeleton />
      </ProfileWrapper>
    </Container>
  );
}
