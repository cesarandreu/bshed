/**
 * Serve files in the assets folder
 */
import resolvePath from 'resolve-path'
import invariant from 'invariant'
import debug from 'debug'
import path from 'path'
import fs from 'fs'

const log = debug('server:assets')

export default function assets (assetsPath) {
  invariant(
    assetsPath && typeof assetsPath === 'string',
    'Must provide "assetsPath" param'
  )
  const rootPath = path.normalize(assetsPath)

  return async function assetMiddleware (ctx, next) {
    // Only handle GET and HEAD requests
    if (!['GET', 'HEAD'].includes(ctx.method)) {
      return next()
    }

    // Return 404 for favicon for now because it's annoying
    ctx.assert(ctx.path !== '/favicon.ico', 404, 'Not found')

    const {
      extname,
      fileName,
      filePath,
      stats
    } = await getFile(rootPath, ctx.path)

    log(`Responding with "${fileName}"`)
    ctx.set('Last-Modified', stats.mtime.toUTCString())
    ctx.set('Content-Length', stats.size)
    ctx.type = extname
    ctx.body = fs.createReadStream(filePath)
  }
}

// Try getting the desired file info
// If that fails, fall back to index.html
async function getFile (rootPath, requestPath) {
  // If the requested path ends with "/", skip the check and use "index.html"
  if (requestPath[requestPath.length - 1] === '/') {
    requestPath = 'index.html'
  }

  try {
    // Parse the path to get the base, extension, and root
    const {
      base: fileName,
      ext: extname,
      root: fileRoot
    } = path.parse(requestPath)

    // Strip the path of any leading slashes it might have
    // Resolve its location relative to our root path
    const filePath = resolvePath(rootPath, requestPath.substr(fileRoot.length))

    // Get its stats object
    const stats = await getFileStats(filePath)

    return {
      extname,
      fileName,
      filePath,
      stats
    }
  } catch (err) {
    log(`Failed to load "${requestPath}" in "${rootPath}"`)
    log(`${err.name}: ${err.message}`)
    // If any of the above steps fail, try again with index.html
    if (requestPath !== 'index.html') {
      return await getFile(rootPath, 'index.html')
    } else {
      console.error(`No "index.html" file found in "${rootPath}"`)
      throw err
    }
  }
}

function getFileStats (filePath) {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      err || !stats.isFile()
        ? reject(err || new Error(`File path "${filePath}" is not a file`))
        : resolve(stats)
    })
  })
}
