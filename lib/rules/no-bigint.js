/**
 * @param {import('eslint').Rule.RuleContext} context
 * @param {boolean} badBrowser
 */
export default (context, badBrowser) => ({
  /**
   * @param {import('estree').BigIntLiteral} node
   */
  'Literal[bigint]'(node) {
    context.report({node, message: `BigInts are not supported in ${badBrowser}`})
  }
})
