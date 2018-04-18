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
      console.error(e)
    })
  return promise
}

function format (answers, formula) {
  var wrapOptions = {
    trim: true,
    newline: '\n',
    indent: '',
    width: 100,
  }

  // Hard limit this line
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
  const body = wrap(answers.body, wrapOptions)

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
      var file = path.resolve('.czrc')
      let config = {}
      loadConfig(file)
        .then(res => {
          var types = Types(res.types)
          config = res
          return Questions(config.questions, types)
        })
        .then(cz.prompt)
        .then(res => format(res, config.formula))
        .then(commit)
        // .then(Questions)
        // .then(cz.prompt)
        // .then(scope)
        // .then(commit)
    },
  }
}

// module.exports = function (options) {
//   console.error(loadConfig())
//   var list = []
//   var length = longest(Object.keys(list)).length + 1
//   var choices = []
//   for (var key in list) {
//     if (list.hasOwnProperty(key)) {
//       choices.push({
//         name: rightPad(key + ':', length) + ' ' + list[key].description,
//         value: key,
//       })
//     }
//   }
//
//   return {
//     prompter: function (cz, commit) {
//       console.log('\nLine 1 will be cropped at 100 characters. All other lines will be wrapped after 100 characters.\n')
//       cz.prompt([
//         {
//           type: 'list',
//           name: 'type',
//           message: 'Select the type of change that you\'re committing:',
//           choices: choices,
//         }, {
//           type: 'input',
//           name: 'scope',
//           message: 'What is the scope of this change (e.g. component or file name)? (press enter to skip)\n',
//         }, {
//           type: 'input',
//           name: 'subject',
//           message: 'Write a short, imperative tense description of the change:\n',
//         }, {
//           type: 'input',
//           name: 'body',
//           message: 'Provide a longer description of the change: (press enter to skip)\n',
//         }, {
//           type: 'confirm',
//           name: 'isBreaking',
//           message: 'Are there any breaking changes?',
//           default: false,
//         }, {
//           type: 'input',
//           name: 'breaking',
//           message: 'Describe the breaking changes:\n',
//           when: function (answers) {
//             return answers.isBreaking
//           },
//         }, {
//           type: 'confirm',
//           name: 'isIssueAffected',
//           message: 'Does this change affect any open issues?',
//           default: false,
//         }, {
//           type: 'input',
//           name: 'issues',
//           message: 'Add issue references (e.g. "fix #123", "re #123".):\n',
//           when: function (answers) {
//             return answers.isIssueAffected
//           },
//         },
//       ])
//         .then(function (answers) {
//           var maxLineWidth = 100
//
//           var wrapOptions = {
//             trim: true,
//             newline: '\n',
//             indent: '',
//             width: maxLineWidth,
//           }
//
//           // parentheses are only needed when a scope is present
//           var scope = answers.scope.trim()
//           scope = scope ? '(' + answers.scope.trim() + ')' : ''
//
//           // Hard limit this line
//           var head = (answers.type + scope + ': ' + answers.subject.trim()).slice(0, maxLineWidth)
//
//           // Wrap these lines at 100 characters
//           var body = wrap(answers.body, wrapOptions)
//
//           // Apply breaking change prefix, removing it if already present
//           var breaking = answers.breaking ? answers.breaking.trim() : ''
//           breaking = breaking ? 'BREAKING CHANGE: ' + breaking.replace(/^BREAKING CHANGE: /, '') : ''
//           breaking = wrap(breaking, wrapOptions)
//
//           var issues = answers.issues ? wrap(answers.issues, wrapOptions) : ''
//
//           var footer = filter([ breaking, issues ]).join('\n\n')
//
//           commit(head + '\n\n' + body + '\n\n' + footer)
//         })
//     },
//   }
// }
