import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import type { AuthContext } from "../hooks/use-auth.ts";
import { Header } from "../compoents/header.tsx";
import { RouterBreadcrumb } from "../compoents/navigation/router-breadcrumb.tsx";

type RouterContext = {
  authentication: AuthContext;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <h1>My App</h1>
      <Header />
      <RouterBreadcrumb />
      <Outlet />
    </>
  ),
});
