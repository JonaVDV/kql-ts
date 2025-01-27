import { transformQuery } from '@kql-ts/core';
import type { KQLQuery } from '@kql-ts/core';
export interface KqlRequest {
	query: KQLQuery;
	endpoint: string;
	fetch: typeof globalThis.fetch;
	language?: string;
	auth?: `Bearer ${string}` | `Basic ${string}`;
	headers?: HeadersInit;
	timeout?: number;
}
// give me an example of a basic auth header:

export async function kqlHandler({
	query,
	endpoint,
	language,
	fetch,
	auth,
	headers = {},
	timeout
}: KqlRequest) {
	let controller: AbortController | undefined;
	let timeoutId: Timer | undefined;

	try {
		if (timeout) {
			controller = new AbortController();
			timeoutId = setTimeout(() => controller?.abort(), timeout);
		}

		const queryBody = transformQuery(query);

		const response = await fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...(language && { 'X-Language': language }),
				...headers,
				...(auth && { Authorization: auth })
			} satisfies HeadersInit,
			body: JSON.stringify(queryBody),
			...(controller && { signal: controller.signal })
		});

		if (!response.ok) {
			const errorBody = await response.text();
			throw new Error(
				`KQL request failed: ${response.status} ${response.statusText}\n${errorBody}`
			);
		}

		return response.json();
	} finally {
		if (timeoutId) clearTimeout(timeoutId);
	}
}
