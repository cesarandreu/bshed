/**
 * Schema Utilities
 */

// Generate a field graph
// Leaf nodes are empty objects
// Use info.fieldASTs as a starting point
export function getFieldGraph (fields = []): Object {
  return fields
    .filter(field => field.kind === 'Field')
    .reduce((result, field) => {
      result[field.name.value] = field.selectionSet
        ? getFieldGraph(field.selectionSet.selections)
        : {}
      return result
    }, {})
}

// Get the fields for a type
export function getFields (info: Object): Array<string> {
  const fieldGraph = getFieldGraph(info.fieldASTs)
  return Object.keys(fieldGraph[info.fieldName])
}

// Get the fields for an edge node
export function getEdgeNodeFields (info: Object): Array<string> {
  const fieldGraph = getFieldGraph(info.fieldASTs)
  return Object.keys(fieldGraph[info.fieldName].node)
}

// Get the fields for a connection
export function getConnectionFields (info: Object): Array<string> {
  const fieldGraph = getFieldGraph(info.fieldASTs)
  return Object.keys(fieldGraph[info.fieldName].edges.node)
}

export function getEmptyConnection () {
  return {
    edges: [],
    pageInfo: {
      startCursor: null,
      endCursor: null,
      hasPreviousPage: false,
      hasNextPage: false
    }
  }
}
