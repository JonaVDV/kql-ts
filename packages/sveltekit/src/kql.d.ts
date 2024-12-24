declare global {
	namespace KQL {
		interface Page {
			customField: string;
			myCustomMethod: () => void;
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
