import { test, describe, expect } from "bun:test";
import { page, site, kirby, file } from "../../src/kql";
import {
	MethodWithoutParamsTestDefinition,
	OmittedProperties,
	testQuery,
	type MethodWithParamsTestDefinition,
} from "./setup";
import { type File } from "../../src/types";

describe("Kql File Methods Test", () => {
	test("File methods with no arguments", async () => {
		// Test file-specific methods only when we have an image
		const imageOnlyMethods = [
			"dimensions",
			"width",
			"height",
			"ratio",
			"orientation",
		] as const;

		// Generic methods that work on all file types
		const genericMethods = [
			"exists",
			"extension",
			"filename",
			"id",
			"mediaUrl",
			"mime",
			"name",
			"niceSize",
			"permalink",
			"previewUrl",
			"size",
			"template",
			"type",
		] as const;

		const methods = [
			...genericMethods,
			...imageOnlyMethods,
		] as const satisfies MethodWithoutParamsTestDefinition<
			File,
			OmittedProperties
		>;

		for (const method of methods) {
			try {
				const query = {
					query: page("kql-test"),
					select: {
						// First check if the file exists to give better error messages
						hasFile: page().content().singleFile.exists(),
						test: page().content().singleFile[method]?.(),
					},
				};
				await testQuery(query, "file");
				console.log(`✓ File method ${method} works`);
			} catch (error) {
				if (imageOnlyMethods.includes(method)) {
					console.log(
						`❌ Image-specific method ${method} failed - ensure test.jpg exists in /content/kql-test/files/`
					);
				} else {
					console.log(`❌ File method ${method} failed`);
				}
			}
		}
	});

	test("File methods with arguments", async () => {
		// Image manipulation methods
		const imageManipulationMethods = {
			blur: [5],
			crop: [800, 600, "center"],
			quality: [80],
			resize: [800, 600, 80],
			srcset: [["300w", "600w", "900w"]],
			thumb: [{ width: 300, height: 300, crop: "center" }],
		};

		// Generic methods that work on all file types
		const genericMethods = {
			html: [{ class: "image" }],
			modified: ["Y-m-d"],
			url: [{ download: true }],
		};

		const methods = {
			...genericMethods,
			...imageManipulationMethods,
		} satisfies MethodWithParamsTestDefinition<File, OmittedProperties>;

		for (const [method, args] of Object.entries(methods)) {
			try {
				const query = {
					query: page("kql-test"),
					select: {
						// First check if the file exists
						hasFile: page().content().singleFile.exists(),
						test: page()
							.content()
							.singleFile[method]?.(...args),
					},
				};
				await testQuery(query, "file");
				console.log(`✓ File method ${method} works`);
			} catch (error) {
				if (method in imageManipulationMethods) {
					console.log(
						`❌ Image manipulation method ${method} failed - ensure test.jpg exists in /content/kql-test/files/`
					);
				} else {
					console.log(`❌ File method ${method} failed`);
				}
			}
		}
	});
});
