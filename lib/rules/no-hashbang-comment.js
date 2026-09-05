/**
 * @param {import('eslint').Rule.RuleContext} context
 * @param {boolean} badBrowser
 */
export default (context, badBrowser) => {
  const { sourceCode } = context;
  return {
    /**
     * @param {import('estree').Node} node
     */
    'Program:exit' (node) {
      const [comment] = sourceCode.getAllComments();
      // @ts-expect-error No longer available as "Shebang"
      if (comment && comment.type === 'Shebang') {
        context.report({node, message: `Hashbang comments are not supported in ${badBrowser}`})
      }
    }
  }
}
