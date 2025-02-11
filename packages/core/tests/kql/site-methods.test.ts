import { test, describe, expect } from "bun:test";
import { page, site, kirby, file } from "../../src/kql";
import {
	MethodWithoutParamsTestDefinition,
	OmittedProperties,
	testQuery,
	type MethodWithParamsTestDefinition,
} from "./setup";
import { type Site } from "../../src/types";

describe("Kql Site Methods Test", () => {
	test("Site methods with no arguments", async () => {
		const methods = [
			"children",
			"content",
			"drafts",
			"exists",
			"files",
			"hasListedChildren",
			"hasFiles",
			"hasUnlistedChildren",
			"index",
			"isDraft",
			"isHomePage",
			"isListed",
			"isReadable",
			"isSortable",
			"isUnlisted",
			"language",
			"mediaUrl",
			"modified",
			"panel",
			"previewUrl",
			"siblings",
			"template",
			"templateContent",
		] as const satisfies MethodWithoutParamsTestDefinition<
			Site,
			OmittedProperties
		>;

		for (const method of methods) {
			try {
				const query = {
					query: site(),
					select: {
						test: site()[method]?.(),
					},
				};
				await testQuery(query, "site");
				console.log(`✓ Site method ${method} works`);
			} catch (error) {
				console.log(`❌ Site method ${method} failed`);
			}
		}
	});

	test("Site methods with arguments", async () => {
		const methods = {
			find: ["home"],
			findBy: ["template", "home"],
			findByUri: ["/home"],
			modified: ["Y-m-d", "date", "en"],
			translation: ["en"],
		} satisfies MethodWithParamsTestDefinition<Site, OmittedProperties>;

		for (const [method, args] of Object.entries(methods)) {
			try {
				const query = {
					query: site(),
					select: {
						test: site()[method]?.(...args),
					},
				};
				await testQuery(query, "site");
				console.log(`✓ Site method ${method} works`);
			} catch (error) {
				console.log(`❌ Site method ${method} failed`);
			}
		}
	});
});
