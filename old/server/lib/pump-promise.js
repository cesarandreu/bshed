/**
 * Pump wrapped in a Promise
 */
import pump from 'pump'
export default function pumpPromise (streamList: Array<any>) {
  return new Promise((resolve, reject) => {
    pump(streamList, err => err ? reject(err) : resolve())
  })
}
