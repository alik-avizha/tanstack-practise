import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  staticData: { breadcrumb: "Home" },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-purple bg-clip-text text-transparent">
              Welcome to Pokedex
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Your ultimate destination for exploring the world of Pokemon. 
            Discover, learn, and catch them all!
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <FeatureCard
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
            title="Search"
            description="Find any Pokemon by name or characteristics"
            link="/search"
            color="cyan"
          />
          <FeatureCard
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            }
            title="Browse"
            description="Explore the complete Pokedex with detailed info"
            link="/pokemon"
            color="pink"
          />
          <FeatureCard
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
            title="Dashboard"
            description="View statistics and manage your collection"
            link="/dashboard"
            color="purple"
          />
        </div>

        {/* Stats Section */}
        <div className="neon-card p-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Quick Stats
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatItem label="Pokemon" value="1000+" color="cyan" />
            <StatItem label="Types" value="18" color="pink" />
            <StatItem label="Regions" value="9" color="purple" />
            <StatItem label="Abilities" value="300+" color="green" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description, 
  link, 
  color 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  link: string; 
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    cyan: "border-neon-cyan/30 hover:border-neon-cyan group",
    pink: "border-neon-pink/30 hover:border-neon-pink group",
    purple: "border-neon-purple/30 hover:border-neon-purple group",
  };

  return (
    <a
      href={link}
      className={`neon-card p-6 flex flex-col items-center text-center ${colorClasses[color]}`}
    >
      <div className={`mb-4 text-${color === 'cyan' ? 'neon-cyan' : color === 'pink' ? 'neon-pink' : 'neon-purple'}`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </a>
  );
}

function StatItem({ label, value, color }: { label: string; value: string; color: string }) {
  const colorClasses: Record<string, string> = {
    cyan: "text-neon-cyan",
    pink: "text-neon-pink",
    purple: "text-neon-purple",
    green: "text-neon-green",
  };

  return (
    <div className="text-center p-4">
      <div className={`text-3xl font-bold ${colorClasses[color]} mb-1`}>
        {value}
      </div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
}
