import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPosts } from "../../api/posts.ts";

const postsQuery = queryOptions({
  queryKey: ["posts"],
  // signal нужен, чтобы cancelQueries реально прерывал HTTP-запрос
  queryFn: ({ signal }) => getPosts(signal),

  // время жизни кеша до перезапроса (30с)
  staleTime: 30000,

  // удаление кеша через (20с)
  // gcTime: 20000,

  // data которая попадает в кэш до выполнения запроса (удобно для SSR)
  // initialData: [...],

  // до выполнения запроса (в кэш не попадает)
  placeholderData: [
    {
      id: 1,
      title: "*****",
    },
    {
      id: 2,
      title: "*****",
    },
  ],
});

export const Route = createFileRoute("/post/")({
  component: RouteComponent,
  // страница откроется после ensureQueryData; useQuery ниже возьмёт данные из того же кеша
  loader: ({ context }) => context.queryClient.ensureQueryData(postsQuery),
});

function RouteComponent() {
  const { data: posts, isFetching } = useQuery(postsQuery);
  const client = useQueryClient();

  const invalidatePosts = () =>
    client.invalidateQueries({ queryKey: ["posts"] });

  const cancelRequest = () => client.cancelQueries({ queryKey: ["posts"] });

  return (
    <div>
      {posts?.map((post) => (
        <div key={post.id}>
          {post.id}.{post.title}
        </div>
      ))}
      {isFetching && <div>Is fetching...</div>}
      <button onClick={invalidatePosts}>Invalidate</button>
      <button onClick={cancelRequest}>Cancel</button>
    </div>
  );
}
