'use strict'
const fuse = require('fuse.js')

module.exports = (config, types) => {
  const fuzzy = new fuse(types, { /* eslint-disable-line new-cap */
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ['name', 'code'],
  })
  // Default questions
  var questions = [
    {
      type: 'autocomplete',
      name: 'type',
      message:
        config.questions && config.questions.type
          ? config.questions.type
          : "Select the type of change you're committing:",
      source: (answersSoFar, query) => {
        return Promise.resolve(query ? fuzzy.search(query).map(row => row.item) : types)
      },
    },
    // {
    //   type: config.scopes ? 'list' : 'input',
    //   name: 'scope',
    //   message: 'What is the scope of this change (e.g. component or file name)?',
    //   // Add fuzzy by fuse.js
    //   choices: config.scopes && [{ name: '[none]', value: '' }].concat(config.scopes),
    // },
    {
      type: 'maxlength-input',
      name: 'subject',
      message:
        config.questions && config.questions.subject
          ? config.questions.subject
          : 'Write a short description:',
      maxLength: config.subjectMaxLength,
    },
    {
      type: 'input',
      name: 'subject',
      message: 'Write a short, imperative tense description of the change:\n',
    },
    {
      type: 'input',
      name: 'body',
      message: 'Provide a longer description of the change: (press enter to skip)\n',
    },
  ]

  if (config.questions && Array.isArray(config.questions)) questions = questions.concat(config.questions)
  return questions
}
