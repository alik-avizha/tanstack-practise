import { createFileRoute, Link } from "@tanstack/react-router";
import { getPokemonList } from "../../api/pokemon.ts";

export const Route = createFileRoute("/pokemon/")({
  component: RouteComponent,
  loader: getPokemonList,
});

function RouteComponent() {
  const pokemons = Route.useLoaderData();

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-purple bg-clip-text text-transparent mb-4">
            Choose Your Pokemon
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore the complete Pokedex and discover your favorite creatures
          </p>
        </div>
      </div>

      {/* Pokemon Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {pokemons.map((pokemon, index) => {
            const pokemonId = String(pokemon.id).padStart(3, "0");
            const hue = (index * 37) % 360;
            
            return (
              <Link
                key={pokemon.id}
                to={`/pokemon/$id`}
                params={{
                  id: pokemon.id,
                }}
                className="group relative neon-card p-6 flex flex-col items-center overflow-hidden"
                style={{
                  background: `linear-gradient(145deg, var(--color-dark-700), hsl(${hue}, 30%, 15%))`,
                }}
              >
                {/* Pokemon Number Badge */}
                <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-dark-800/80 border border-dark-500 text-xs font-mono text-neon-cyan">
                  #{pokemonId}
                </div>

                {/* Pokemon Image */}
                <div className="relative w-24 h-24 mb-4 transition-transform duration-300 group-hover:scale-110">
                  <div 
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle, hsl(${hue}, 100%, 50%) 0%, transparent 70%)`,
                      filter: "blur(15px)",
                    }}
                  />
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                    alt={pokemon.name}
                    className="relative w-full h-full object-contain drop-shadow-lg"
                    loading="lazy"
                  />
                </div>

                {/* Pokemon Name */}
                <h3 className="text-lg font-semibold text-gray-200 capitalize text-center group-hover:text-neon-cyan transition-colors duration-300">
                  {pokemon.name}
                </h3>

                {/* Hover Glow Effect */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    boxShadow: `inset 0 0 30px hsl(${hue}, 100%, 50% / 0.1)`,
                  }}
                />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-1/4 left-0 w-64 h-64 rounded-full bg-neon-cyan/5 blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 right-0 w-96 h-96 rounded-full bg-neon-pink/5 blur-3xl pointer-events-none" />
    </div>
  );
}
