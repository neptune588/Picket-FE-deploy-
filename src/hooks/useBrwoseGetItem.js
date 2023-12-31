import { useEffect, useState, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { getData } from "@/services/api";

import { categoriesData } from "@/pages/Browse/categoryData";

export default function useBrwoseGetItem() {
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
  const [page, setPage] = useState({
    queryString: "?page=",
    queryValue: 0,
  });
  const [boardId, setBoardId] = useState({
    queryString: "&lastBoardId", //&lastBoardId=
    queryValue: "",
  });
  const [categoryQuery, setCategoryQuery] = useState({
    queryString: "&categoryList", //&categoryList=
    queryValueList: [],
  });
  const [searchQuery, setSearchQuery] = useState({
    queryString: "&keyword", //&keyword=
    queryValue: "",
  });

  const [params, setParams] = useState("");
  const [changeParma, setChangeParam] = useState(false);
  const [lastPage, setLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const mounted01 = useRef(false);
  const mounted02 = useRef(false);
  const mounted03 = useRef(false);

  const dataReset = () => {
    setPage({ ...page, queryValue: 0 });
    setBoardId({ queryString: "&lastBoardId", queryValue: null });
    setLastPage(false);

    setCardData([]);
  };

  const handleCategoryClick = (activeNum) => {
    return () => {
      //전체 카테고리 클릭
      if (activeNum === 0) {
        //전체를 제외한 나머지 카테고리 비활성화
        //그 말즉슨 쿼리스트링 초기화
        const categories = [...categoriesData];
        categories.forEach((obj) => {
          obj.activeState = false;
        });

        categories[0].activeState = true;

        //active 적용
        setCategoryData([...categories]);

        dataReset();
        //전체 카테고리는 categoryquery가 필요가 없으므로 초기화.
        setCategoryQuery({ queryString: "&categoryList", queryValueList: [] });
      } else {
        //전체를 제외한 카테고리 선택했을시 전체 카테고리 비활성화
        //카테고리가 바뀌었으므로 page,boardid등을 초기화하고 다시 받아와야함.
        const categories = [...categoriesData];
        categories[activeNum].activeState = !categories[activeNum].activeState;
        categories[0].activeState = false;
        setCategoryData([...categories]);

        //이미 있는쿼리인지 없는쿼리인지 확인 로직
        //카테고리 눌렀으니까 데이터 리셋
        const condition = categoryQuery.queryValueList.indexOf(activeNum);
        if (condition === -1) {
          const refine = [];
          refine.push(activeNum);

          //카테고리 설정
          setCategoryQuery((prev) => {
            return {
              ...prev,
              queryString: "&categoryList=",
              queryValueList: [...prev.queryValueList, ...refine],
            };
          });

          dataReset();
        } else {
          //카테고리가 1개남아있는 상태에서 같은 카테고리를 눌렀는지 체크하는 로직
          //활성화효과만 되돌려주고 데이터는 리셋x 다시받아올필요x
          const condition = categoryData.every((obj) => {
            return obj.activeState === false;
            //맞으면 true
          });

          if (condition) {
            const categories = [...categoriesData];
            categories[activeNum].activeState = true;

            setCategoryData([...categories]);
            return;
          } else {
            const refine = [...categoryQuery.queryValueList];
            refine.splice(condition, 1);

            setCategoryQuery((prev) => {
              return {
                ...prev,
                queryValueList: [...refine],
              };
            });
            dataReset();
          }
        }
      }
    };
  };
  //처음에는 쿼리스트링 없이 요청하면 8개의 데이터(카테고리all)가 온다.
  //데이터를 받은후 pageparmas와 lastboardid를 설정해준다.
  const cardReq = async (query = "") => {
    try {
      setIsLoading(true);
      const { data } = await getData(`/board/list/search${query}`);

      console.log(data);
      //마지막페이지 검증로직
      if (data.last) {
        //라스트페이지면 스켈레톤x axios호출x
        setLastPage(true);
        setCardData((prev) => [...prev, ...data.content]);

        setIsLoading(false);

        return;
      } else {
        setPage((prev) => {
          return {
            ...prev,
            queryValue: prev.queryValue + 1,
          };
        });
        setBoardId((prev) => {
          return {
            ...prev,
            queryString: "&lastBoardId=",
            queryValue: data.content[data.content.length - 1].boardId,
          };
        });
        setCardData((prev) => [...prev, ...data.content]);

        setIsLoading(false);
      }
    } catch (error) {
      console.error("error는", error);
    }
  };

  //시작시 리스트 불러옴
  useEffect(() => {
    cardReq();
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  //page,boardId가 적용이 됐다면 파라미터에 적용.
  useEffect(() => {
    if (!mounted01.current) {
      mounted01.current = true;
    } else {
      const pageParam = page.queryString + page.queryValue;
      const categoryParam =
        categoryQuery.queryString + categoryQuery.queryValueList.join(",");
      const kewordParam = searchQuery.queryString + searchQuery.queryValue;
      const boardIdParam = boardId.queryString + boardId.queryValue;

      setParams(pageParam + categoryParam + kewordParam + boardIdParam);
    }
  }, [page, boardId]);

  useEffect(() => {
    if (!mounted02.current) {
      mounted02.current = true;
    } else {
      const pageParam = page.queryString + page.queryValue;
      const categoryParam =
        categoryQuery.queryString + categoryQuery.queryValueList.join(",");
      const kewordParam = searchQuery.queryString + searchQuery.queryValue;
      const boardIdParam = boardId.queryString + boardId.queryValue;

      setParams(pageParam + categoryParam + kewordParam + boardIdParam);
      cardReq(params);
    }
  }, [categoryQuery]);

  /*   useEffect(() => {
    if (!mounted03.current) {
      mounted03.current = true;
    } else {
      cardReq(params);
    }
  }, [changeParma]); */

  const { ref: observerRef } = useInView({
    threshold: 0.1,
    onChange: (view) => {
      //스크롤 내렸을때 라스트페이지가 아닐때
      if (view && !lastPage) {
        cardReq(params);
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
