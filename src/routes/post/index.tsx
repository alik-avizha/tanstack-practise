import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPosts } from "../../api/posts.ts";

const postsQuery = queryOptions({
  queryKey: ["posts"],
  queryFn: () => getPosts(),

  // необходимо для работы  queryClient.cancelQueries
  // queryFn: ({ signal }) => getPosts(signal),

  // время жизни кеша до перезапроса (30с)
  staleTime: 30000,

  // удаление кеша через (20с)
  // gcTime: 20000,

  // выполнение запроса по условию
  enabled: true,

  // data которая попадает в кэш до выполения запроса (удобно для SSR поместить ответ запроса в initialData)
  // initialData: [
  //   {
  //     id: 1,
  //     title: "*****",
  //   },
  //   {
  //     id: 2,
  //     title: "*****",
  //   },
  // ],

  // до выполнения запроса (в кэш не попадат)
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

// const notfifationsQuery = queryOptions({
//   queryKey: ["notifications"],
//   queryFn: getNotifications,
//   refetchInterval: 3000,
// });

// https://www.youtube.com/watch?v=mg9Kq1YaENI закончил на 48 минуте (мутации)
export const Route = createFileRoute("/post/")({
  component: RouteComponent,
  // страница октроется только после подгрузки данных
  // loader: ({ context }) => context.queryClient.ensureQueryData(postsQuery),
});

function RouteComponent() {
  // логика с loader
  // const posts = Route.useLoaderData();

  // логика запрос уже на странице
  const { data: posts, isFetching } = useQuery(postsQuery);
  // const { data: notifications } = useQuery(notfifationsQuery);

  const client = useQueryClient();

  // useQueries
  // const [posts] = useQueries({
  //   queries: [1, 2, 3, 5].map((id) => ({
  //     queryKey: ["post", id],
  //     queryFn: () => getPostsById(id),
  //   })),
  // });

  // инвалидация данных по ключу
  const invalidatePosts = () =>
    client.invalidateQueries({ queryKey: ["posts"] }); //помечает данные как устаревшие
  // client.refetchQueries({ queryKey: ["posts"] }); //перезапрашивает
  // client.resetQueries({ queryKey: ["posts"] }); //удаляет из кэша данные
  // refetch()

  const cancelRequest = () => client.cancelQueries({ queryKey: ["posts"] });

  return (
    <div>
      {posts?.map((post) => (
        <div key={post.id}>
          {post.id}.{post.title}
        </div>
      ))}
      {isFetching && <div>ISFeting...</div>}
      {/*<div>{notifications?.notificationsCount}</div>*/}
      <button onClick={invalidatePosts}>Invalidate</button>
      <button onClick={cancelRequest}>Cancel</button>
    </div>
  );
}
