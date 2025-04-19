'use client';

import Link from 'next/link';
import Image from 'next/image';
import { TypeBadge } from '@/components/atoms/TypeBadge';
import { PokemonListItem } from '@/lib/api';
import { useEffect, useState } from 'react';

interface Props extends Readonly<PokemonListItem> {
	priority?: boolean;
}

export function PokemonCard({ name, url, priority = false }: Readonly<Props>) {
	const id = url.split('/').filter(Boolean).pop() ?? '0';
	const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

	const [types, setTypes] = useState<string[]>([]);
	const [isImageLoading, setIsImageLoading] = useState(true);

	useEffect(() => {
		fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
			.then((res) => res.json())
			.then((data) =>
				setTypes(data.types.map((t: { type: { name: string } }) => t.type.name))
			);
	}, [id]);

	return (
		<Link href={`/pokemon/${id}`}>
			<div
				className={`bg-type-${
					types[0] ?? 'normal'
				} text-white rounded-xl p-4 h-full overflow-hidden relative`}>
				{/* ID */}
				<div className='flex justify-end items-center -mt-2 mb-1'>
					<span className='text-sm font-bold text-white/40'>
						#{id.padStart(3, '0')}
					</span>
				</div>

				{/* Content row */}
				<div className='flex flex-row h-full gap-3 relative z-10'>
					{/* Left: Text info */}
					<div className='flex flex-col items-start gap-2 flex-1 min-w-0'>
						<h2 className='text-base font-bold capitalize truncate'>{name}</h2>
						<div className='flex flex-wrap items-start gap-1'>
							{types.map((type) => (
								<TypeBadge key={type} type={type} />
							))}
						</div>
					</div>

					{/* Right: Image */}
					<div className='relative z-10 flex items-center justify-end w-[80px] h-[80px] shrink-0'>
						{isImageLoading && (
							<div className='absolute inset-0 flex items-center justify-center z-10'>
								<div className='w-6 h-6 border-2 border-white/50 border-t-white rounded-full animate-spin' />
							</div>
						)}

						<Image
							src={image}
							alt={name}
							width={80}
							height={80}
							priority={priority}
							className={`object-contain max-w-full max-h-full transition-opacity duration-300 ${
								isImageLoading ? 'opacity-0' : 'opacity-100'
							}`}
							onLoad={() => setIsImageLoading(false)}
						/>
					</div>
				</div>

				{/* Pokeball Background SVG */}
				<div className='absolute right-2 bottom-2 w-[64px] h-[64px] opacity-10 pointer-events-none z-0'>
					<svg
						viewBox='0 0 100 100'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'>
						<circle cx='50' cy='50' r='45' stroke='white' strokeWidth='10' />
						<circle cx='50' cy='50' r='15' stroke='white' strokeWidth='10' />
						<line
							x1='5'
							y1='50'
							x2='95'
							y2='50'
							stroke='white'
							strokeWidth='10'
						/>
					</svg>
				</div>
			</div>
		</Link>
	);
}
