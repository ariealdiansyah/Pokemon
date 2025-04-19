'use client';

import { StatBar } from '@/components/atoms/StatBar';
import { TypeBadge } from '@/components/atoms/TypeBadge';
import { PokemonDetail } from '@/lib/api';

interface Props {
	readonly detail: PokemonDetail;
}

export function PokemonDetailTabs({ detail }: Props) {
	return (
		<div className='space-y-4'>
			<div className='flex justify-center gap-2'>
				{detail.types.map((t) => (
					<TypeBadge key={t.type.name} type={t.type.name} />
				))}
			</div>

			<div>
				<h3 className='font-semibold mb-2'>Stats</h3>
				<div className='space-y-1'>
					{detail.stats.map((s) => (
						<StatBar
							key={s.stat.name}
							label={s.stat.name}
							value={s.base_stat}
						/>
					))}
				</div>
			</div>

			<div>
				<h3 className='font-semibold mt-4'>Moves</h3>
				<div className='grid grid-cols-2 gap-2 text-xs capitalize mt-2'>
					{detail.moves.slice(0, 10).map((m) => (
						<span key={m.move.name} className='bg-gray-100 px-2 py-1 rounded'>
							{m.move.name}
						</span>
					))}
				</div>
			</div>
		</div>
	);
}
