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
  const { id } = Route.useParams();
  const pokemon = Route.useLoaderData();

  return (
    <div>
      <h2>
        {id} {pokemon.name}
      </h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <dl>
        <dt>Height</dt>
        <dd>{pokemon.height}</dd>
        <dt>Weight</dt>
        <dd>{pokemon.weight}</dd>
      </dl>
    </div>
  );
}
