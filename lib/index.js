const path = require('path')
const browserslist = require('browserslist')
const {findConfig} = require('browserslist/node')
const {version,homepage} = require('../../package.json')
const createRule = (name, browserstring, description, {fixable = null, schema = []} = {}) => {
  module.exports.rules[name] = {
    meta: {
      type: 'problem',
      docs: {
        description,
        recommended: true,
        url: `${homepage}/blob/v${version}/docs/${name}.md`
      },
      fixable,
      schema,
      deprecated: false,
      replacedBy: null,
    },
    create(context) {
      let browsers = browserslist(browserstring)
      const config = findConfig(path.dirname(context.getFilename())) || { defaults: 'defaults' }
      const desiredBrowsers = browserslist(config.defaults)
      const badBrowsers = desiredBrowsers.filter(browser => browsers.indexOf(browser) !== -1).join(', ')
      if (badBrowsers) {
        return require(`./rules/${name}`)(context, badBrowsers)
      }
      return {}
    }
  }
}

module.exports = { rules: {}, configs: {} }
// ES2015
createRule('no-edge-destructure-bug', 'edge < 18', 'disallow the use of specific destructuring patterns that cause bugs in old Edge')

// ES2016
createRule('no-exponentiation-operator', 'chrome < 52, edge < 14, firefox < 52, safari < 10.1', 'disallow use of exponentiation operator (**)')

// ES2018
createRule('no-async-iteration', 'edge > 0, safari < 12, firefox < 57, chrome < 63', 'disallow the use of `for await of` style loops')
createRule('no-async-generator', 'edge > 0, safari < 12, firefox < 57, chrome < 63', 'disallow the use of async generator functions')
createRule('no-object-rest-spread', 'edge > 0, safari < 11.1, firefox < 55, chrome < 60', 'disallow object rest/spread patterns')
createRule('no-regexp-s-flag', 'edge > 0, safari < 11.1, firefox > 0, chrome < 62', 'disallow the use of the RegExp `s` flag')

// ES2019
createRule('no-optional-catch', 'edge > 0, safari > 0, firefox < 58, chrome < 66', 'always require catch() to have an argument')

// Proposals...
createRule('no-numeric-separators', 'edge > 0, safari < 13, firefox < 68, chrome < 75', 'disallow use of numeric seperators like 1_000_000')
createRule('no-public-static-class-fields', 'edge > 0, safari > 0, firefox > 0, chrome < 72', 'disallow public static class fields like foo = 1')
createRule('no-public-instance-class-fields', 'edge > 0, safari > 0, firefox < 69, chrome < 72', 'disallow public class fields like foo = 1')
createRule('no-private-class-fields', 'edge > 0, safari > 0, firefox > 0, chrome < 74', 'disallow private class fields like #foo = 1')
createRule('no-do-expression', 'edge > 0, safari > 0, firefox > 0, chrome > 0', 'disallow "do" expressions')
createRule('no-bind-operator', 'edge > 0, safari > 0, firefox > 0, chrome > 0', 'disallow the :: bind operator')
createRule('no-pipeline-operator', 'edge > 0, safari > 0, firefox > 0, chrome > 0', 'disallow the > pipeline operator')
createRule('no-optional-chaining', 'edge > 0, safari > 0, firefox > 0, chrome > 0', 'disallow the .? optional chaning operator')

module.exports.configs.recommended = {
  plugins: ['escompat'],
  parserOptions: { ecmaVersion: 2020 },
  rules: Object.keys(module.exports.rules).reduce((o, r) => (o['escompat/' + r] = ['error'], o), {})
}
