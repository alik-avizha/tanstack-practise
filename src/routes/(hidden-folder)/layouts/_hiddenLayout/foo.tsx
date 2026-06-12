import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(hidden-folder)/layouts/_hiddenLayout/foo",
)({
  staticData: { breadcrumb: "Foo" },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neon-green/20 flex items-center justify-center">
        <span className="text-3xl">✨</span>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Foo Page (Hidden)</h3>
      <p className="text-gray-400">
        This is the Foo page within the hidden layout
      </p>
    </div>
  );
}
