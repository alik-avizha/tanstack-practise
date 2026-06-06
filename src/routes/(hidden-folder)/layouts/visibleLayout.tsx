import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(hidden-folder)/layouts/visibleLayout")({
  component: RouteComponent,
  notFoundComponent: () => (
    <div>I'm the Not found page, inside /visibleLayout</div>
  ),
});

function RouteComponent() {
  return (
    <div>
      <p>This layout is visible in the URL 👀</p>
      <Link to="/layouts/visibleLayout/foo">Foo</Link>{" "}
      <Link to="/layouts/visibleLayout/bar">Bar</Link>
      <hr />
      <Outlet />
    </div>
  );
}
