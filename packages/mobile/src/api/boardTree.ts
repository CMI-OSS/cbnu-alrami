import { useQuery } from "react-query";

import { AxiosResponse } from "axios";
import caxios from "src/api/caxios";

const fetchBoardTree = () => {
  return caxios.get<res.BoardTree[]>("/board-tree");
};

export const useBoardTree = () => {
  const response = useQuery<AxiosResponse<res.BoardTree[]>, Error>(
    "boardTree",
    fetchBoardTree,
    { staleTime: 3000, cacheTime: 3000 },
  );
  return response;
};

export const useCommonBoardTree = () => {
  return {
    data: useBoardTree()?.data?.data.find((res) => {
      return res.name === "공통";
    }),
  };
};

export const useCollegeBoardTree = () => {
  return {
    data: useBoardTree()?.data?.data.find((res) => {
      return res.name === "전공";
    }),
    breadCrumb: "전체 > 전공",
  };
};

export const useMajorBoardTree = (collegeId: number) => {
  const collegeData = useCollegeBoardTree()?.data?.children.find((res) => {
    return res.id === collegeId;
  });
  const majorData = collegeData?.children;
  return {
    data: majorData,
    breadCrumb: `전체 > 전공 > ${collegeData?.name}`,
  };
};

export const useLastChildBoardTree = (collegeId?: number, majorId?: number) => {
  if (collegeId && majorId) {
    const parentData = useMajorBoardTree(collegeId).data?.find((res) => {
      return res.id === majorId;
    });
    const childData = parentData?.children;

    return {
      data: childData,
      breadCrumb: `전체 > 전공 > ${parentData?.name}`,
    };
  }
  return {
    data: useCommonBoardTree()?.data?.children,
    breadCrumb: "전체 > 공통",
  };
};
