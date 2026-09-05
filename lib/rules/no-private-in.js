/**
 * @author Yosuke Ota
 * @license MIT
 */

/**
 * @param {import('eslint').Rule.RuleContext} context
 * @param {boolean} badBrowser
 */
export default (context, badBrowser) => {
  return {
    /**
     * @param {import('estree').PrivateIdentifier & {
     *   parent: import('estree').BinaryExpression
     * }} node
     */
    "BinaryExpression[operator='in'] > PrivateIdentifier.left"(node) {
      context.report({
        node,
        message: `Private Class Fields with in (\`#{{private}} in {{object}}\`) are not supported in ${badBrowser}.`,
        data: {
          private: node.name,
          object:
            node.parent.right.type === "Identifier"
              ? node.parent.right.name
              : "object",
        }
      })
    }
  };
};
