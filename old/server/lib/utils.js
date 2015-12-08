/**
 * Utilities
 */
import invariant from 'invariant'

/**
 * Calculate the nth partial sum of natural numbers
 */
export function sumOf (n: number) {
  invariant(
    Number.isInteger(n) && n > 0,
    `sumOf: Expected "${n}" to be a positive integer.`
  )
  return (n * (n + 1)) / 2
}
