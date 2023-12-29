import { useEffect, useState } from "react";

import {
  ContentsWrapper,
  Container,
  ThumnailImgBox,
} from "@/components/HomeThumnailCard/style";

import ThumnailImg from "@/components/ThumnailImg/ThumnailImg";
import CardBirthView from "@/components/CardBirthView/CardBirthView";
import CardTitle from "@/components/CardTitle/CardTitle";
import CardContent from "@/components/CardContent/CardContent";

export default function HomeThumnailCard() {
  const br = 21;
  const [cardContent, setCardContent] = useState("");
  const ment =
    "테스트용 멘트 입니다. 길게 쓰기가 정말 힘드네요. 하지만 노력해서 20자이상은 채워 보겠습니다.";
  //55
  const textRefine =
    ment.length > br
      ? ment.substring(0, br) + ment.substring(br, br * 2 - 1) + "..."
      : ment;

  useEffect(() => {
    setCardContent(textRefine);
  }, []);

  return (
    <Container>
      <ThumnailImgBox>
        <ThumnailImg thumnailSrc={"/images/test_thumnail.jpg"} />
      </ThumnailImgBox>
      <ContentsWrapper>
        <CardBirthView margin={"0 0 20px"} content={"2023.12.09"} />
        <CardTitle
          margin={"0 0 30px"}
          isThumnail={true}
          content={"여행의 순간들 기록하기"}
        />
        <CardContent isThumnail={true} content={cardContent} />
      </ContentsWrapper>
    </Container>
  );
}
