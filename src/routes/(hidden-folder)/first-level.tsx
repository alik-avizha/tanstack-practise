import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(hidden-folder)/first-level")({
  staticData: { breadcrumb: "First Level" },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-[calc(100vh-200px)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-neon-cyan to-neon-pink p-1">
            <div className="w-full h-full rounded-full bg-dark-700 flex items-center justify-center">
              <svg className="w-10 h-10 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-cyan to-neon-pink bg-clip-text text-transparent mb-4">
            First Level Page
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            This is a sample page demonstrating the styled routing system
          </p>
        </div>

        {/* Content Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="neon-card p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-neon-cyan/10 text-neon-cyan">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Information</h3>
            </div>
            <p className="text-gray-400">
              This page is part of a hidden folder structure in the routing system, 
              demonstrating flexible route organization.
            </p>
          </div>

          <div className="neon-card p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-neon-pink/10 text-neon-pink">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Features</h3>
            </div>
            <p className="text-gray-400">
              The routing system supports nested layouts, hidden folders, 
              and complex route hierarchies with ease.
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="neon-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="/layouts/visibleLayout" className="p-4 rounded-lg bg-dark-800/50 border border-dark-500 hover:border-neon-cyan hover:bg-dark-700/50 transition-all duration-300 text-center group">
              <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform duration-300">📁</span>
              <span className="text-sm text-gray-300 group-hover:text-neon-cyan transition-colors duration-300">Layouts</span>
            </a>
            <a href="/pokemon" className="p-4 rounded-lg bg-dark-800/50 border border-dark-500 hover:border-neon-cyan hover:bg-dark-700/50 transition-all duration-300 text-center group">
              <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform duration-300">⚡</span>
              <span className="text-sm text-gray-300 group-hover:text-neon-cyan transition-colors duration-300">Pokemon</span>
            </a>
            <a href="/dashboard" className="p-4 rounded-lg bg-dark-800/50 border border-dark-500 hover:border-neon-cyan hover:bg-dark-700/50 transition-all duration-300 text-center group">
              <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform duration-300">📊</span>
              <span className="text-sm text-gray-300 group-hover:text-neon-cyan transition-colors duration-300">Dashboard</span>
            </a>
            <a href="/settings" className="p-4 rounded-lg bg-dark-800/50 border border-dark-500 hover:border-neon-cyan hover:bg-dark-700/50 transition-all duration-300 text-center group">
              <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform duration-300">⚙️</span>
              <span className="text-sm text-gray-300 group-hover:text-neon-cyan transition-colors duration-300">Settings</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
