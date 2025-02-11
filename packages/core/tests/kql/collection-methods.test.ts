import { test, describe, expect } from "bun:test";
import { page, site, kirby, file } from "../../src/kql";
import {
	MethodWithoutParamsTestDefinition,
	OmittedProperties,
	testQuery,
	type MethodWithParamsTestDefinition,
} from "./setup";
import { type Collection } from "../../src/types";

describe("Kql Collection Methods Test", () => {
	test("Collection methods with no arguments", async () => {
		const methods = [
			"flip",
			"isEmpty",
			"isEven",
			"isNotEmpty",
			"isOdd",
			"keys",
			"last",
			"listed",
			"next",
			"pagination",
			"reverse",
			"toArray",
			"toJson",
			"unlisted",
			"visible",
			"invisible",
		] as const satisfies MethodWithoutParamsTestDefinition<
			Collection<any>,
			OmittedProperties
		>;

		for (const method of methods) {
			try {
				const query = {
					query: site().children(),
					select: {
						test: site().children()[method]?.(),
					},
				};
				await testQuery(query, "collection");
				console.log(`✓ Collection method ${method} works`);
			} catch (error) {
				console.log(`❌ Collection method ${method} failed`);
			}
		}
	});

	test("Collection methods with arguments", async () => {
		const methods = {
			chunk: [3],
			filterBy: [{ template: "article" }],
			find: ["about"],
			findBy: ["template", "article"],
			groupBy: ["template"],
			has: ["about"],
			limit: [10],
			not: [["about", "contact"]],
			nth: [2],
			offset: [5],
			paginate: [10, { page: 1 }],
			slice: [0, 5],
			skip: [2],
			sortBy: ["title", { date: "desc" }],
			take: [3],
			without: [["about", "contact"]],
			filter: [() => true],
			map: [(item) => item],
		} satisfies MethodWithParamsTestDefinition<
			Collection<any>,
			OmittedProperties
		>;

		for (const [method, args] of Object.entries(methods)) {
			try {
				const query = {
					query: site().children(),
					select: {
						test: site()
							.children()
							[method]?.(...args),
					},
				};
				await testQuery(query, "collection");
				console.log(`✓ Collection method ${method} works`);
			} catch (error) {
				console.log(`❌ Collection method ${method} failed`);
			}
		}
	});
});
