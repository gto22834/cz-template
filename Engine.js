'use strict'
const fs = require('fs')
const path = require('path')

const truncate = require('cli-truncate')
var wrap = require('word-wrap')
const Types = require('./Types.js')
const Questions = require('./Questions.js')

var filter = function (array) {
  return array.filter(function (x) {
    return x
  })
}

// TODO: Add home dir finder
// function homeDir (subDir) {
//   var baseDir = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME']
//   return (subDir) ? path.join(baseDir, subDir) : baseDir
// }

function loadConfig (path) {
  var promise = new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, content) => {
      if (err) reject(err)
      try {
        const czrc = JSON.parse(content) || null
        resolve(czrc)
      } catch (e) {
        reject(e)
      }
    })
  })
    .then(res => {
      if (res.config && res.config['cz-template']) {
        return res.config['cz-template']
      }
      return {}
    })
    .catch(e => {
      // TODO: retry homeDir('.czrc')
      // var file = path.resolve('.czrc')
      console.error(e)
    })
  return promise
}

function format (answers, formulaString) {
  // TODO: Use template engine
  let formula = formulaString || '${name}${scope}: ${subject}'
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
        var scope = answers.scope.trim()
        scope = scope ? '(' + answers.scope.trim() + ')' : ''
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
  var file = path.join(process.cwd(), '.czrc')
  console.error(file);
  return {
    prompter: function (cz, commit) {
      let config = {}
      loadConfig(file)
        .then(res => {
          console.error(res);
          
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
