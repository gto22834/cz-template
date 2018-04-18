# cz-template

> The Commitizen adapter to formulate commit message.
This repository is inspired by cz-emoji

## Install

1. Install package
```sh
$ npm i -g https://github.com/gto22834/cz-template.git
```

2. create .czrc in your project folder

## Usage

> The ./czrc look like...

```json
{
  "path": "cz-template",
  "config": {
    "cz-template": {
      "questions": [
        {
          "type": "input",
          "name": "issues",
          "message": "Add issue references (e.g. 'fix #123', 're #123'.):\n"
        }
      ],
      "scopes": [
        {
          "name": "test",
          "value": "test"
        }
      ],
      "types": [
        {
          "description": "Add new feature",
          "title": "Features",
          "name": "feat",
          "emoji": "🎉",
          "code": ":tada:"
        },
        {
          "description": "Add type test",
          "title": "Test add type",
          "name": "testAddType",
          "emoji": "🎉",
          "code": ":tada:"
        }
      ],
      "formula": "${title} ${emoji} ${scope}: ${subject}"
    }
  }
}
```

> Add questions

```json
...
  "config": {
    "cz-template": {
      "questions": [
        {
          "type": "input",
          "name": "{String} The name of question.",
          "message": "{String}"
        }
      ]
    }
  }
```
