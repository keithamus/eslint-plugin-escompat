/**
 * @param {import('eslint').Rule.RuleContext} context
 * @param {boolean} badBrowser
 */
export default (context, badBrowser) => ({
  // Ignore type annotations that don't assign
  // istanbul ignore next -- `ClassProperty` no longer in use
  /**
   * @param {import('estree').Property} node
   */
  'ClassProperty[computed=true]:not([typeAnnotation]:not([value]))'(node) {
    context.report({node, message: `Computed Class Fields are not supported in ${badBrowser}`})
  },
  /**
   * @param {import('estree').PropertyDefinition} node
   */
  'PropertyDefinition[computed=true]:not([typeAnnotation]:not([value]))'(node) {
    context.report({node, message: `Computed Class Fields are not supported in ${badBrowser}`})
  }
})
