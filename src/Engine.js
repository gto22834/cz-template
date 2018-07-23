'use strict'
const truncate = require('cli-truncate')
var wrap = require('word-wrap')
const Loader = require('./Loader.js')
const Types = require('./Types.js')
const Questions = require('./Questions.js')

var filter = function (array) {
  return array.filter(function (x) {
    return x
  })
}

// TODO: Used quesions map to formula
function format (answers, formulaString) {
  // TODO: Use template engine
  let formula = formulaString || '${name}${scope}: ${subject}' // eslint-disable-line no-template-curly-in-string
  let target = formula.match(/\${(.+?)}/g)
  target.map(string => {
    const key = string.match(/\${(.+?)}/)[1]
    switch (key) {
      case 'emoji':
      case 'title':
      case 'name':
        const value = answers.type[key]
        formula = formula.replace(string, value)
        break
      case 'scope':
        // parentheses are only needed when a scope is present
        let scope = answers.scope
        scope = (scope) ? `(${scope})` : ''
        formula = formula.replace(string, scope)
        break
      case 'subject':
      case 'body':
        formula = formula.replace(string, answers[key])
        break
      default:
        console.error('error key with ' + string)
    }
  })

  const head = truncate(formula.trim(), 100)

  // Wrap these lines at 100 characters
  var wrapOptions = {
    trim: true,
    newline: '\n',
    indent: '',
    width: 100,
  }
  const body = wrap(answers.body, wrapOptions)

  // TODO: break chain
  // Apply breaking change prefix, removing it if already present
  // var breaking = answers.breaking ? answers.breaking.trim() : ''
  // breaking = breaking ? 'BREAKING CHANGE: ' + breaking.replace(/^BREAKING CHANGE: /, '') : ''
  // breaking = wrap(breaking, wrapOptions)

  var issues = answers.issues ? wrap(answers.issues, wrapOptions) : ''
  var footer = filter([issues]).join('\n\n')
  return head + '\n\n' + body + '\n\n' + footer
}

module.exports = () => {
  return {
    prompter: function (cz, commit) {
      let config = {}
      Loader()
        .then(res => {
          var types = Types(res.types)
          config = res
          return Questions(config, types)
        })
        .then(cz.prompt)
        .then(res => format(res, config.formula))
        .then(commit)
    },
  }
}
