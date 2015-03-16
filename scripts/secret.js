// Print to stdout if called directly
if (require.main === module)
  generateSecret(function (err, secret) {
    if (err) throw err
    console.log(secret)
  })

module.exports = generateSecret

function generateSecret (cb) {
  require('crypto').randomBytes(64, function (err, buff) {
    err ? cb(err) : cb(null, buff.toString('hex'))
  })
}
