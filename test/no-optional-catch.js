var rule = require('../lib/rules/no-optional-catch')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester({parser: require.resolve('babel-eslint'), parserOptions: {ecmaVersion: 2018}})

ruleTester.run('no-optional-catch', rule, {
  valid: [
    {code: 'try { foo() } catch (error) {}'},
    {code: 'try { foo() } catch (e) {}'},
    {code: 'try { foo() } catch (_) {}'}
  ],
  invalid: [
    {
      code: 'try { foo() } catch {}',
      errors: [
        {
          message:
            'Optional Catch Parameters are not supported in undefined'
        }
      ]
    }
  ]
})
