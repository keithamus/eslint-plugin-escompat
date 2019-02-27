const getRegExpFlags = node => {
  if (node.regex) {
    return node.regex.flags;
  }
  if (typeof node.value === "string" &&
    (node.parent.type === "NewExpression" || node.parent.type === "CallExpression") &&
    node.parent.callee.type === "Identifier" &&
    node.parent.callee.name === "RegExp" &&
    node.parent.arguments[1] === node
  ) {
    return node.value;
  }
  return null;
}


module.exports = function(context, badBrowser) {
  return {
    Literal(node) {
      const flags = getRegExpFlags(node)
      if (!flags) return
      if (flags.indexOf('s') !== -1) {
        context.report(
          node,
          `RegExp "s" flag is not supported in ${badBrowser}`
        )
      }
    }
  }
}

module.exports.schema = []
