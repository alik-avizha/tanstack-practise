import { api } from "./api.ts";

type Post = {
  id: number;
  title: string;
};

export function getPosts(signal?: AbortSignal) {
  return api.get<Post[]>("/posts", { signal }).then((res) => res.data);
}

export function getPostsById(id: number) {
  return api.get<Post[]>(`/posts/${id}`).then((res) => res.data);
}

export function getNotifications() {
  return api
    .get<{ notificationsCount: number }>("/notifications")
    .then((res) => res.data);
}
