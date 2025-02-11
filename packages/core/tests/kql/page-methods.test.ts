import { test, describe, expect } from "bun:test";
import { page, site, kirby, file } from "../../src/kql";
import {
	MethodWithoutParamsTestDefinition,
	OmittedProperties,
	testQuery,
	type MethodWithParamsTestDefinition,
} from "./setup";
import { type Page } from "../../src/types";

describe("Kql Page Methods Test", () => {
	test("Page methods with no arguments", async () => {
		const methods = [
			"blueprint",
			"children",
			"childrenAndDrafts",
			"drafts",
			"exists",
			"grandChildren",
			"hasChildren",
			"hasDrafts",
			"hasListedChildren",
			"hasFiles",
			"hasNextListed",
			"hasNextUnlisted",
			"hasPrevListed",
			"hasPrevUnlisted",
			"hasTemplate",
			"hasUnlistedChildren",
			"id",
			"isDraft",
			"isErrorPage",
			"isHomePage",
			"isHomeOrErrorPage",
			"isListed",
			"isReadable",
			"isSortable",
			"isUnlisted",
			"mediaUrl",
			"nextListed",
			"nextUnlisted",
			"num",
			"panel",
			"parent",
			"parentId",
			"parentModel",
			"permalink",
			"permissions",
			"previewUrl",
			"prevListed",
			"prevUnlisted",
			"status",
			"template",
			"uid",
		] as const satisfies MethodWithoutParamsTestDefinition<
			Page,
			OmittedProperties
		>;

		for (const method of methods) {
			try {
				const query = {
					query: page("kql-test"),
					select: {
						test: page()[method]?.(),
					},
				};
				await testQuery(query, "page");
				console.log(`✓ Page method ${method} works`);
			} catch (error) {
				console.log(`❌ Page method ${method} failed`);
			}
		}
	});

	test("Page methods with arguments", async () => {
		const methods = {
			createNum: [{ sort: "date", flip: true }],
			date: ["Y-m-d"],
			find: ["about"],
			findPageOrDraft: ["about"],
			in: ["about"],
			indexOf: [["about", "contact"]],
			modified: ["Y-m-d", "date", "en"],
			next: [["about", "contact"]],
			nextAll: [["about", "contact"]],
			prev: [["about", "contact"]],
			prevAll: [["about", "contact"]],
			render: [{ title: "Test" }],
			search: ["test", { fields: ["title"], words: true, score: true }],
			siblings: [true],
			slug: ["en"],
			translation: ["en"],
			uri: ["en"],
			content: ["en"],
			draft: ["en"],
			file: ["test.jpg"],
			hasNext: [["about", "contact"]],
			image: ["test.jpg"],
			index: [
				{
					drafts: true,
				},
			],
			isFirst: [["about", "contact"]],
			isNth: [9],
		} satisfies MethodWithParamsTestDefinition<Page, OmittedProperties>;

		for (const [method, args] of Object.entries(methods)) {
			try {
				const query = {
					query: page("kql-test"),
					select: {
						test: page()[method]?.(...args),
					},
				};
				await testQuery(query, "page");
				console.log(`✓ Page method ${method} works`);
			} catch (error) {
				console.log(`❌ Page method ${method} failed`);
			}
		}
	});
});
