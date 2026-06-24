import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type User, usersApi } from "../../api/users.ts";
import { USERS_QUERY_KEY, usersQueryKey } from "./users-query.ts";

export function useCreateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersApi.createUser,
    onSuccess: (data) => {
      //   queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
      // не забываем про иммутабельность! Данные менять нельзя, только возвращать новые
      queryClient.setQueryData(USERS_QUERY_KEY, (oldData: User[]) => [
        data,
        ...oldData,
      ]);
    },
    onError: () => {
      console.log("User creation failed");
    },
    onSettled: () => {
      // вызывается всегда в конце
      console.log("User creation settled");
    },
  });
}

// Optimistic update
// export function useCreateUserMutation() {
//   const queryClient = useQueryClient();
//
//   return useMutation({
//     mutationFn: usersApi.createUser,
//
//     onMutate: async (newUser) => {
//       await queryClient.cancelQueries({
//         queryKey: usersQueryKey(1),
//       });
//
//       const previousUsers = queryClient.getQueryData(usersQueryKey(1));
//
//       queryClient.setQueryData(usersQueryKey(1), (oldData: any) => {
//         if (!oldData) return oldData;
//
//         return {
//           ...oldData,
//           data: [
//             {
//               ...newUser,
//               id: crypto.randomUUID(),
//             },
//             ...oldData.data,
//           ],
//           total: oldData.total + 1,
//         };
//       });
//
//       return { previousUsers };
//     },
//
//     onSuccess: (serverUser) => {
//       queryClient.setQueryData(usersQueryKey(1), (oldData: any) => {
//         if (!oldData) return oldData;
//
//         return {
//           ...oldData,
//           data: oldData.data.map((u: User) =>
//             u.username === serverUser.username ? serverUser : u,
//           ),
//         };
//       });
//     },
//
//     onError: (_, __, context) => {
//       queryClient.setQueryData(usersQueryKey(1), context?.previousUsers);
//     },
//   });
// }

export function useDeleteUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersApi.deleteUser,

    onSuccess: (_, id) => {
      queryClient.setQueryData(usersQueryKey(1), (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          data: oldData.data.filter((user: User) => user.id !== id),
          total: oldData.total - 1,
        };
      });
    },
  });
}
