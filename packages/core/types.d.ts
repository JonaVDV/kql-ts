/* eslint-disable @typescript-eslint/no-empty-object-type */
/**
 * This file is used to extend the types of the KQL objects.
 * hence we need to disable the eslint rule for empty object type.
 */
declare namespace KQL {
	/**
	 * Represents a Kirby page. you can add custom fields and methods to it. using this interface.
	 */
	interface Page {}
	/**
	 * Represents the Kirby site object. you can add custom fields and methods to it. using this interface.
	 */
	interface Site {}
	/**
	 * Represents the Kirby file object. you can add custom fields and methods to it. using this interface
	 */
	interface File {}
	/**
	 * Represents the Kirby object. you can add custom fields and methods to it. using this interface
	 */
	interface App {}
	/**
	 * Represents the Kirby field object. you can add custom fields and methods to it. You can also use the imported Field type from the core package.
	 */
	interface Field {}
}

declare namespace Blocks {
	/**
	 * Stores all the default blocks that are available in Kirby.
	 * You can add custom blocks to this interface.
	 * @example
	 * declare global {
	 *  namespace Blocks {
	 *   interface KirbyDefaultBlocks {
	 *    customBlock: {
	 *     customField: string;
	 *   };
	 */
	interface KirbyDefaultBlocks {}
}
