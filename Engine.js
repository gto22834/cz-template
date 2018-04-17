var wrap = require('word-wrap')
// var map = require('lodash.map')
var longest = require('longest')
var rightPad = require('right-pad')

var filter = function (array) {
  return array.filter(function (x) {
    return x
  })
}

module.exports = function (options) {
  var length = longest(Object.keys(options)).length + 1
  var choices = []
  for (var key in options) {
    if (options.hasOwnProperty(key)) {
      choices.push({
        name: rightPad(key + ':', length) + ' ' + options[key].type.description,
        value: key,
      })
    }
  }

  return {
    prompter: function (cz, commit) {
      console.log('\nLine 1 will be cropped at 100 characters. All other lines will be wrapped after 100 characters.\n')
      cz.prompt([
        {
          type: 'list',
          name: 'type',
          message: 'Select the type of change that you\'re committing:',
          choices: choices,
        }, {
          type: 'input',
          name: 'scope',
          message: 'What is the scope of this change (e.g. component or file name)? (press enter to skip)\n',
        }, {
          type: 'input',
          name: 'subject',
          message: 'Write a short, imperative tense description of the change:\n',
        }, {
          type: 'input',
          name: 'body',
          message: 'Provide a longer description of the change: (press enter to skip)\n',
        }, {
          type: 'confirm',
          name: 'isBreaking',
          message: 'Are there any breaking changes?',
          default: false,
        }, {
          type: 'input',
          name: 'breaking',
          message: 'Describe the breaking changes:\n',
          when: function (answers) {
            return answers.isBreaking
          },
        }, {
          type: 'confirm',
          name: 'isIssueAffected',
          message: 'Does this change affect any open issues?',
          default: false,
        }, {
          type: 'input',
          name: 'issues',
          message: 'Add issue references (e.g. "fix #123", "re #123".):\n',
          when: function (answers) {
            return answers.isIssueAffected
          },
        },
      ])
        .then(function (answers) {
          var maxLineWidth = 100

          var wrapOptions = {
            trim: true,
            newline: '\n',
            indent: '',
            width: maxLineWidth,
          }

          // parentheses are only needed when a scope is present
          var scope = answers.scope.trim()
          scope = scope ? '(' + answers.scope.trim() + ')' : ''

          // Hard limit this line
          var head = (answers.type + scope + ': ' + answers.subject.trim()).slice(0, maxLineWidth)

          // Wrap these lines at 100 characters
          var body = wrap(answers.body, wrapOptions)

          // Apply breaking change prefix, removing it if already present
          var breaking = answers.breaking ? answers.breaking.trim() : ''
          breaking = breaking ? 'BREAKING CHANGE: ' + breaking.replace(/^BREAKING CHANGE: /, '') : ''
          breaking = wrap(breaking, wrapOptions)

          var issues = answers.issues ? wrap(answers.issues, wrapOptions) : ''

          var footer = filter([ breaking, issues ]).join('\n\n')

          commit(head + '\n\n' + body + '\n\n' + footer)
        })
    },
  }
}
