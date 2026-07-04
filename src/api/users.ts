import { api } from "./api";

export type User = {
  id: string;
  username: string;
  age: number;
};

export type UsersPage = {
  data: User[];
  total: number;
};

export const usersApi = {
  getUsers: ({ page, limit }: { page: number; limit: number }) =>
    api
      .get<User[]>("/users", { params: { _page: page, _limit: limit } })
      .then((res) => {
        const data = res.data;
        const total = Number(res.headers["x-total-count"] ?? 0);

        return { data, total } satisfies UsersPage;
      }),
  createUser: (user: { username: string; age: number }) =>
    api.post<User>("/users", user).then((res) => res.data),
  updateUser: (user: User) =>
    api.put<User>(`/users/${user.id}`, user).then((res) => res.data),
  deleteUser: (id: string) =>
    api.delete<void>(`/users/${id}`).then(() => id),
};
