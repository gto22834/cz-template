# cz-template

> The Commitizen adapter to formulate commit message.
This repository is inspired by cz-emoji

## Install

1. Install package
```sh
$ npm i -g cz-template
```

2. create .czrc in your project folder

## Usage

> The ./czrc look like...

1. You can add `quesstions`, `scopes`, `types` to extend default setting.
2. Change `formula` with es6 strings template to format commit message
  [reference](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#type)
  Support:
    - ${title}: This will fill commit type e.q. feat, fix, ...
    - ${emoji}: Fill emoji icon
    - ${subject}: Fill subject of commit message
    - ${description}: Fill description about commit message
    - ${scope}: Fill scope name
  e.q. ${title} ${emoji} ${scope}: ${subject => fix 🎉 (common): Fixed example

> NOTE: Have a issue with `scopes`


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

## TODO

- [ ] Fixed scopes options
- [ ] Add loader to find .czrc ([reference](https://github.com/commitizen/cz-cli/blob/master/src/configLoader/loader.js#L20))
- [ ] Pull request cz-ci to support `js` format

## Reference:
[cz-emoji](https://github.com/up9cloud/cz-emoji)
[cz-ci](https://github.com/commitizen/cz-cli)
