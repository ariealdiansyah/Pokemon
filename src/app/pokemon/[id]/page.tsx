'use client';

import { usePokemonDetail } from '@/hooks/usePokemonDetail';
import Image from 'next/image';
import { PokemonDetailTabs } from '@/components/organisms/PokemonDetailTabs';

export default function PokemonDetailPage({
	params,
}: {
	params: { id: string };
}) {
	const { data: detail, isLoading } = usePokemonDetail(params.id);
	if (isLoading || !detail) return <p className='p-4'>Loading…</p>;

	return (
		<main className='p-4 space-y-4'>
			<div className='flex justify-center'>
				<Image
					src={detail.sprites.front_default ?? ''}
					width={150}
					height={150}
					alt={detail.name}
				/>
			</div>
			<PokemonDetailTabs detail={detail} />
		</main>
	);
}
