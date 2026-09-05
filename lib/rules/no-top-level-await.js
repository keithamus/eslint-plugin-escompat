const functionTypes = new Set([
  'FunctionDeclaration',
  'FunctionExpression',
  'ArrowFunctionExpression',
]);

export default {
  /**
   * @param {import('eslint').Rule.RuleContext} context
   * @param {boolean} badBrowser
   */
  create (context, badBrowser) {
    return {
      /**
       * @param {import('eslint').Rule.Node} node
       */
      AwaitExpression(node) {
        let currentNode = node;
        while (currentNode.parent) {
          currentNode = currentNode.parent;
          if (functionTypes.has(currentNode.type) && 'async' in currentNode &&
            currentNode.async) {
            return;
          }
        }
        context.report({node, message: `Top-level await is not supported in ${badBrowser}`})
      }
    };
  }
}
