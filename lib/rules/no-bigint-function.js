/**
 * @param {import('eslint').Rule.RuleContext} context
 * @param {boolean} badBrowser
 */
export default (context, badBrowser) => ({
  /**
   * @param {import('estree').BigIntLiteral} node
   */
  'CallExpression[callee.name="BigInt"]'(node) {
    context.report({node, message: `BigInt functions are not supported in ${badBrowser}`})
  }
})
