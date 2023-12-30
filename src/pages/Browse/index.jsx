import useBrwoseGetItem from "@/hooks/useBrwoseGetItem";

import Categories from "@/components/Categories/Categories";
import ThumnailCard from "@/components/ThumnailCard";
import ThumnailCardSkeleton from "@/components/ThumnailCardSkeleton";

import { Container, SubTitle } from "@/pages/Browse/style";

export default function Browse() {
  const { dummy, cardData, isLoading, observerRef } = useBrwoseGetItem();
  const titleViewLength = 15;
  return (
    <>
      <SubTitle>오늘의 추천 버킷리스트를 발견 해보세요.</SubTitle>
      <Categories />
      <Container>
        {cardData.map((card) => {
          return (
            <ThumnailCard
              key={card.boardId}
              width={"290px"}
              height={"290px"}
              title={
                card.title.length > titleViewLength
                  ? card.title.substring(0, titleViewLength) + "..."
                  : card.title
              }
              //thumnailSrc={card.filepath}
              //avatarSrc={card.filename}
              nickname={card.nickname}
              likeCount={card.likeCount}
              scrapCount={card.scrapCount}
            />
          );
        })}
        {isLoading &&
          dummy.map((dummyContent) => {
            return (
              <ThumnailCardSkeleton
                key={dummyContent.id}
                width={"290px"}
                height={"290px"}
              />
            );
          })}
      </Container>
      <div ref={observerRef}></div>
    </>
  );
}
