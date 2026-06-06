import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: RouteComponent,
  staticData: {
    breadcrumb: ["Private", "Dashboard"],
  },
});

function RouteComponent() {
  return <div>Hello "/_authenticated/dashboard"!</div>;
}
