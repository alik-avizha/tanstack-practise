import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(hidden-folder)/layouts/visibleLayout")({
  component: RouteComponent,
  staticData: { breadcrumb: "Layouts" },
  notFoundComponent: () => (
    <div className="p-8 text-center">
      <p className="text-neon-pink">I'm the Not found page, inside /visibleLayout</p>
    </div>
  ),
});

function RouteComponent() {
  return (
    <div className="min-h-[calc(100vh-200px)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Layout Header */}
        <div className="neon-card p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-neon-purple/10 text-neon-purple">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Visible Layout</h2>
              <p className="text-sm text-gray-400">This layout is visible in the URL 👀</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2">
            <Link
              to="/layouts/visibleLayout/foo"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-neon-cyan hover:bg-dark-700 border border-transparent hover:border-neon-cyan/30 transition-all duration-300"
            >
              Foo
            </Link>
            <Link
              to="/layouts/visibleLayout/bar"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-neon-cyan hover:bg-dark-700 border border-transparent hover:border-neon-cyan/30 transition-all duration-300"
            >
              Bar
            </Link>
          </div>
        </div>

        {/* Outlet Content */}
        <div className="neon-card p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
