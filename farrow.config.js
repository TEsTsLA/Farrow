const { createFarrowConfig } = require('farrow')
const pkg = require('./package.json')
const getDist = route => `${__dirname}/src/modules/${route}/client/${route}.ts`
const src = 'http://localhost:3000/'
const routes = ['book']
module.exports = createFarrowConfig({
  server: {
    esbuild: {
      external: [...Object.keys(pkg.dependencies)],
    },
  },
  // api: [
  //   {
  //     src: 'http://localhost:3000/book',
  //     dist: `${__dirname}/client/book.ts`,
  //     pollingInterval: 10000
  //   }
  // ],
  api: routes.map(route => {
    return {
      src: src + route,
      dist: getDist(route),
      pollingInterval: 5000
    }
  })
})
