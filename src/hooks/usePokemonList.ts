import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPokemonList, PokemonListItem } from '@/lib/api';

export function usePokemonList() {
	return useInfiniteQuery<PokemonListItem[], Error>({
		queryKey: ['pokemonList'],
		queryFn: fetchPokemonList,
		getNextPageParam: (lastPage, allPages) => {
			return lastPage.length === 20 ? allPages.length + 1 : undefined;
		},
		initialPageParam: 1,
	});
}
