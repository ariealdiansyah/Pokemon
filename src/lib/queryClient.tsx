'use client';

import {
	isServer,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000,
			},
		},
	});
}

export default function Providers({ children }: { children: React.ReactNode }) {
	const [queryClient, setQueryClient] = useState<QueryClient | null>(null);

	useEffect(() => {
		if (!isServer) {
			setQueryClient(makeQueryClient());
		}
	}, []);

	if (!queryClient) {
		return null;
	}

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
