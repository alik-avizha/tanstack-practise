import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { usersApi } from "../../api/users.ts";

export const USERS_QUERY_KEY = ["users"] as const;

export const usersQueryKey = (page: number) =>
  [...USERS_QUERY_KEY, page] as const;

export function useUsersQuery({
  page = 1,
  limit = 5,
}: {
  page?: number;
  limit?: number;
} = {}) {
  return useQuery({
    queryKey: usersQueryKey(page),
    queryFn: () => usersApi.getUsers({ page, limit }),
    placeholderData: keepPreviousData,
  });
}
