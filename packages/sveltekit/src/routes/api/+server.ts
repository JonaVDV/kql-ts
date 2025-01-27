import type { RequestHandler } from './$types';
import { kqlHandler } from '$lib/server';
import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, fetch }) => {
	const body = await request.json();
	const response = await kqlHandler({
		endpoint: env.KIRBY_HEADLESS_API_URL,
		auth: `Bearer ${env.KIRBY_HEADLESS_API_TOKEN}`,
		fetch,
		query: body
	});

	return json(response.result, {
		status: response.code,
		statusText: response.status
	});
};
