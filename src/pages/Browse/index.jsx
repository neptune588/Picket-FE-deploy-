import { useEffect, useState } from "react";

import Categories from "@/components/Categories/Categories";
import ThumnailCard from "@/components/ThumnailCard";
import ThumnailCardSkeleton from "@/components/ThumnailCardSkeleton";

import { Container, SubTitle } from "@/pages/Browse/style";

export default function Browse() {
  const [temp, setTemp] = useState(Array.from({ length: 12 }));
  const [tempLoading, setTempLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setTempLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      <SubTitle>오늘의 추천 버킷리스트를 발견 해보세요.</SubTitle>
      <Categories />
      <Container>
        {temp.map((idx) => {
          if (tempLoading) {
            return (
              <ThumnailCardSkeleton
                key={idx}
                width={"290px"}
                height={"290px"}
              />
            );
          } else {
            return (
              <ThumnailCard
                key={`${idx}test`}
                width={"290px"}
                height={"290px"}
              />
            );
          }
        })}
      </Container>
    </>
  );
}
