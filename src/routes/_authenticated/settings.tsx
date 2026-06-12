import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/settings")({
  component: RouteComponent,
  staticData: { breadcrumb: "Settings" },
});

function RouteComponent() {
  return (
    <div className="min-h-[calc(100vh-200px)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-cyan to-neon-pink bg-clip-text text-transparent mb-2">
            Settings
          </h1>
          <p className="text-gray-400">Manage your account and preferences</p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Appearance */}
          <SettingsSection
            title="Appearance"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            }
          >
            <div className="space-y-4">
              <SettingRow
                label="Theme"
                description="Choose your preferred color scheme"
              >
                <select className="px-4 py-2 rounded-lg bg-dark-800 border border-dark-500 text-white focus:outline-none focus:border-neon-cyan">
                  <option>Dark (Neon)</option>
                  <option>Light</option>
                  <option>System</option>
                </select>
              </SettingRow>
              <SettingRow
                label="Accent Color"
                description="Customize the highlight color"
              >
                <div className="flex gap-2">
                  {["#00f5ff", "#ff00ff", "#bf00ff", "#39ff14"].map((color) => (
                    <button
                      key={color}
                      className="w-8 h-8 rounded-full border-2 border-transparent hover:border-white transition-colors duration-300"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </SettingRow>
              <SettingRow
                label="Animations"
                description="Enable or disable UI animations"
              >
                <ToggleSwitch defaultChecked />
              </SettingRow>
            </div>
          </SettingsSection>

          {/* Notifications */}
          <SettingsSection
            title="Notifications"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            }
          >
            <div className="space-y-4">
              <SettingRow
                label="Push Notifications"
                description="Receive notifications about new Pokemon"
              >
                <ToggleSwitch defaultChecked />
              </SettingRow>
              <SettingRow
                label="Email Updates"
                description="Get weekly summaries via email"
              >
                <ToggleSwitch />
              </SettingRow>
              <SettingRow
                label="Sound Effects"
                description="Play sounds for interactions"
              >
                <ToggleSwitch defaultChecked />
              </SettingRow>
            </div>
          </SettingsSection>

          {/* Privacy & Security */}
          <SettingsSection
            title="Privacy & Security"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
          >
            <div className="space-y-4">
              <SettingRow
                label="Two-Factor Authentication"
                description="Add an extra layer of security"
              >
                <button className="px-4 py-2 rounded-lg bg-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan hover:text-dark-900 transition-all duration-300 font-medium">
                  Enable
                </button>
              </SettingRow>
              <SettingRow
                label="Password"
                description="Change your account password"
              >
                <button className="px-4 py-2 rounded-lg bg-dark-700 border border-dark-500 text-gray-300 hover:border-neon-cyan hover:text-neon-cyan transition-all duration-300">
                  Change
                </button>
              </SettingRow>
              <SettingRow
                label="Active Sessions"
                description="Manage your logged-in devices"
              >
                <button className="px-4 py-2 rounded-lg bg-dark-700 border border-dark-500 text-gray-300 hover:border-neon-cyan hover:text-neon-cyan transition-all duration-300">
                  View All
                </button>
              </SettingRow>
            </div>
          </SettingsSection>

          {/* Data & Storage */}
          <SettingsSection
            title="Data & Storage"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            }
          >
            <div className="space-y-4">
              <SettingRow
                label="Cache Size"
                description="Pokemon images and data stored locally"
              >
                <span className="text-neon-cyan font-mono">24.5 MB</span>
              </SettingRow>
              <SettingRow
                label="Clear Cache"
                description="Free up storage space"
              >
                <button className="px-4 py-2 rounded-lg bg-neon-pink/20 text-neon-pink hover:bg-neon-pink hover:text-dark-900 transition-all duration-300 font-medium">
                  Clear
                </button>
              </SettingRow>
              <SettingRow
                label="Export Data"
                description="Download all your data"
              >
                <button className="px-4 py-2 rounded-lg bg-dark-700 border border-dark-500 text-gray-300 hover:border-neon-cyan hover:text-neon-cyan transition-all duration-300">
                  Export
                </button>
              </SettingRow>
            </div>
          </SettingsSection>

          {/* Danger Zone */}
          <SettingsSection
            title="Danger Zone"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            }
            variant="danger"
          >
            <div className="space-y-4">
              <SettingRow
                label="Delete Account"
                description="Permanently delete your account and all data"
              >
                <button className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 font-medium border border-red-500/50">
                  Delete
                </button>
              </SettingRow>
            </div>
          </SettingsSection>
        </div>
      </div>
    </div>
  );
}

function SettingsSection({
  title,
  icon,
  children,
  variant = "default",
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  variant?: "default" | "danger";
}) {
  const borderClass = variant === "danger" ? "border-red-500/30" : "border-dark-500";
  const iconClass = variant === "danger" ? "text-red-400" : "text-neon-cyan";

  return (
    <div className={`neon-card p-6 border ${borderClass}`}>
      <h2 className={`text-xl font-bold text-white mb-6 flex items-center gap-2`}>
        <span className={iconClass}>{icon}</span>
        {title}
      </h2>
      {children}
    </div>
  );
}

function SettingRow({
  label,
  description,
  children,
}: {
  label: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 border-b border-dark-500 last:border-b-0">
      <div>
        <p className="text-white font-medium">{label}</p>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

function ToggleSwitch({ defaultChecked = false }: { defaultChecked?: boolean }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer" />
      <div className="w-11 h-6 bg-dark-600 rounded-full peer peer-checked:bg-neon-cyan transition-colors duration-300"></div>
      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
    </label>
  );
}
