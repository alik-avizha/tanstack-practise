import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/post/$id")({
  staticData: {
    breadcrumb: (match) => `#${match.params.id}`,
  },
});
