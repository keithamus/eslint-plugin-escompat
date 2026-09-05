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
  'ClassProperty[static=true]:not([typeAnnotation]:not([value]))'(node) {
    context.report({node, message: `Static Class Fields are not supported in ${badBrowser}`})
  },
  /**
   * @param {import('estree').Property} node
   */
  'PropertyDefinition[static=true]:not([typeAnnotation]:not([value]))'(node) {
    context.report({node, message: `Static Class Fields are not supported in ${badBrowser}`})
  }
})
