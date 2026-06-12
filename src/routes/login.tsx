import { createFileRoute } from "@tanstack/react-router";
import { isAuthenticated, signIn, signOut } from "../utils/auth.ts";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  staticData: { breadcrumb: "Login" },
  component: RouteComponent,
});

function RouteComponent() {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

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
              : "Enter your credentials to access your account"
            }
          </p>
        </div>

        <div className="neon-card p-8">
          {authenticated ? (
            <div className="text-center">
              {/* User Avatar */}
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-neon-cyan to-neon-pink p-1">
                <div className="w-full h-full rounded-full bg-dark-700 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>

              <p className="text-xl text-white mb-8">Hello, Trainer!</p>

              <button
                onClick={() => {
                  signOut();
                  setAuthenticated(false);
                }}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-neon-pink to-neon-purple text-white font-semibold hover:opacity-90 transition-opacity duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-500 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-colors duration-300"
                  placeholder="trainer@pokemon.com"
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-500 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-colors duration-300"
                  placeholder="••••••••"
                />
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-dark-500 bg-dark-800 text-neon-cyan focus:ring-neon-cyan focus:ring-offset-dark-900"
                  />
                  <span className="ml-2 text-sm text-gray-400">Remember me</span>
                </label>
                <a href="#" className="text-sm text-neon-cyan hover:text-neon-pink transition-colors duration-300">
                  Forgot password?
                </a>
              </div>

              {/* Sign In Button */}
              <button
                onClick={() => {
                  signIn();
                  setAuthenticated(true);
                }}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-pink text-dark-900 font-semibold hover:opacity-90 transition-opacity duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Sign In
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-dark-500"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-dark-700 text-gray-400">Or continue with</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4">
                <button className="py-3 px-4 rounded-lg bg-dark-800 border border-dark-500 text-gray-300 hover:border-neon-cyan hover:text-neon-cyan transition-all duration-300 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </button>
                <button className="py-3 px-4 rounded-lg bg-dark-800 border border-dark-500 text-gray-300 hover:border-neon-cyan hover:text-neon-cyan transition-all duration-300 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
