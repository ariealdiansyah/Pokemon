interface Props {
	readonly label: string;
	readonly value: number;
}

export function StatBar({ label, value }: Props) {
	const pct = Math.min(100, (value / 255) * 100);
	return (
		<div className='flex items-center gap-2'>
			<span className='w-20 text-xs'>{label}</span>
			<div className='flex-1 h-2 bg-gray-200 rounded'>
				<div className='h-full bg-green-500' style={{ width: `${pct}%` }} />
			</div>
			<span className='w-6 text-xs text-right'>{value}</span>
		</div>
	);
}
