import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import type { AuthContext } from "../hooks/use-auth.ts";
import { Header } from "../compoents/header.tsx";

type RouterContext = {
  authentication: AuthContext;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <h1>My App</h1>
      <Header />
      <Outlet />
    </>
  ),
});
