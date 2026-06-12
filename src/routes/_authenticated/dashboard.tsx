import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: RouteComponent,
  staticData: {
    breadcrumb: ["Private", "Dashboard"],
  },
});

function RouteComponent() {
  return (
    <div className="min-h-[calc(100vh-200px)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-cyan to-neon-pink bg-clip-text text-transparent mb-2">
            Dashboard
          </h1>
          <p className="text-gray-400">Welcome back, Trainer! Here's your overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardStat
            title="Pokemon Caught"
            value="247"
            change="+12"
            trend="up"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
            color="cyan"
          />
          <DashboardStat
            title="Badges Earned"
            value="8"
            change="+2"
            trend="up"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            }
            color="pink"
          />
          <DashboardStat
            title="Hours Played"
            value="1,234"
            change="+56"
            trend="up"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            color="purple"
          />
          <DashboardStat
            title="Favorite Type"
            value="Fire"
            change="-1"
            trend="down"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
            }
            color="orange"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="neon-card p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Recent Activity
            </h2>
            <div className="space-y-4">
              <ActivityItem
                action="Caught Charizard"
                time="2 hours ago"
                icon="🎯"
              />
              <ActivityItem
                action="Earned Volcano Badge"
                time="5 hours ago"
                icon="🏆"
              />
              <ActivityItem
                action="Trade completed with @ash_ketchum"
                time="1 day ago"
                icon="🔄"
              />
              <ActivityItem
                action="Discovered new area: Cerulean Cave"
                time="2 days ago"
                icon="🗺️"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="neon-card p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-neon-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <QuickAction
                title="Catch Pokemon"
                icon="⚡"
                link="/pokemon"
              />
              <QuickAction
                title="View Pokedex"
                icon="📖"
                link="/pokemon"
              />
              <QuickAction
                title="Battle Arena"
                icon="⚔️"
                link="/search"
              />
              <QuickAction
                title="Trade Center"
                icon="🔀"
                link="/search"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardStat({
  title,
  value,
  change,
  trend,
  icon,
  color,
}: {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    cyan: "text-neon-cyan bg-neon-cyan/10 border-neon-cyan/20",
    pink: "text-neon-pink bg-neon-pink/10 border-neon-pink/20",
    purple: "text-neon-purple bg-neon-purple/10 border-neon-purple/20",
    orange: "text-neon-orange bg-neon-orange/10 border-neon-orange/20",
  };

  return (
    <div className="neon-card p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
        <span className={`text-sm font-medium ${trend === "up" ? "text-neon-green" : "text-red-400"}`}>
          {change}
        </span>
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-gray-400">{title}</div>
    </div>
  );
}

function ActivityItem({
  action,
  time,
  icon,
}: {
  action: string;
  time: string;
  icon: string;
}) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-lg bg-dark-800/50 hover:bg-dark-700/50 transition-colors duration-300">
      <span className="text-2xl">{icon}</span>
      <div className="flex-1">
        <p className="text-white font-medium">{action}</p>
        <p className="text-sm text-gray-400">{time}</p>
      </div>
    </div>
  );
}

function QuickAction({
  title,
  icon,
  link,
}: {
  title: string;
  icon: string;
  link: string;
}) {
  return (
    <a
      href={link}
      className="flex flex-col items-center justify-center p-4 rounded-lg bg-dark-800/50 border border-dark-500 hover:border-neon-cyan hover:bg-dark-700/50 transition-all duration-300 group"
    >
      <span className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{icon}</span>
      <span className="text-sm font-medium text-gray-300 group-hover:text-neon-cyan transition-colors duration-300">{title}</span>
    </a>
  );
}
