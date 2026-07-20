import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  type User,
  type UsersPage,
  usersApi,
} from "../../api/users.ts";
import { USERS_QUERY_KEY } from "./users-query.ts";

export function useCreateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersApi.createUser,
    // optimistic update: сразу рисуем пользователя, откатываем при ошибке
    onMutate: async (newUser) => {
      await queryClient.cancelQueries({ queryKey: USERS_QUERY_KEY });

      const previousPages = queryClient.getQueriesData<UsersPage>({
        queryKey: USERS_QUERY_KEY,
      });

      const optimisticUser: User = {
        id: `temp-${crypto.randomUUID()}`,
        username: newUser.username,
        age: newUser.age,
      };

      queryClient.setQueriesData<UsersPage>(
        { queryKey: USERS_QUERY_KEY },
        (oldData) => {
          if (!oldData) return oldData;

          return {
            data: [optimisticUser, ...oldData.data],
            total: oldData.total + 1,
          };
        },
      );

      return { previousPages };
    },
    onError: (_error, _newUser, context) => {
      context?.previousPages.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },
    onSettled: () => {
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
