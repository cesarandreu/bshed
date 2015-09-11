/**
 * Password libs
 * @flow
 */
import bcrypt from 'bcrypt'

/**
 * Hash a password
 */
export function hashPassword (password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 8, (err, hash) => {
      err ? reject(err) : resolve(hash)
    })
  })
}

/**
 * Compare a password and a hash
 */
export function comparePassword (password: string, hash: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, isValid) => {
      err ? reject(err) : resolve(isValid)
    })
  })
}
