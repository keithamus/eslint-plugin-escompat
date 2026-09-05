/**
 * @param {import('eslint').Rule.RuleContext} context
 * @param {boolean} badBrowser
 */
export default (context, badBrowser) => ({
  /**
   * @param {import('eslint').Rule.Node} node
   */
  ':function[async=true][generator=true]'(node) {
    context.report({node, message: `Async Generators are not supported in ${badBrowser}`})
  }
})
