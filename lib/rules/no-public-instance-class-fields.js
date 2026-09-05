/**
 * @param {import('eslint').Rule.RuleContext} context
 * @param {boolean} badBrowser
 */
export default (context, badBrowser) => ({
  // Ignore type annotations that don't assign
  // istanbul ignore next -- Older versions of eslint
  /**
   * @param {import('estree').Property} node
   */
  'ClassProperty[static=false]:not([typeAnnotation]:not([value]))'(node) {
    if (node.value === null) return
    context.report({node, message: `Instance Class Fields are not supported in ${badBrowser}`})
  },
  /**
   * @param {import('estree').Property} node
   */
  'PropertyDefinition[static=false]:not([typeAnnotation]:not([value]))'(node) {
    if (node.value === null) return
    context.report({node, message: `Instance Class Fields are not supported in ${badBrowser}`})
  }
})
