/**
 * @param {import('eslint').Rule.RuleContext} context
 * @param {boolean} badBrowser
 */
export default (context, badBrowser) => ({
  // istanbul ignore next -- Older versions of babel-eslint

  /**
   * @param {import('estree').PrivateIdentifier} node
   */
  ClassPrivateProperty(node) {
    context.report({node, message: `Private Class Fields are not supported in ${badBrowser}`})
  },
  /**
   * @param {import('estree').PrivateIdentifier} node
   */
  PrivateIdentifier(node) {
    context.report({node, message: `Private Class Fields are not supported in ${badBrowser}`})
  }
})
