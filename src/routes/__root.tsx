import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import type { AuthContext } from "../hooks/use-auth.ts";
import { Header } from "../compoents/header.tsx";
import { RouterBreadcrumb } from "../compoents/navigation/router-breadcrumb.tsx";
import type { QueryClient } from "@tanstack/react-query";

type RouterContext = {
  authentication: AuthContext;
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div className="min-h-screen flex flex-col">
      <Header />
      <RouterBreadcrumb />
      <main className="flex-1">
        <Outlet />
      </main>
      {/* Footer */}
      <footer className="border-t border-dark-500 bg-dark-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © 2026 Pokedex. Built with TanStack Router & React 19
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://pokeapi.co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-neon-cyan transition-colors duration-300"
              >
                PokeAPI
              </a>
              <span className="text-gray-600">•</span>
              <a
                href="https://tailwindcss.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-neon-cyan transition-colors duration-300"
              >
                Tailwind CSS
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  ),
});
