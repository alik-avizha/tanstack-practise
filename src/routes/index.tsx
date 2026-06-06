import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  staticData: { breadcrumb: "Home" },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/"!</div>;
}
