import type {
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export type CustomQueryOptions<T, U> = UseQueryOptions<
  T,
  AxiosError,
  U extends null ? T : U
> & {
  queryKey: QueryKey;
  queryFn: QueryFunction<T, QueryKey>;
};

export function useCoreQuery<T, U = null>(
  keyName: QueryKey,
  query: QueryFunction<T, QueryKey>,
  options?: Omit<CustomQueryOptions<T, U>, "queryKey" | "queryFn">,
): UseQueryResult<U extends null ? T : U, AxiosError> {
  return useQuery(keyName, query, {
    onError: (err) => {
      return console.error(err);
    },
    ...options,
  });
}

export function useCoreMutation<T, U>(
  mutation: MutationFunction<T, U>,
  options?: UseMutationOptions<T, AxiosError, U>,
): UseMutationResult<T, AxiosError, U> {
  return useMutation(mutation, {
    onError: (err) => {
      return console.error(err);
    },
    ...options,
  });
}

export function useCoreInfiniteQuery<T>(
  keyName: QueryKey,
  query: QueryFunction<T, QueryKey>,
  options?: UseInfiniteQueryOptions<T, AxiosError>,
): UseInfiniteQueryResult<T, AxiosError> {
  return useInfiniteQuery(keyName, query, {
    onError: (err) => {
      return console.error(err);
    },
    ...options,
  });
}
