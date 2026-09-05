/**
 * @param {import('eslint').Rule.RuleContext} context
 * @param {boolean} badBrowser
 */
export default (context, badBrowser) => ({
  /**
   * @param {import('estree').StaticBlock} node
   */
  StaticBlock(node) {
    context.report({
      node,
      message: `Class Static Blocks are not supported in ${badBrowser}`
    });
  },
});
