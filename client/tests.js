const testContext = require.context('.', true, /\.test\.(js|jsx)$/)
testContext.keys().forEach(testContext)
