import { useQuery } from '@tanstack/react-query';
import { fetchPokemonDetail, PokemonDetailFull } from '@/lib/api';

export function usePokemonDetail(id: string) {
	return useQuery<PokemonDetailFull>({
		queryKey: ['pokemonDetail', id],
		queryFn: () => fetchPokemonDetail(id),
		enabled: !!id,
	});
}
