type PokemonDetail = {
  name: string;
  id: number;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    front_shiny?: string;
    back_shiny?: string;
  };
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  abilities: Array<{
    slot: number;
    is_hidden: boolean;
    ability: {
      name: string;
      url: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
};

export async function getPokemon(id: string): Promise<PokemonDetail> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return await response.json();
}

type Pokemon = {
  id: string;
  name: string;
};

export async function getPokemonList(): Promise<Pokemon[]> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
  const data = (await response.json()) as {
    results: { name: string; url: string }[];
  };

  return data.results.map((r) => ({
    id: r.url.split("/").slice(-2, -1)[0],
    name: r.name,
  }));
}
