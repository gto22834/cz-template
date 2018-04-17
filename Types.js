const types = [
  {
    'description': 'A new feature',
    'title': 'Features',
    'name': 'feat',
    'emoji': '🎉',
    'code': ':tada:',
  },
  {
    'description': 'A bug fix',
    'title': 'Bug Fixes',
    'name': 'fix',
    'emoji': '🐞',
    'code': ':beetle:',
  },
  {
    'description': 'Documentation only changes',
    'title': 'Documentation',
    'name': 'docs',
    'emoji': '📖',
    'code': ':book:',
  },
  {
    'description': 'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
    'title': 'Styles',
    'name': 'style',
    'emoji': '🌈',
    'code': ':rainbow:',
  },
  {
    'description': 'A code change that neither fixes a bug nor adds a feature',
    'title': 'Code Refactoring',
    'name': 'refactor',
    'emoji': '👍',
    'code': ':+1:',
  },
  {
    'description': 'A code change that improves performance',
    'title': 'Performance Improvements',
    'name': 'perf',
    'emoji': '🚀',
    'code': ':rocket:',
  },
  {
    'description': 'Adding missing tests or correcting existing tests',
    'title': 'Tests',
    'name': 'test',
    'emoji': '🚥',
    'code': ':traffic_light:',
  },
  {
    'description': 'Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)',
    'title': 'Builds',
    'name': 'build',
    'emoji': '🏗',
    'code': ':building_construction:',
  },
  {
    'description': 'Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)',
    'title': 'Continuous Integrations',
    'name': 'ci',
    'emoji': '🤖',
    'code': ':robot:',
  },
  {
    'description': "Other changes that don't modify src or test files",
    'title': 'Chores',
    'name': 'chore',
    'emoji': '🍺',
    'code': ':beer:',
  },
  {
    'description': 'Reverts a previous commit',
    'title': 'Reverts',
    'name': 'revert',
    'emoji': '🔙',
    'code': ':back:',
  },
]
module.exports = (config) => {
  var list = []
  if (config) {
    if (typeof config === 'string') {
      list = require(config)
    }

    // Merge
    types.map(item => {
      for (var i = 0; i < list.length; i++) {
        if (item.name === list[i]) {
          item = list[i]
        } else {
          types.push(list[i])
        }
      }
    })

    return types
  }
  return null
}
