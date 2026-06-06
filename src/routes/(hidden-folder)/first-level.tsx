import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(hidden-folder)/first-level")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(hidden-folder)/first-level"!</div>;
}
