import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "@/services/api";

import { categoriesData } from "@/pages/Browse/categoryData";

export default function useBrwoseGetItem() {
  const dispatch = useDispatch();

  const [dummy, setDummy] = useState([
    { id: "sklt01" },
    { id: "sklt02" },
    { id: "sklt03" },
    { id: "sklt04" },
    { id: "sklt05" },
    { id: "sklt06" },
    { id: "sklt07" },
    { id: "sklt08" },
  ]);
  const [cardData, setCardData] = useState([]);
  const [categoryData, setCategoryData] = useState([...categoriesData]);
  const [categoryQueries, setCategoryQueries] = useState([]);

  const [lastPage, setLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const mounted01 = useRef(false);
  const mounted02 = useRef(false);

  /*   const dataReset = () => {
        setPage({ ...page, queryValue: 0 });
    setBoardId({ queryString: "&lastBoardId", queryValue: null });
    setLastPage(false);

    setCardData([]);
  }; */

  const activeAllCategory = () => {
    return categoryData.map((data, idx) => {
      return {
        ...data,
        activeState: idx === 0 ? true : false,
      };
    });
  };
  const activeCategory = (nowNumber) => {
    return categoryData.map((data, idx) => {
      if (idx === 0) {
        return { ...data, activeState: false };
      } else {
        return {
          ...data,
          activeState: idx === nowNumber ? !data.activeState : data.activeState,
        };
      }
    });
  };
  const categoryQueryCheck = (query) => {
    const inspcet = [...categoryQueries];

    inspcet.indexOf(query) > -1 ? inspcet.push(query) : inspcet.splice(query);

    return inspcet;
  };

  const handleCategoryClick = (activeNum) => {
    return () => {
      if (activeNum === 0) {
        setCategoryData(activeAllCategory());
        setCategoryQueries(null);
      } else {
        //바꾼배열 반환받아서 검사 후 효과적용
        const condition = activeCategory(activeNum).every((data) => {
          return data.activeState === false;
        });

        if (condition) {
          activeAllCategory();
          setCategoryQueries(null);
        } else {
          activeCategory(activeNum);
          setCategoryQueries(categoryQueryCheck(activeNum));
        }
      }
    };
  };

  const cardReq = async (query = "") => {
    try {
      setIsLoading(true);
      const { data } = await getData(`/board/list/search?${query}`);

      console.log(data);
      if (data.last) {
        //마지막페이지 검증로직
        //라스트페이지면 스켈레톤x axios호출x
        setLastPage(true);
        setCardData((prev) => [...prev, ...data.content]);

        setIsLoading(false);

        return;
      } else {
        setCardData((prev) => [...prev, ...data.content]);

        setIsLoading(false);
      }
    } catch (error) {
      console.error("error는", error);
    }
  };

  //시작시 리스트 불러옴
  useEffect(() => {
    cardReq("page=0");
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  useEffect(() => {
    if (!mounted01) {
      mounted01.current = true;
    } else {
      cardReq(parameter);
    }
  }, [parameter]);

  const { ref: observerRef } = useInView({
    threshold: 0.1,
    onChange: (view) => {
      //스크롤 내렸을때 라스트페이지가 아닐때
      if (view && !lastPage) {
      }
    },
  });

  return {
    dummy,
    categoryData,
    cardData,
    isLoading,
    observerRef,
    handleCategoryClick,
  };
}

/*   const handleCategoryCheck = (nowCateNum) => {
    const res = categoryData.map((obj, idx) => {
      return {
        ...obj,
        activeState: nowCateNum === idx ? !obj.activeState : obj.activeState,
      };
    });
    return res;
  }; */
