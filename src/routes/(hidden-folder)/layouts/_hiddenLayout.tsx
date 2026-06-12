import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(hidden-folder)/layouts/_hiddenLayout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-[calc(100vh-200px)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Layout Header */}
        <div className="neon-card p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-neon-green/10 text-neon-green">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Hidden Layout</h2>
              <p className="text-sm text-gray-400">I'm a layout but I'm not shown in the URL 🙈</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2">
            <Link
              to="/layouts/foo"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-neon-green hover:bg-dark-700 border border-transparent hover:border-neon-green/30 transition-all duration-300"
            >
              Short Foo
            </Link>
            <Link
              to="/layouts/bar"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-neon-green hover:bg-dark-700 border border-transparent hover:border-neon-green/30 transition-all duration-300"
            >
              Short Bar
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
