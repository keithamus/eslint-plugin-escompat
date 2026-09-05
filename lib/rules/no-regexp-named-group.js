/**
 * @param {string} s
 */
const hasNamedGroup = s => /\(\?<[_$\w]/.test(s)

/**
 * @param {import('eslint').Rule.RuleContext} context
 * @param {boolean} badBrowser
 */
export default (context, badBrowser) => ({
  /**
   * @param {import('estree').RegExpLiteral} node
   */
  'Literal[regex]'(node) {
    if (hasNamedGroup(node.regex.pattern)) {
      context.report({node, message: `RegExp named groups are not supported in ${badBrowser}`})
    }
  },
  /**
   * @param {import('estree').CallExpression|import('estree').NewExpression} node
   */
  'CallExpression[callee.name="RegExp"], NewExpression[callee.name="RegExp"]'(node) {
    const [source] = node.arguments;
    if (
      source &&
      (
        (
          source.type === 'Literal' &&
          typeof source.value === 'string' &&
          hasNamedGroup(source.value)
        ) ||
        (
          source.type === 'TemplateLiteral' &&
          source.quasis.some(({value: {raw}}) => hasNamedGroup(raw))
        )
      )
    ) {
      context.report({node, message: `RegExp named groups are not supported in ${badBrowser}`})
    }
  }
})
