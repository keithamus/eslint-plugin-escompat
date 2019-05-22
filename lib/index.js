const path = require('path')
const browserslist = require('browserslist')
const {findConfig} = require('browserslist/node')
const browser = (browserstring, fn) => ({
  create(context) {
    let browsers = browserslist(browserstring)
    const config = findConfig(path.dirname(context.getFilename())) || { defaults: 'defaults' }
    const desiredBrowsers = browserslist(config.defaults)
    const badBrowsers = desiredBrowsers.filter(browser => browsers.indexOf(browser) !== -1).join(', ')
    if (badBrowsers) {
      return fn(context, badBrowsers)
    }
    return {}
  }
})


module.exports = {}
module.exports.rules = {
  'no-exponentiation-operator': browser('chrome < 52, edge < 14, firefox < 52, safari < 10.1', require('./rules/no-exponentiation-operator')),
  'no-edge-destructure-bug': browser('edge < 18', require('./rules/no-edge-destructure-bug')),
  'no-object-rest-spread': browser('edge > 0, safari < 11.1, firefox < 55, chrome < 60', require('./rules/no-object-rest-spread')),
  'no-regexp-s-flag': browser('edge > 0, safari < 11.1, firefox > 0, chrome < 62', require('./rules/no-regexp-s-flag')),
  'no-async-generator': browser('edge > 0, safari < 12, firefox < 57, chrome < 63', require('./rules/no-async-generator')),
  'no-async-iteration': browser('edge > 0, safari < 12, firefox < 57, chrome < 63', require('./rules/no-async-iteration')),
  'no-optional-catch': browser('edge > 0, safari > 0, firefox < 58, chrome < 66', require('./rules/no-optional-catch')),
  'no-numeric-separators': browser('edge > 0, safari > 0, firefox < 68, chrome < 75', require('./rules/no-numeric-separators')),
  'no-public-class-fields': browser('edge > 0, safari > 0, firefox > 0, chrome < 72', require('./rules/no-public-class-fields')),
  'no-private-class-fields': browser('edge > 0, safari > 0, firefox > 0, chrome < 74', require('./rules/no-private-class-fields')),
  'no-do-expression': browser('edge > 0, safari > 0, firefox > 0, chrome > 0', require('./rules/no-do-expression')),
  'no-bind-operator': browser('edge > 0, safari > 0, firefox > 0, chrome > 0', require('./rules/no-bind-operator')),
  'no-pipeline-operator': browser('edge > 0, safari > 0, firefox > 0, chrome > 0', require('./rules/no-pipeline-operator')),
  'no-optional-chaining': browser('edge > 0, safari > 0, firefox > 0, chrome > 0', require('./rules/no-optional-chaining')),
}

module.exports.configs = {
  recommended: {
    plugins: ['escompat'],
    parserOptions: { ecmaVersion: 2019 },
    rules: Object.keys(module.exports.rules).reduce((o, r) => (o['escompat/' + r] = ['error'], o), {})
  }
}
