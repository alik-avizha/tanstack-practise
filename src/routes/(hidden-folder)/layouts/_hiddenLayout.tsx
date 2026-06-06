import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(hidden-folder)/layouts/_hiddenLayout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <p>Hello! I'm a layout but I'm not shown in the URL 🙈</p>
      <Link to="/layouts/foo">Short Foo</Link>{" "}
      <Link to="/layouts/bar">Short Bar</Link>
      <hr />
      <Outlet />
    </div>
  );
}
