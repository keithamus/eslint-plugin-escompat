/**
 * @param {import('eslint').Rule.RuleContext} context
 * @param {boolean} badBrowser
 */
export default (context, badBrowser) => ({
  /**
   * @param {import('estree').AssignmentExpression} node
   */
  'AssignmentExpression[operator="||="]'(node) {
    context.report({node, message: `Logical assignment operators are not supported in ${badBrowser}`})
  },
  /**
   * @param {import('estree').AssignmentExpression} node
   */
  'AssignmentExpression[operator="&&="]'(node) {
    context.report({node, message: `Logical assignment operators are not supported in ${badBrowser}`})
  },
  /**
   * @param {import('estree').AssignmentExpression} node
   */
  'AssignmentExpression[operator="??="]'(node) {
    context.report({node, message: `Logical assignment operators are not supported in ${badBrowser}`})
  }
})
