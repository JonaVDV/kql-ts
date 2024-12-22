import type { PageServerLoad } from "./$types.js";
import type { KQLQueryTypeResolver } from "@kql-ts/core";
import {} from "@kql-ts/core";
export const load: PageServerLoad = async () => {
  return {
    test: "hello world",
  };
};
