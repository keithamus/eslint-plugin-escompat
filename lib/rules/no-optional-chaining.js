/**
 * @param {import('eslint').Rule.RuleContext} context
 * @param {boolean} badBrowser
 */
export default (context, badBrowser) => ({
  // istanbul ignore next -- Older versions of babel-eslint
  /**
   * @param {import('estree').MemberExpression} node
   */
  OptionalMemberExpression(node) {
    context.report({node, message: `Optional Chaining is not supported in ${badBrowser}`})
  },
  /**
   * @param {import('estree').ChainExpression} node
   */
  ChainExpression(node) {
    context.report({node, message: `Optional Chaining is not supported in ${badBrowser}`})
  }
})
