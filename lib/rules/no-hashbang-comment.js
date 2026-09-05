export default (context, badBrowser) => {
  const { sourceCode } = context;
  return {
    'Program:exit' (node) {
      const [comment] = sourceCode.getAllComments();
      if (comment && comment.type === 'Shebang') {
        context.report(node, `Hashbang comments are not supported in ${badBrowser}`)
      }
    }
  }
}
