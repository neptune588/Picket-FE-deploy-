import { useEffect, useState } from "react";
import {
  ContentsWrapper,
  Container,
  ThumnailImgBox,
  Dday,
} from "@/components/HomeThumnailCard/style";

import ThumnailImg from "@/components/ThumnailImg/ThumnailImg";
import CardBirthView from "@/components/CardBirthView/CardBirthView";
import CardTitle from "@/components/CardTitle/CardTitle";
import CardContent from "@/components/CardContent/CardContent";

import { getData } from "@/services/api";


export default function HomeThumnailCard( {props, onModal} ) {
  const br = 21;
  const [cardContent, setCardContent] = useState("");
  const ment = props.content.length > 0 ? props.content : ""; //55
  const textRefine =
    ment.length > br
      ? ment.substring(0, br) + ment.substring(br, br * 2 - 1) + "..."
      : ment;

  const getDday = (dateString) => {
    const today = new Date();
    const targetDate = new Date(dateString);
    const timeDiff = targetDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return daysLeft === 0 ? "D-day" : `D-${daysLeft}`;
  };

  useEffect(() => {
    setCardContent(textRefine);
  }, []);

  return (
    <Container onClick={onModal}>
      <ThumnailImgBox>
        <ThumnailImg
          thumnailSrc={
            props.filepath ? props.filepath : "/images/test_thumnail.jpg"
          }
        />
        <Dday>{getDday(props.deadline)}</Dday>
      </ThumnailImgBox>
      <ContentsWrapper>
        <CardBirthView margin={"0 0 20px"} content={props.deadline} />
        <CardTitle
          margin={"0 0 30px"}
          isThumnail={true}
          content={props.title.length > 0 ? props.title : "untitled"}
        />
        <CardContent isThumnail={true} content={textRefine} />
      </ContentsWrapper>
    </Container>
  );
}
