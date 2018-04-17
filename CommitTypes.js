const CommitTypes = {
  feat: {
    emoji: '🎉',
    code: ':tada:',
    description: 'A new feature',
    title: 'Features',
  },
  fix: {
    emoji: '🐞',
    code: ':beetle:',
    description: 'A bug fix',
    title: 'Bug Fixes',
  },
  docs: {
    emoji: '📖',
    code: ':book:',
    description: 'Documentation only changes',
    title: 'Documentation',
  },
  style: {
    emoji: '🌈',
    code: ':rainbow:',
    description: 'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
    title: 'Styles',
  },
  refactor: {
    moji: '👍',
    code: ':+1:',
    description: 'A code change that neither fixes a bug nor adds a feature',
    title: 'Code Refactoring',
  },
  perf: {
    emoji: '🚀',
    code: ':rocket:',
    description: 'A code change that improves performance',
    title: 'Performance Improvements',
  },
  test: {
    emoji: '🚥',
    code: ':traffic_light:',
    description: 'Adding missing tests or correcting existing tests',
    title: 'Tests',
  },
  'build': {
    emoji: '🏗',
    code: ':building_construction:',
    description: 'Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)',
    title: 'Builds',
  },
  'ci': {
    emoji: '🤖',
    code: ':robot:',
    description: 'Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)',
    title: 'Continuous Integrations',
  },
  'chore': {
    emoji: '🍺',
    code: ':beer:',
    description: "Other changes that don't modify src or test files",
    title: 'Chores',
  },
  'revert': {
    emoji: '🔙',
    code: ':back:',
    description: 'Reverts a previous commit',
    title: 'Reverts',
  },
}
module.exports = CommitTypes
