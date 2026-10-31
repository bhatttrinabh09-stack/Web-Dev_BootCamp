// ==============================================================================
// Topic 15 Starter: High-Scale Cursor Pagination
// ==============================================================================

/**
 * Paginates an ordered dataset using cursor seeking.
 * @param {Array<{ id: string, title: string, timestamp: number }>} records
 * @param {string | null} cursorId - ID of last seen item
 * @param {number} limit - Items per page
 * @returns {{ data: Array, nextCursor: string | null, hasMore: boolean }}
 */
export function paginateWithCursor(records, cursorId, limit = 10) {
  // TODO 1: If cursorId is null, start from index 0.
  //         If cursorId is provided, find index of item with id === cursorId.
  //         Start slice at index + 1.

  // TODO 2: Slice 'limit' items.

  // TODO 3: Calculate nextCursor (id of last item in slice) and hasMore boolean.

  // TODO 4: Return { data, nextCursor, hasMore }
  throw new Error("TODO: Implement paginateWithCursor");
}
