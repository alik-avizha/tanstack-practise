import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  createRouter,
  createRootRoute,
  createRoute,
  RouterProvider,
  Outlet,
  Link,
} from "@tanstack/react-router";

import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

// Создаём корневой роут
const rootRoute = createRootRoute({
  component: () => (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

// Создаём дочерние роуты
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <div>Главная страница</div>,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: () => <div>О нас</div>,
});

// Собираем дерево роутов
const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

// Создаём экземпляр роутера
const router = createRouter({ routeTree });

// Регистрируем типы
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Точка входа в приложение
ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
