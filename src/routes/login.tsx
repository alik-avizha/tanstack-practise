import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  staticData: { breadcrumb: "Login" },
  component: RouteComponent,
});

function RouteComponent() {
  const { authentication } = useRouteContext({ from: "__root__" });
  const [authenticated, setAuthenticated] = useState(
    authentication.isLogged(),
  );

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-neon-cyan to-neon-pink bg-clip-text text-transparent mb-2">
            {authenticated ? "Welcome Back!" : "Sign In"}
          </h2>
          <p className="text-gray-400">
            {authenticated
              ? "You are currently signed in to your account"
              : "Enter your credentials to access your account"}
          </p>
        </div>

        <div className="neon-card p-8">
          {authenticated ? (
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-neon-cyan to-neon-pink p-1">
                <div className="w-full h-full rounded-full bg-dark-700 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>

              <p className="text-xl text-white mb-8">Hello, Trainer!</p>

              <button
                type="button"
                onClick={() => {
                  authentication.signOut();
                  setAuthenticated(false);
                }}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-neon-pink to-neon-purple text-white font-semibold hover:opacity-90 transition-opacity duration-300 flex items-center justify-center gap-2"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-500 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-colors duration-300"
                  placeholder="trainer@pokemon.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-500 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-colors duration-300"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  authentication.signIn();
                  setAuthenticated(true);
                }}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-pink text-dark-900 font-semibold hover:opacity-90 transition-opacity duration-300"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
