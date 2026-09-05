/**
 * @param {import('eslint').Rule.RuleContext} context
 * @param {boolean} badBrowser
 */
export default (context, badBrowser) => ({
  /**
   * @param {import('estree').ImportExpression|import('estree').CallExpression} node
   */
  'ImportExpression, CallExpression[callee.type="Import"]'(node) {
    context.report({node, message: `Dynamic import is not supported in ${badBrowser}`})
  }
})
