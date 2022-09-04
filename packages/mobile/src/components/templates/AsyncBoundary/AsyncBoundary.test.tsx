import { useQuery } from "react-query";

import { fireEvent, render, waitFor } from "@testing-library/react";

import AsyncBoundary from ".";

const SuspenseFallback = () => {
  return <span data-testid="isLoading">로딩중</span>;
};

const ErrorFallback = ({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) => {
  return (
    <>
      <span data-testid="error-message">{error.message}</span>
      <button type="button" data-testid="retry-button" onClick={reset}>
        재시도
      </button>
    </>
  );
};

const renderAsyncBoundary = (key: string, mock: jest.Mock<any, any>) => {
  const Component = () => {
    useQuery(key, () => {
      return mock();
    });
    return <span data-testid="fetched-data">성공</span>;
  };

  return (
    <AsyncBoundary
      errorFallback={ErrorFallback}
      suspenseFallback={<SuspenseFallback />}
      fallBackHeight=""
    >
      <Component />
    </AsyncBoundary>
  );
};

describe("AsyncBoundary", () => {
  it("로딩", async () => {
    const { findByTestId } = render(renderAsyncBoundary("로딩", jest.fn()));
    await waitFor(() => {
      return expect(findByTestId("isLoading")).toBeTruthy();
    });
  });

  describe("에러 핸들링", () => {
    it("에러 발생", async () => {
      const mock = jest.fn().mockRejectedValue(new Error("에러"));
      const { findByTestId } = render(renderAsyncBoundary("에러", mock));

      await waitFor(() => {
        return expect(findByTestId("error-message")).toBeTruthy();
      });
    });

    it("에러 발생 후, 다시 시도", async () => {
      const mock = jest
        .fn()
        .mockRejectedValueOnce(new Error("에러"))
        .mockResolvedValueOnce({ data: "성공" });

      const { getByTestId, findByTestId } = render(
        renderAsyncBoundary("retry", mock),
      );

      await waitFor(() => {
        return expect(findByTestId("retry-button")).toBeTruthy();
      });

      fireEvent.click(getByTestId("retry-button"));

      await waitFor(() => {
        return expect(findByTestId("isLoading")).toBeTruthy();
      });
      await waitFor(() => {
        return expect(findByTestId("fetched-data")).toBeTruthy();
      });
    });

    it("데이터 fetch 완료", async () => {
      const mock = jest.fn().mockResolvedValueOnce({ data: "성공" });

      const { findByTestId } = render(renderAsyncBoundary("완료", mock));

      await waitFor(() => {
        return expect(findByTestId("isLoading")).toBeTruthy();
      });
      await waitFor(() => {
        return expect(findByTestId("fetched-data")).toBeTruthy();
      });
    });
  });
});
