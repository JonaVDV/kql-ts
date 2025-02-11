import { test, describe, expect } from "bun:test";
import { page, site, kirby, file } from "../../src/kql";
import {
	MethodWithoutParamsTestDefinition,
	OmittedProperties,
	testQuery,
	type MethodWithParamsTestDefinition,
} from "./setup";
import { type User } from "../../src/types";

describe("Kql User Methods Test", () => {
	test("User methods with no arguments", async () => {
		const methods = [
			"avatar",
			"content",
			"email",
			"id",
			"language",
			"name",
			"role",
			"roles",
		] as const satisfies MethodWithoutParamsTestDefinition<
			User,
			OmittedProperties
		>;

		for (const method of methods) {
			try {
				const query = {
					query: kirby().user(),
					select: {
						test: kirby().user()[method]?.(),
					},
				};
				await testQuery(query, "user");
				console.log(`✓ User method ${method} works`);
			} catch (error) {
				console.log(`❌ User method ${method} failed`);
			}
		}
	});
});
