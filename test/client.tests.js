const testContext = require.context('../client', true, /\.test\.(js|jsx)$/)
testContext.keys().forEach(testContext)
