import {
	SETUP_STORE,
	SET_BLOCK_ATTRIBUTES,
	INSERT_BLOCK,
	DELETE_BLOCK,
	SET_CURRENT_BLOCK,
	SET_CURRENT_CHILD_BLOCK,
	REORDER_BLOCKS,
} from './constants';

import type { BlockEditorActionTypes, InitialPayload } from './types';
import type { FormBlock } from '@quillforms/types';

/**
 * Set up the store.
 *
 * @param {InitialPayload} initialPayload Initial payload object.
 *
 * @return {BlockEditorActionTypes} Action object.
 */
export function setupStore(
	initialPayload: InitialPayload
): BlockEditorActionTypes {
	return {
		type: SETUP_STORE,
		initialPayload,
	};
}

/**
 * Set block attributes
 *
 * @param {string} blockId     Block Id
 * @param {Object} attributes  Block attributes
 *
 * @param          parentIndex
 * @param          parentId
 * @return {BlockEditorActionTypes} Action object.
 */
export const setBlockAttributes = (
	blockId: string,
	attributes: Record< string, unknown >,
	parentId: string | undefined = undefined
): BlockEditorActionTypes => {
	return {
		type: SET_BLOCK_ATTRIBUTES,
		blockId,
		attributes,
		parentId,
	};
};

/**
 * Reorder form blocks
 *
 * @param {number} sourceIndex       Source index in the array
 * @param {number} destinationIndex  Destination index in the array
 *
 * @param          sourceId
 * @param          destinationId
 * @param          parentSourceIndex
 * @param          parentDestIndex
 * @return {BlockEditorActionTypes} Action object.
 */
export const __experimentalReorderBlocks = (
	sourceIndex: number,
	destinationIndex: number,
	parentSourceIndex: number | undefined = undefined,
	parentDestIndex: number | undefined = undefined
): BlockEditorActionTypes => {
	return {
		type: REORDER_BLOCKS,
		sourceIndex,
		destinationIndex,
		parentSourceIndex,
		parentDestIndex,
	};
};

/**
 * Insert new form block
 *
 * @param {FormBlock} block            Block object which holds the block definition
 * @param {number}    destinationIndex Destination object
 *
 * @param             parent
 * @return {BlockEditorActionTypes} Action object.
 */
export const __experimentalInsertBlock = (
	block: FormBlock,
	destinationIndex: number,
	parent: string | undefined = undefined
): BlockEditorActionTypes => {
	return {
		type: INSERT_BLOCK,
		block,
		destinationIndex,
		parent,
	};
};

/**
 * Set current block
 *
 * @param {string} blockId Block uuid
 *
 * @return {BlockEditorActionTypes} Action object.
 */
export const setCurrentBlock = ( blockId: string ): BlockEditorActionTypes => {
	return {
		type: SET_CURRENT_BLOCK,
		blockId,
	};
};

/**
 * Set current block
 *
 * @param {string} blockId Block uuid
 *
 * @return {BlockEditorActionTypes} Action object.
 */
export const setCurrentChildBlock = (
	blockId: string
): BlockEditorActionTypes => {
	return {
		type: SET_CURRENT_CHILD_BLOCK,
		blockId,
	};
};

/**
 * Delete current block
 *
 * @param {string} blockId  Block uuid
 *
 * @param          parentId
 * @return {BlockEditorActionTypes} Action object.
 */
export const deleteBlock = (
	blockId: string,
	parentId: string | undefined = undefined
): BlockEditorActionTypes => {
	return {
		type: DELETE_BLOCK,
		blockId,
		parentId,
	};
};
