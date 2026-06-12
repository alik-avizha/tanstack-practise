import { CustomLink } from "./custom-link.tsx";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-dark-900/80 border-b border-dark-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-purple bg-clip-text text-transparent">
              POKÉDEX
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <CustomLink
              to="/"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-neon-cyan hover:bg-dark-700 border border-transparent hover:border-neon-cyan/30 transition-all duration-300"
            >
              Home
            </CustomLink>
            <CustomLink
              to="/profile"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-neon-cyan hover:bg-dark-700 border border-transparent hover:border-neon-cyan/30 transition-all duration-300"
            >
              Profile
            </CustomLink>
            <CustomLink
              to="/pokemon"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-neon-cyan hover:bg-dark-700 border border-transparent hover:border-neon-cyan/30 transition-all duration-300"
            >
              Pokemons
            </CustomLink>
            <CustomLink
              to="/search"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-neon-cyan hover:bg-dark-700 border border-transparent hover:border-neon-cyan/30 transition-all duration-300"
            >
              Search
            </CustomLink>
            <CustomLink
              to="/login"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-neon-cyan hover:bg-dark-700 border border-transparent hover:border-neon-cyan/30 transition-all duration-300"
            >
              Login
            </CustomLink>
            <CustomLink
              to="/dashboard"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-neon-cyan hover:bg-dark-700 border border-transparent hover:border-neon-cyan/30 transition-all duration-300"
            >
              Dashboard
            </CustomLink>
            <CustomLink
              to="/settings"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-neon-cyan hover:bg-dark-700 border border-transparent hover:border-neon-cyan/30 transition-all duration-300"
            >
              Settings
            </CustomLink>
            <CustomLink
              to="/first-level"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-neon-cyan hover:bg-dark-700 border border-transparent hover:border-neon-cyan/30 transition-all duration-300"
            >
              First Level
            </CustomLink>
            <CustomLink
              to="/layouts/visibleLayout"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-neon-cyan hover:bg-dark-700 border border-transparent hover:border-neon-cyan/30 transition-all duration-300"
            >
              Layouts
            </CustomLink>
            <CustomLink
              to="/steps"
              search={{ username: "Leonardo", step: 0 }}
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-neon-cyan hover:bg-dark-700 border border-transparent hover:border-neon-cyan/30 transition-all duration-300"
            >
              Steps
            </CustomLink>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-lg bg-dark-700 border border-dark-500 text-neon-cyan hover:border-neon-cyan hover:shadow-[0_0_10px_rgba(0,245,255,0.3)] transition-all duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-dark-500 bg-dark-800/95 backdrop-blur-xl">
        <div className="px-4 py-3 space-y-2">
          <MobileNavLink to="/">Home</MobileNavLink>
          <MobileNavLink to="/profile">Profile</MobileNavLink>
          <MobileNavLink to="/pokemon">Pokemons</MobileNavLink>
          <MobileNavLink to="/search">Search</MobileNavLink>
          <MobileNavLink to="/login">Login</MobileNavLink>
          <MobileNavLink to="/dashboard">Dashboard</MobileNavLink>
          <MobileNavLink to="/settings">Settings</MobileNavLink>
          <MobileNavLink to="/first-level">First Level</MobileNavLink>
          <MobileNavLink to="/layouts/visibleLayout">Layouts</MobileNavLink>
          <MobileNavLink to="/steps" search={{ username: "Leonardo", step: 0 }}>
            Steps
          </MobileNavLink>
        </div>
      </div>
    </header>
  );
};

// Mobile Navigation Link Component
function MobileNavLink({ 
  to, 
  children, 
  search 
}: { 
  to: string; 
  children: React.ReactNode;
  search?: Record<string, unknown>;
}) {
  return (
    <CustomLink
      to={to}
      search={search}
      className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-neon-cyan hover:bg-dark-700 border border-transparent hover:border-neon-cyan/30 transition-all duration-300"
    >
      {children}
    </CustomLink>
  );
}
