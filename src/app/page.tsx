'use client';

import { Fragment, useEffect, useRef } from 'react';
import { usePokemonList } from '@/hooks/usePokemonList';
import { PokemonCard } from '@/components/molecules/PokemonCard';

export default function HomePage() {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		usePokemonList();
	const observerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting && hasNextPage) {
				fetchNextPage();
			}
		});

		if (observerRef.current) observer.observe(observerRef.current);
		return () => observer.disconnect();
	}, [hasNextPage, fetchNextPage]);

	return (
		<main className='p-4 pb-20'>
			<h1 className='text-xl font-bold mb-4'>Pokedex</h1>

			<div className='grid grid-cols-2 gap-4'>
				{data?.pages.map((page, index) => (
					<Fragment key={`page-${page[0]?.name || index}`}>
						{page.map((pokemon, i) => (
							<PokemonCard
								key={pokemon.name}
								{...pokemon}
								priority={index === 0 && i === 0}
							/>
						))}
					</Fragment>
				))}
			</div>

			<div ref={observerRef} className='h-10 col-span-full text-center'>
				{isFetchingNextPage && (
					<p className='text-sm text-gray-500'>Loading more…</p>
				)}
			</div>

			{/* Floating filter button */}
			<button className='fixed bottom-5 right-5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full w-12 h-12 shadow-lg flex items-center justify-center'>
				<svg
					className='w-5 h-5'
					fill='none'
					stroke='currentColor'
					strokeWidth={2}
					viewBox='0 0 24 24'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 019 17v-3.586L3.293 6.707A1 1 0 013 6V4z'
					/>
				</svg>
			</button>
		</main>
	);
}
