'use strict';

const rule = require('../lib/index').rules['no-optional-catch']
const RuleTester = require('eslint').RuleTester
const babelEslintParser = require('@babel/eslint-parser');

const ruleTesterBabel = new RuleTester({languageOptions: {parser: babelEslintParser}})
const ruleTester = new RuleTester({languageOptions: {ecmaVersion: 2019}})

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
