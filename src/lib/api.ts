// Types returned from PokeAPI
import { QueryFunctionContext } from '@tanstack/react-query';

export interface PokemonListItem {
	name: string;
	url: string;
	priority?: boolean;
}

export interface PaginatedPokemonList {
	pokemons: PokemonListItem[];
}

export interface Stat {
	base_stat: number;
	stat: {
		name: string;
		url: string;
	};
}

export interface Type {
	slot: number;
	type: {
		name: string;
		url: string;
	};
}

export interface Ability {
	ability: {
		name: string;
		url: string;
	};
	is_hidden: boolean;
	slot: number;
}

export interface Move {
	move: {
		name: string;
		url: string;
	};
}

export interface Sprites {
	front_default: string | null;
}

export interface PokemonDetail {
	id: number;
	name: string;
	height: number;
	weight: number;
	stats: Stat[];
	types: Type[];
	abilities: Ability[];
	moves: Move[];
	sprites: Sprites;
	species: {
		name: string;
		url: string;
	};
}

export interface PokemonSpecies {
	evolution_chain: {
		url: string;
	};
}

export interface EvolutionChain {
	chain: {
		species: {
			name: string;
			url: string;
		};
		evolves_to: EvolutionChain['chain'][];
	};
}

export interface PokemonDetailFull extends PokemonDetail {
	evolutionChain: EvolutionChain;
}

export interface PokemonDetail {
	id: number;
	name: string;
	height: number;
	weight: number;
	stats: Stat[];
	types: Type[];
	abilities: Ability[];
	moves: Move[];
	sprites: Sprites;
	species: {
		name: string;
		url: string;
	};
}

// API Fetch Functions

export const fetchPokemonList = async (
	context: QueryFunctionContext
): Promise<PokemonListItem[]> => {
	try {
		const pageParam = (context.pageParam as number) || 1;
		const limit = 20;
		const offset = (pageParam - 1) * limit;

		const res = await fetch(
			`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
		);
		const data = await res.json();

		return data.results as PokemonListItem[];
	} catch (error) {
		console.error('Failed to fetch Pokemon list:', error);
		throw error;
	}
};

export async function fetchPokemonDetail(
	id: string
): Promise<PokemonDetailFull> {
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
	const detail: PokemonDetail = await res.json();

	const speciesRes = await fetch(detail.species.url);
	const species: PokemonSpecies = await speciesRes.json();

	const evoRes = await fetch(species.evolution_chain.url);
	const evolutionChain: EvolutionChain = await evoRes.json();

	return {
		...detail,
		evolutionChain,
	};
}
