import type { Field } from '@kql-ts/core';

declare global {
	namespace KQL {
		interface Page {
			social: Field<{
				platform: string;
				url: string;
				id: `${number}`;
			}>;
		}
	}

	namespace Blocks {
		interface KirbyDefaultBlocks {
			//   customBlock: {
			//     customField: string;
			//   };
		}
	}
}

export {};
