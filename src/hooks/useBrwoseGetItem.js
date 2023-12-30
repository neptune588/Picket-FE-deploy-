import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { getData } from "@/services/api";

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
  const [page, setPage] = useState(0);
  const [boardId, setBoardId] = useState(null);
  const [params, setParams] = useState("");
  const [lastPage, setLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const mounted = useRef(false);

  const cardReq = async (query = "") => {
    try {
      setIsLoading(true);
      const { data } = await getData(`/board/list/search${query}`);

      //마지막페이지 검증로직
      if (data.last) {
        //라스트페이지면 스켈레톤x axios호출x
        setIsLoading(false);

        setLastPage(true);
        setCardData((prev) => [...prev, ...data.content]);

        return;
      } else {
        setIsLoading(false);
        setPage((prev) => prev + 1);

        setCardData((prev) => [...prev, ...data.content]);
        setBoardId(data.content[data.content.length - 1].boardId);
      }
    } catch (error) {
      console.error("error는", error);
    }
  };

  useEffect(() => {
    cardReq();
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      setParams(`?page=${page}&lastBoardId=${boardId}`);
    }
  }, [page, boardId]);

  const { ref: observerRef } = useInView({
    threshold: 0.1,
    onChange: (view) => {
      //스크롤 내렸을때 라스트페이지가 아닐때
      if (view && !lastPage) {
        cardReq(params);
      }
    },
  });

  /*     const {
    data,
    isPending,
    refetch: itemRefetch,
  } = useQuery({
    queryKey: ["browseItems", params],
    queryFn: async (query) => {
      const res = await getData(`/board/list/search`);
      return res;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchIntervalInBackground: false,
    refetchInterval: false,
    staleTime: Infinity,
  }); */

  return {
    dummy,
    cardData,
    isLoading,
    observerRef,
  };
}
