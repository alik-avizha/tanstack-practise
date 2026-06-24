import "./index.css";
import {
  createRouteMask,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useAuth } from "./hooks/use-auth.ts";
import type { BreadcrumbValue } from "./compoents/navigation/router-breadcrumb.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const stepsMask = createRouteMask({
  routeTree,
  from: "/steps",
  to: "/steps",
  search: (prev) => ({ ...prev, step: undefined }),
});

const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     // глобальная жизнь кеша
  //     staleTime: 1000 * 60 * 5,
  //   },
  // },
});

const router = createRouter({
  routeTree,
  context: { authentication: undefined!, queryClient },
  scrollRestoration: true,
  defaultNotFoundComponent: () => <div>Global Not Found :(</div>,
  routeMasks: [stepsMask],
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }

  interface StaticDataRouteOption {
    breadcrumb?: BreadcrumbValue;
  }
}

export const App = () => {
  const authentication = useAuth();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        router={router}
        context={{ authentication, queryClient }}
      />
    </QueryClientProvider>
  );
};
