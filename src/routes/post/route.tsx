import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/post")({
  staticData: { breadcrumb: "Post list" },
});
