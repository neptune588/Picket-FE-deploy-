import { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import Categories from "@/components/Categories/Categories";
import ThumnailCard from "@/components/ThumnailCard";
import ThumnailCardSkeleton from "@/components/ThumnailCardSkeleton";

import { Container, SubTitle } from "@/pages/Browse/style";

export default function Browse() {
  const [loadingViewLength, setLoadingViewLength] = useState(
    Array.from({ length: 8 })
  );
  const [pageParam, setPageParam] = useState(0);

  return (
    <>
      <SubTitle>오늘의 추천 버킷리스트를 발견 해보세요.</SubTitle>
      <Categories />
      <Container>
        <div></div>
      </Container>
    </>
  );
}
