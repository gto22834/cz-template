const fs = require('fs')
const path = require('path')

const defaultConfig = {
  subjectMaxLength: 75,
}

/**
 * Get the entries for a directory.
 * @param {string} directory The directory to search in.
 * @returns {string[]} The entries in the directory or an empty array on error.
 * @private
 */
function getDirectoryEntries (directory) {
  try {
    return fs.readdirSync(directory)
  } catch (ex) {
    return []
  }
}

function loadConfig (file) {
  var promise = new Promise((resolve, reject) => {
    if (file.match(/\.js$/)) {
      const js = require(file)
      resolve(js)
    } else {
      fs.readFile(file, 'utf8', (err, content) => {
        if (err) reject(err)
        try {
          const json = JSON.parse(content) || null
          resolve(json)
        } catch (e) {
          reject(e)
        }
      })
    }
  })
    .then(res => {
      if (res.config && res.config['cz-template']) {
        return Object.assign(defaultConfig, res.config['cz-template'])
      }
      return defaultConfig
    })
    .catch(e => {
      // TODO: retry homeDir('.czrc')
      // var file = path.resolve('.czrc')
      console.error(e)
      return defaultConfig
    })
  return promise
}

module.exports = dir => {
  dir = dir || process.cwd()
  const dirs = getDirectoryEntries(dir)
  let fileName = ''
  for (let i = 0; i < dirs.length; i++) {
    const result = dirs[i].match('.czrc')
    if (result) {
      fileName = result.input
      continue
    }
  }
  let file = (fileName === '') ? path.join(__dirname, '..', '.czrc') : path.join(process.cwd(), fileName)
  const config = loadConfig(file)
  return config
}
