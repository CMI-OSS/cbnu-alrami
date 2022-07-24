import { useQuery } from "react-query";

import { AxiosResponse } from "axios";
import caxios from "src/api/caxios";

const fetchBoardTree = () => {
  caxios.defaults.headers.common = {
    uuid: "1111",
  };
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
    ...useBoardTree(),
    data: useBoardTree()?.data?.data.find((res) => res.name === "공통"),
  };
};

export const useCollegeBoardTree = (collegeId: number) => {
  const collegeData = useBoardTree()
    ?.data?.data.find((res) => res.name === "전공")
    ?.children.find((res) => res.id === collegeId);
  const majorData = collegeData?.children;
  return {
    ...useBoardTree(),
    data: majorData,
    breadCrumb: `전체 > 전공 > ${collegeData?.name}`,
  };
};

export const useMajorBoardTree = () => {
  return {
    ...useBoardTree(),
    data: useBoardTree()?.data?.data.find((res) => res.name === "전공"),
    breadCrumb: "전체 > 전공",
  };
};

export const useLastChildBoardTree = (collegeId?: number, majorId?: number) => {
  if (collegeId && majorId) {
    const parentData = useCollegeBoardTree(collegeId).data?.find(
      (res) => res.id === majorId,
    );
    const childData = parentData?.children;

    return {
      ...useCommonBoardTree(),
      data: childData,
      breadCrumb: `전체 > 전공 > ${parentData?.name}`,
    };
  }
  return {
    ...useCommonBoardTree(),
    data: useCommonBoardTree()?.data?.children,
    breadCrumb: "전체 > 공통",
  };
};
