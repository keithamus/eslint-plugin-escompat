/**
 * @param {import('eslint').Rule.RuleContext} context
 * @param {boolean} badBrowser
 */
export default (context, badBrowser) => ({
  /**
   * @param {import('estree').RegExpLiteral} node
   */
  'Literal[regex]'(node) {
    if (node.regex.flags.includes('s')) {
      context.report({node, message: `RegExp "s" flag is not supported in ${badBrowser}`})
    }
  },
  /**
   * @param {import('estree').CallExpression|import('estree').NewExpression} node
   */
  'CallExpression[callee.name="RegExp"], NewExpression[callee.name="RegExp"]'(node) {
    const [, flags] = node.arguments;
    if (
      flags &&
      (
        (
          flags.type === 'Literal' &&
          typeof flags.value === 'string' &&
          flags.value.includes('s')
        ) ||
        (
          flags.type === 'TemplateLiteral' &&
          flags.quasis.some(({value: {raw}}) => raw.includes('s'))
        )
      )
    ) {
      context.report({node, message: `RegExp "s" flag is not supported in ${badBrowser}`})
    }
  }
})
