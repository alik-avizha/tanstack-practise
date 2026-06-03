import { createFileRoute, Link } from "@tanstack/react-router";
import { getPokemonList } from "../../api/pokemon.ts";

export const Route = createFileRoute("/pokemon/")({
  component: RouteComponent,
  loader: getPokemonList,
});

function RouteComponent() {
  const pokemons = Route.useLoaderData();
  return (
    <div>
      <h2>Pokemons</h2>
      <ul>
        {pokemons.map((pokemon) => {
          return (
            <li key={pokemon.id}>
              <Link
                key={pokemon.id}
                to={`/pokemon/$id`}
                params={{
                  id: pokemon.id,
                }}
              >
                {pokemon.name}
              </Link>
            </li>
          );
        })}
        <li></li>
      </ul>
    </div>
  );
}
