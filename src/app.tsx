import "./index.css";
import {
  createRouteMask,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useAuth } from "./hooks/use-auth.ts";

const stepsMask = createRouteMask({
  routeTree,
  from: "/steps",
  to: "/steps",
  search: (prev) => ({ ...prev, step: undefined }),
});

const router = createRouter({
  routeTree,
  context: { authentication: undefined! },
  defaultNotFoundComponent: () => <div>Global Not Found :(</div>,
  routeMasks: [stepsMask],
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const App = () => {
  const authentication = useAuth();
  return <RouterProvider router={router} context={{ authentication }} />;
};
