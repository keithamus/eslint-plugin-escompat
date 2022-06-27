var rule = require('../lib/rules/no-optional-catch')
var RuleTester = require('eslint').RuleTester

var ruleTesterBabel = new RuleTester({parser: require.resolve('@babel/eslint-parser')})
var ruleTester = new RuleTester({parserOptions: {ecmaVersion: 2019}})

const tests = {
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
}

ruleTester.run('no-optional-catch', rule, tests)
ruleTesterBabel.run('no-optional-catch (babel)', rule, tests)
