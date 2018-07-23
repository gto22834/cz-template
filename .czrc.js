module.exports = {
  "path": "./index",  // Your adapter
  "config": {
    /**
     * @prop {object} ['cz-template']           The configuration of cz-template
     * @prop {array}  ['cz-template'.questions] 
     */
    "cz-template": {
      "questions": [
        {
          "type": "input",
          "name": "issues",
          "message": "Add issue references (e.g. 'fix #123', 're #123'.):\n"
        }
      ],
      "formula": "${title} ${emoji} ${scope}: ${subject}"
    }
  }
}
