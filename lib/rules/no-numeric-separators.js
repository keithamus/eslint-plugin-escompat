export default {
  meta: {
    fixable: 'code'
  },
  /**
   * @param {import('eslint').Rule.RuleContext} context
   * @param {boolean} badBrowser
   */
  create: (context, badBrowser) => ({
    /**
     * @param {import('estree').Literal} node
     */
    'Literal[raw=/_/][value>=0], Literal[raw=/_/][value<=0]'(node) {
      context.report({
        node,
        message: `Numeric Separators are not supported in ${badBrowser}`,
        fix: fixer => fixer.replaceText(node, String(node.value))
      })
    }
  })
}
