import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(hidden-folder)/layouts/visibleLayout/bar",
)({
  staticData: { breadcrumb: "Bar" },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neon-pink/20 flex items-center justify-center">
        <span className="text-3xl">📊</span>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Bar Page</h3>
      <p className="text-gray-400">
        This is the Bar page within the visible layout
      </p>
    </div>
  );
}
