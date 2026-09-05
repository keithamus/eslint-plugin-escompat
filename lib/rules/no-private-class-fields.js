export default (context, badBrowser) => ({
  // istanbul ignore next -- Older versions of babel-eslint
  ClassPrivateProperty(node) {
    context.report(node, `Private Class Fields are not supported in ${badBrowser}`)
  },
  PrivateIdentifier(node) {
    context.report(node, `Private Class Fields are not supported in ${badBrowser}`)
  }
})
