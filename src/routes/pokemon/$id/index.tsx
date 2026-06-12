import { createFileRoute, redirect } from "@tanstack/react-router";
import { getPokemon } from "../../../api/pokemon.ts";

export const Route = createFileRoute("/pokemon/$id/")({
  component: RouteComponent,
  loader: async ({ params }) => {
    if (isNaN(Number(params.id))) {
      alert("Invalid Pokemon ID");
      throw redirect({ to: "/pokemon" });
    }

    const pokemon = await getPokemon(params.id);
    const img = new Image();
    img.src = pokemon.sprites.front_default;

    return pokemon;
  },
});

function RouteComponent() {
  const pokemon = Route.useLoaderData();

  const pokemonId = String(pokemon.id).padStart(3, "0");
  const primaryType = pokemon.types[0]?.type.name || "normal";
  const typeColors: Record<string, string> = {
    fire: "#ff6b35",
    water: "#4dabf7",
    grass: "#51cf66",
    electric: "#ffd43b",
    psychic: "#da77f2",
    poison: "#9775fa",
    normal: "#adb5bd",
    flying: "#74c0fc",
    bug: "#a9e34b",
    ground: "#fcc419",
    fairy: "#f783ac",
    fighting: "#ff8787",
    rock: "#868e96",
    steel: "#dee2e6",
    ice: "#99e9f2",
    dragon: "#748ffc",
    ghost: "#b197fc",
    dark: "#495057",
  };
  const accentColor = typeColors[primaryType] || typeColors.normal;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Background Glow */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${accentColor}15 0%, transparent 50%)`,
        }}
      />

      <div className="max-w-4xl mx-auto relative">
        {/* Back Button */}
        <a
          href="/pokemon"
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-lg bg-dark-700 border border-dark-500 text-gray-300 hover:text-neon-cyan hover:border-neon-cyan transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Pokemons
        </a>

        {/* Main Card */}
        <div className="neon-card p-8 relative overflow-hidden">
          {/* Decorative Corner */}
          <div 
            className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl"
            style={{ background: accentColor }}
          />

          {/* Header */}
          <div className="flex flex-col md:flex-row gap-8 mb-8 relative">
            {/* Pokemon Image */}
            <div className="flex-shrink-0">
              <div className="relative">
                {/* Glow Effect */}
                <div 
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: `radial-gradient(circle, ${accentColor}40 0%, transparent 70%)`,
                    filter: "blur(20px)",
                    transform: "scale(1.2)",
                  }}
                />
                
                {/* Image Container */}
                <div className="relative w-64 h-64 rounded-3xl bg-dark-800/50 border border-dark-500 flex items-center justify-center overflow-hidden">
                  <img
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className="w-48 h-48 object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>

            {/* Pokemon Info */}
            <div className="flex-1">
              {/* ID and Name */}
              <div className="mb-6">
                <span className="inline-block px-3 py-1 mb-2 rounded-full bg-dark-800 border border-dark-500 text-sm font-mono text-neon-cyan">
                  #{pokemonId}
                </span>
                <h2 className="text-4xl sm:text-5xl font-bold text-white capitalize mb-4">
                  {pokemon.name}
                </h2>
                
                {/* Types */}
                <div className="flex gap-2">
                  {pokemon.types.map((typeInfo) => (
                    <span
                      key={typeInfo.type.name}
                      className="px-4 py-2 rounded-full text-sm font-semibold text-white uppercase"
                      style={{ backgroundColor: typeColors[typeInfo.type.name] || "#666" }}
                    >
                      {typeInfo.type.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Basic Stats */}
              <div className="grid grid-cols-2 gap-4">
                <StatCard label="Height" value={`${(pokemon.height / 10).toFixed(1)} m`} />
                <StatCard label="Weight" value={`${(pokemon.weight / 10).toFixed(1)} kg`} />
              </div>
            </div>
          </div>

          {/* Abilities Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Abilities
            </h3>
            <div className="flex flex-wrap gap-2">
              {pokemon.abilities.map((abilityInfo) => (
                <span
                  key={abilityInfo.ability.name}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    abilityInfo.is_hidden
                      ? "bg-dark-600 text-gray-400 border border-dark-500"
                      : "bg-dark-700 text-gray-200 border border-dark-500"
                  }`}
                >
                  {abilityInfo.ability.name.replace("-", " ")}
                  {abilityInfo.is_hidden && (
                    <span className="ml-2 text-xs text-gray-500">(Hidden)</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-neon-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Base Stats
            </h3>
            <div className="space-y-3">
              {pokemon.stats.map((statInfo) => (
                <StatBar
                  key={statInfo.stat.name}
                  name={statInfo.stat.name.replace("-", " ")}
                  value={statInfo.base_stat}
                  color={accentColor}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sprites Gallery */}
        {pokemon.sprites.front_shiny && (
          <div className="mt-8 neon-card p-6">
            <h3 className="text-lg font-bold text-white mb-4">Shiny Form</h3>
            <div className="flex gap-4">
              <div className="flex-1 rounded-xl bg-dark-800/50 border border-dark-500 p-4 flex items-center justify-center">
                <img
                  src={pokemon.sprites.front_shiny}
                  alt={`${pokemon.name} shiny`}
                  className="w-24 h-24 object-contain"
                />
              </div>
              {pokemon.sprites.back_shiny && (
                <div className="flex-1 rounded-xl bg-dark-800/50 border border-dark-500 p-4 flex items-center justify-center">
                  <img
                    src={pokemon.sprites.back_shiny}
                    alt={`${pokemon.name} shiny back`}
                    className="w-24 h-24 object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-dark-800/50 border border-dark-500 rounded-xl p-4">
      <span className="text-sm text-gray-400 block mb-1">{label}</span>
      <span className="text-2xl font-bold text-white">{value}</span>
    </div>
  );
}

// Stat Bar Component
function StatBar({ name, value, color }: { name: string; value: number; color: string }) {
  const percentage = Math.min((value / 255) * 100, 100);
  
  return (
    <div className="flex items-center gap-4">
      <span className="w-24 text-sm text-gray-400 capitalize">{name}</span>
      <div className="flex-1 h-3 bg-dark-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(90deg, ${color}, ${color}cc)`,
            boxShadow: `0 0 10px ${color}80`,
          }}
        />
      </div>
      <span className="w-12 text-right text-sm font-mono text-gray-300">{value}</span>
    </div>
  );
}
