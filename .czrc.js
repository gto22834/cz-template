module.exports = {
  path: './index',  // Your adapter
  config: {
    /**
     * @prop {object} ['cz-template']           The configuration of cz-template
     * @prop {array}  ['cz-template'.questions]
     */
    'cz-template': {
      questions: [
        {
          "type": "input",
          "name": "issues",
          "message": "Add issue references (e.g. 'fix #123', 're #123'.):\n"
        },
        {
          type: 'list',
          name: 'scope',
          message: `What is the scope of this change (e.g. component or file name)?`,
          choices: [
            {
              name: `None`,
              value: ``
            },
            {
              name: `platform-account`,
              value: `platform-account`
            },
            {
              name: `platform-editor`,
              value: `platform-editor`
            },
            {
              name: `platform-game`,
              value: `platform-game`
            },
            {
              name: `platform-game-admin`,
              value: `platform-game-admin`
            },
            {
              name: `core-utils`,
              value: `core-utils`
            }
          ]
        }
      ],
      formula: '${name} ${emoji} ${scope}: ${subject}'
    }
  }
}
