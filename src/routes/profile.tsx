import { createFileRoute, redirect, useBlocker } from "@tanstack/react-router";
import { type ChangeEvent, useState } from "react";

export const Route = createFileRoute("/profile")({
  beforeLoad: ({ context }) => {
    const { isLogged } = context.authentication;
    if (!isLogged()) {
      throw redirect({
        to: "/login",
      });
    }
  },
  staticData: { breadcrumb: "Profile" },
  component: RouteComponent,
});

function RouteComponent() {
  const [name, setName] = useState("");
  const { proceed, reset, status } = useBlocker({
    condition: !!name,
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  return (
    <div className="min-h-[calc(100vh-200px)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="neon-card p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-neon-cyan via-neon-pink to-neon-purple p-1">
                <div className="w-full h-full rounded-full bg-dark-700 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-neon-cyan text-dark-900 flex items-center justify-center hover:bg-neon-pink transition-colors duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">Trainer Profile</h1>
              <p className="text-gray-400 mb-4">Manage your account settings</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="px-3 py-1 rounded-full bg-neon-cyan/20 text-neon-cyan text-sm">
                  Pro Trainer
                </span>
                <span className="px-3 py-1 rounded-full bg-neon-pink/20 text-neon-pink text-sm">
                  Verified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="neon-card p-8">
          <h2 className="text-xl font-bold text-white mb-6">Personal Information</h2>
          
          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Display Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={onChange}
                className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-500 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-colors duration-300"
                placeholder="Enter your name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                defaultValue="trainer@pokemon.com"
                className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-500 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-colors duration-300"
                placeholder="Enter your email"
              />
            </div>

            {/* Bio Field */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-2">
                Bio
              </label>
              <textarea
                id="bio"
                rows={4}
                defaultValue="Passionate Pokemon trainer on a journey to catch them all!"
                className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-dark-500 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-colors duration-300 resize-none"
                placeholder="Tell us about yourself"
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-end gap-4 pt-4">
              <button className="px-6 py-3 rounded-lg bg-dark-700 border border-dark-500 text-gray-300 hover:border-neon-cyan hover:text-neon-cyan transition-all duration-300">
                Cancel
              </button>
              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-pink text-dark-900 font-semibold hover:opacity-90 transition-opacity duration-300">
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Blocker Modal */}
        {status === "blocked" && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="neon-card p-8 max-w-md mx-4">
              <h3 className="text-xl font-bold text-white mb-4">Unsaved Changes</h3>
              <p className="text-gray-400 mb-6">
                You have unsaved changes on this page. Are you sure you want to leave?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={reset}
                  className="px-6 py-3 rounded-lg bg-dark-700 border border-dark-500 text-gray-300 hover:border-neon-cyan hover:text-neon-cyan transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={proceed}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-neon-pink to-neon-purple text-white font-semibold hover:opacity-90 transition-opacity duration-300"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
