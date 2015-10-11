/**
 * Queue configuration
 * This configuration is used with the kue module
 */
export const production = {
}

export const development = {
  jobEvents: false,
  prefix: 'q',
  redis: {
    port: 6379,
    host: '127.0.0.1'
  }
}

export const test = {
}
