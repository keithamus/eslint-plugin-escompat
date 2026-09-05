/**
 * @param {import('estree').ObjectPattern } node
 */
const objectPatternHasDefaults = node =>
  node.type === 'ObjectPattern' && node.properties.some(
    prop => 'value' in prop && prop.value.type === 'AssignmentPattern'
  )

/**
 * @param {import('eslint').Rule.RuleContext} context
 */
export default function(context) {
  return {
    /**
     * @param {import('estree').ArrowFunctionExpression} node
     */
    ArrowFunctionExpression(node) {
      // Unary functions don't trip on this bug
      if (node.params.length < 2) return

      // This bug only occurs when some arguments use Object destructuring
      if (!node.params.some(param => param.type === 'ObjectPattern')) return

      const objectPatternArgs = node.params.filter(node => node.type === 'ObjectPattern')

      // This bug is only occurs when an argument uses Object Destructuring with Default assignment
      if (!objectPatternArgs.some(objectPatternHasDefaults)) return

      // This bug gets fixed if the first argument uses Object destructuring with default assignments!
      if (node.params[0].type === 'ObjectPattern' && objectPatternHasDefaults(node.params[0])) return

      context.report({
        node,
        message: 'There is an Edge 15-17 bug which causes second argument destructuring to fail. See https://git.io/fhd7N for more'
      })
    }
  }
}
