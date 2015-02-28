require('crypto').randomBytes(64, function (err, buff) {
  if (err) throw err
  console.log(buff.toString('hex'))
})
