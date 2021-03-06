/**
 * Schema Utilities
 */
import { globalIdField } from 'graphql-relay'

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

// Get an empty connection
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

export function modelField (field) {
  field.resolve = function resolve (model, args, { fieldName }) {
    return model.get(fieldName)
  }
  return field
}

export function modelGlobalIdField (name) {
  return globalIdField(name, model => model.get('id'))
}

export function modelIsTypeOf (modelName) {
  return function isTypeOf (model, { rootValue }) {
    return model instanceof rootValue.models[modelName]
  }
}
