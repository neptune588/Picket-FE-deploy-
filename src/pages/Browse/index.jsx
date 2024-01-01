import useBrwoseGetItem from "@/hooks/useBrwoseGetItem";

import Category from "@/components/Category/Category";
import ThumnailCard from "@/components/ThumnailCard";
import ThumnailCardSkeleton from "@/components/ThumnailCardSkeleton";
import TopButton from "@/components/TopButton/TopButton";

import { Container, CategoryBox, SubTitle } from "@/pages/Browse/style";

export default function Browse() {
  const {
    dummy,
    cardData,
    categoryData,
    isLoading,
    dummyObserver,
    observerRef,
    handleCategoryClick,
  } = useBrwoseGetItem();
  const titleViewLength = 15;
  return (
    <>
      <SubTitle>오늘의 추천 버킷리스트를 발견 해보세요.</SubTitle>
      <TopButton
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
      />
      <CategoryBox>
        {categoryData.map((category, idx) => {
          return (
            <Category
              key={category.id}
              isActive={category.activeState}
              content={category.content}
              onClick={handleCategoryClick(idx, category.query)}
            />
          );
        })}
      </CategoryBox>
      <Container>
        {cardData.map((card) => {
          return (
            <ThumnailCard
              key={"boardKey" + card.boardId}
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
      <div style={{ height: "2000px" }} ref={dummyObserver}></div>
      <div ref={observerRef}></div>
    </>
  );
}
