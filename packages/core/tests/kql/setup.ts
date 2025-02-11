import { test, afterAll } from "bun:test";
import type { Field } from "../../src";
import { transformQuery } from "../../src/utils";

export const API_URL =
	process.env.KIRBY_HEADLESS_API_URL || "http://localhost:8000/api/kql";
export const API_TOKEN = process.env.KIRBY_HEADLESS_API_TOKEN || "test";

// Track restricted methods per context
export const restrictedMethods: Record<string, string[]> = {
	page: [],
	file: [],
	field: [],
	collection: [],
	layout: [],
	block: [],
	site: [],
	kirby: [],
	user: [],
	translation: [],
};

// Types for method definitions
type MethodsWithParameters<T> = {
	[K in keyof T]: T[K] extends (...args: any[]) => any
		? Parameters<T[K]>["length"] extends 0
			? never
			: K
		: never;
}[keyof T];

export type MethodWithParamsTestDefinition<T, TOmit extends keyof T = never> = {
	[K in Extract<MethodsWithParameters<T>, Exclude<keyof T, TOmit>>]: Parameters<
		T[K]
	>;
};

type MethodsWithoutParameters<T> = {
	[K in keyof T]: T[K] extends (...args: any[]) => any
		? Parameters<T[K]>["length"] extends 0
			? K
			: never
		: never;
}[keyof T];

export type MethodWithoutParamsTestDefinition<
	T,
	TOmit extends keyof T = never,
> = readonly Extract<MethodsWithoutParameters<T>, Exclude<keyof T, TOmit>>[];

export type OmittedProperties = "__extra" | "__default" | "__collection";
export const TEST_PAGE_ID = "kql-test";

// Add test report after all tests complete
afterAll(() => {
	console.log("\n=== Restricted Methods Summary ===");
	let hasRestrictions = false;

	for (const [context, methods] of Object.entries(restrictedMethods)) {
		if (methods.length > 0) {
			hasRestrictions = true;
			console.log(`\n${context}:`);
			methods.forEach((method) => console.log(`  - ${method}`));
		}
	}

	if (!hasRestrictions) {
		console.log("\nNo restricted methods found.");
	}
	console.log("\n===============================");
});

export async function testQuery(query: any, context: string) {
	const queryString = transformQuery(query);
	try {
		const response = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${API_TOKEN}`,
			},
			body: JSON.stringify(queryString),
		});

		const data = await response.json();

		if (data.status === "error") {
			const method =
				data.details?.method ||
				data.message.match(/method "([^"]+)"/)?.[1] ||
				data.message.match(/Unknown (method|field) '([^']+)'/)?.[2] ||
				"unknown";

			if (!restrictedMethods[context].includes(method)) {
				restrictedMethods[context].push(method);
				console.log(`❌ Restricted method in ${context}: ${method}`);
			}
			throw new Error(`KQL Error: ${data.message}`);
		}

		return data;
	} catch (error) {
		if (error instanceof Error && error.message.includes("KQL Error")) {
			throw error;
		}
		// Handle network or other errors
		console.error(
			`❌ Test failed (${context}):`,
			error instanceof Error ? error.message : "Unknown error"
		);
		throw error;
	}
}
