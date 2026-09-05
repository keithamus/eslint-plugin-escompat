import fs from 'node:fs'
import assert from 'node:assert'
import path from 'node:path'
import { createRequire } from "node:module";

import globals from 'globals'
import { RuleTester } from 'eslint'

import config from '../lib/index.js'

const require = createRequire(import.meta.url);

const docDir = './docs'

globalThis.ESLINT_TESTING = true; // Flag for rule creation

const ruleTester = new RuleTester({languageOptions: {globals: {...globals.es2020}, sourceType: 'module'}})

/**
 * @param {string} dir
 */
function rulesFromDir(dir) {
  try {
    return fs.readdirSync(`./${dir}`).map(f => path.basename(f, path.extname(f)))
  } catch {
    return []
  }
}

/**
 * @param {string[]} lines
 */
function* extractCodeblocks(lines) {
  let inCodeBlock = false
  let codeLines = []
  /** @type {number} */
  let startLine = 0
  // let endLine = 0
  let lang = ''
  for (const [i, line] of lines.entries()) {
    if (!inCodeBlock && line.startsWith('```')) {
      lang = line.slice(3)
      startLine = i
      codeLines = []
      inCodeBlock = true
      continue
    } else if (inCodeBlock && line.startsWith('```')) {
      // endLine = i
      yield {code: codeLines, startLine, lang} // , endLine
      inCodeBlock = false
      continue
    }
    if (inCodeBlock) {
      codeLines.push(line)
    }
  }
}

describe('smoke tests', () => {
  it('has file for each exported rule and rule for each exported file', () => {
    assert.deepStrictEqual(
      Object.keys(config.rules).sort(),
      rulesFromDir('lib/rules').sort(),
      'Expected lib/rules/*.js to be inside lib/index.js#rules'
    )
  })

  for (const flavour in config.configs) {
    describe(`${flavour} config`, () => {
      it('exports valid rules', () => {
        const exportedRules = new Set(Object.keys(config.rules))
        const ceRules = Object.keys(/** @type {{rules?: Record<string, unknown>}} */ (config.configs[flavour]).rules || []).filter(rule => rule.startsWith('escompat/'))
        const violations = ceRules.filter(rule => !exportedRules.has(rule.replace(/^escompat\//, '')))
        assert.deepStrictEqual(violations, [], 'All custom-elements/ rules should exist in lib/index.js#rules')
      })
    })
  }
})

describe('rule enablement logic (line 40)', () => {
  it('returns empty object when not testing and no bad browsers exist', () => {
    const originalTesting = globalThis.ESLINT_TESTING;
    globalThis.ESLINT_TESTING = false;

    const rule = config.rules['no-edge-destructure-bug'];
    const browserslist = require('browserslist');
    const originalFindConfig = browserslist.findConfig;

    browserslist.findConfig = () => ({ defaults: ['edge 18'] });

    try {
      const result = rule.create(/** @type {any} */ ({
        getFilename: () => '/fake/path/file.js'
      }));
      assert.deepStrictEqual(result, {});
    } finally {
      globalThis.ESLINT_TESTING = originalTesting;
      browserslist.findConfig = originalFindConfig;
    }
  });

  it('returns rule definition when not testing but bad browsers exist (line 38)', () => {
    const originalTesting = globalThis.ESLINT_TESTING;
    globalThis.ESLINT_TESTING = false;

    const rule = config.rules['no-edge-destructure-bug'];
    const browserslist = require('browserslist');
    const originalFindConfig = browserslist.findConfig;

    browserslist.findConfig = () => ({ defaults: ['edge 16'] });

    try {
      const result = rule.create(/** @type {any} */ ({
        getFilename: () => '/fake/path/file.js'
      }));
      // the rule's create function returns an object (the AST visitors)
      assert.strictEqual(typeof result, 'object');
      assert.notDeepStrictEqual(result, {});
    } finally {
      globalThis.ESLINT_TESTING = originalTesting;
      browserslist.findConfig = originalFindConfig;
    }
  });
});

describe('test coverage', () => {
  it('has tests for each rule and rules for each test', () => {
    const tests = rulesFromDir('test').filter(name => name !== 'check-rules')
    assert.deepStrictEqual(rulesFromDir('lib/rules'), tests, 'Expected lib/rules/*.js to have same files as test/*.js')
  })
})

describe('documentation', () => {
  it('has rule for each doc file and doc file for each rule', () => {
    assert.deepStrictEqual(rulesFromDir(docDir), rulesFromDir('lib/rules'))
  })

  it('has readme link to each doc', () => {
    const contents = fs.readFileSync(`./README.md`, 'utf-8').split('\n')
    const i = contents.indexOf('## Rules')
    let n = contents.findIndex((line, index) => index > i && line.startsWith('#'))
    if (n < i) n = contents.length
    const ruleLinks = contents
      .slice(i + 1, n)
      .filter(Boolean)
      .map(x => x.trim())
    const desiredRuleLinks = rulesFromDir(docDir).map(rule => `- [${rule}](${docDir}/${rule}.md)`)
    assert.deepStrictEqual(desiredRuleLinks, ruleLinks, `Expected each rule in ${docDir}/*.md to have README link`)
  })

  for (const doc of rulesFromDir(docDir)) {
    it(`has correct headings in ${doc}.md`, () => {
      const contents = fs.readFileSync(`${docDir}/${doc}.md`, 'utf-8').split('\n')
      let consume = true
      const headings = contents.filter(line => {
        // Discard lines that aren't headers or thumbs
        if (!(line.startsWith('#') || line.startsWith('\ud83d')) || line.startsWith('#!')) return false
        // Ignore all sub headings/thumbs between `### Options` and `## When Not To Use It`
        if (line === '### Options') {
          consume = false
          return true
        } else if (line === '## When Not To Use It') {
          consume = true
        }
        return consume
      })
      const desiredHeadings = [
        `# ${doc}`,
        '## What is the Fix?',
      ].filter(Boolean)
      assert.deepStrictEqual(headings, desiredHeadings, 'Expected doc to have correct headings')
    })

    it(`has working examples in ${doc}.md`, () => {
      /**
       * @type {{
       *   valid: import('eslint').RuleTester.ValidTestCase[],
       *   invalid: import('eslint').RuleTester.InvalidTestCase[]
       * }}
       */
      const rules = {valid: [], invalid: []}
      const lines = fs.readFileSync(`${docDir}/${doc}.md`, 'utf-8').split('\n')

      for (const {code, startLine} of extractCodeblocks(lines)) {
        const validIndex = lines.lastIndexOf('👍 Examples of **correct** code for this rule:', startLine)
        const invalidIndex = lines.lastIndexOf('👎 Examples of **incorrect** code for this rule:', startLine)

        if (validIndex === invalidIndex) {
          continue
        }

        let filename = ''
        if (code[0].match(/\s*\/\/ .*\.[jt]s$/)) {
          filename = code[0].replace('// ', '').trim()
        }

        if (validIndex > invalidIndex) {
          rules.valid.push({code: code.join('\n')})
        } else {
          rules.invalid.push({code: code.join('\n'), errors: 1, filename})
        }
      }

      const rule = config.rules[doc]
      ruleTester.run(doc, rule, rules)
    })

    it(`has javascript examples in ${doc}.md`, () => {
      const lines = fs.readFileSync(`${docDir}/${doc}.md`, 'utf-8').split('\n')
      for (const {lang, startLine} of extractCodeblocks(lines)) {
        assert.equal(lang, 'js', `Expected codeblock on line ${startLine} to equal "js"`)
      }
    })
  }
})

