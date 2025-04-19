interface Props {
	type: string;
}

export function TypeBadge({ type }: Readonly<Props>) {
	return (
		<span className='text-xs px-2 py-1 rounded-full bg-white/30 text-white capitalize font-medium min-w-[60px] text-center'>
			{type}
		</span>
	);
}
