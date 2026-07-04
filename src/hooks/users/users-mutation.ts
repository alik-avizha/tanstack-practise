import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type UsersPage, usersApi } from "../../api/users.ts";
import { USERS_QUERY_KEY } from "./users-query.ts";

export function useCreateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },
  });
}

export function useDeleteUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersApi.deleteUser,
    onSuccess: (_, id) => {
      queryClient.setQueriesData<UsersPage>(
        { queryKey: USERS_QUERY_KEY },
        (oldData) => {
          if (!oldData) return oldData;

          return {
            data: oldData.data.filter((user) => user.id !== id),
            total: Math.max(0, oldData.total - 1),
          };
        },
      );
    },
  });
}
