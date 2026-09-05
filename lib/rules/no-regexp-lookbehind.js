/**
 * @param {string} s
 */
const hasLookbehind = s => s.includes('(?<=') || s.includes('(?<!')

/**
 * @param {import('eslint').Rule.RuleContext} context
 * @param {boolean} badBrowser
 */
export default (context, badBrowser) => ({
  /**
   * @param {import('estree').RegExpLiteral} node
   */
  'Literal[regex]'(node) {
    if (hasLookbehind(node.regex.pattern)) {
      context.report({node, message: `RegExp lookbehinds are not supported in ${badBrowser}`})
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
          hasLookbehind(source.value)
        ) ||
        (
          source.type === 'TemplateLiteral' &&
          source.quasis.some(({value: {raw}}) => hasLookbehind(raw))
        )
      )
    ) {
      context.report({node, message: `RegExp lookbehinds are not supported in ${badBrowser}`})
    }
  }
})
