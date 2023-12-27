import Categories from "@/components/Categories/Categories";
import ThumnailCard from "@/components/ThumnailCard";

import { Container, SubTitle } from "@/pages/Browse/style";

export default function Browse() {
  return (
    <>
      <SubTitle>오늘의 추천 버킷리스트를 발견 해보세요.</SubTitle>
      <Categories />
      <Container>
        <ThumnailCard />
        <ThumnailCard />
        <ThumnailCard />
        <ThumnailCard />
        <ThumnailCard />
        <ThumnailCard />
        <ThumnailCard />
        <ThumnailCard />
        <ThumnailCard />
        <ThumnailCard />
        <ThumnailCard />
        <ThumnailCard />
      </Container>
    </>
  );
}
