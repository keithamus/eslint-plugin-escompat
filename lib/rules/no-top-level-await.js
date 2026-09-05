const functionTypes = new Set([
  'FunctionDeclaration',
  'FunctionExpression',
  'ArrowFunctionExpression',
]);

export default {
  create (context, badBrowser) {
    return {
      AwaitExpression(node) {
        let currentNode = node;
        while (currentNode.parent) {
          currentNode = currentNode.parent;
          if (functionTypes.has(currentNode.type) && currentNode.async) {
            return;
          }
        }
        context.report(node, `Top-level await is not supported in ${badBrowser}`)
      }
    };
  }
}
