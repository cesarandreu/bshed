import Rx from 'rx'

// Creates a job stream from a queue
export function createJobStream (queue) {
  return Rx.Observable.create(observer => {
    queue.process(10, (job, done) => {
      observer.onNext({ job, done })
    })
    return async () => {
      await queue.close()
      observer.onCompleted()
    }
  })
}

// Wraps a function that returns a promise
// Calls params.done with the correct params
export function callDone (fn) {
  return async function innerCallDoneWithResult (params) {
    try {
      const result = await fn(params)
      params.done(null, result)
      return result
    } catch (error) {
      params.done(error)
      throw error
    }
  }
}
