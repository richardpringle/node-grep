#!/usr/bin/env node

const { readFile } = require('fs')

const [, , pattern, ...filenames] = process.argv

if (!pattern) {
  console.log('usage: grep PATTERN [FILE_1] [FILE_2]...')
  process.exit(1)
}

const grep = pattern => string =>
  string.includes(pattern) && console.log(string)

if (filenames.length === 0) {
  let data = ''
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', input => (data += input))
  process.stdin.on('end', () => {
    data.split('\n').forEach(grep(pattern))
    process.exit(0)
  })
}

filenames.forEach(filename =>
  readFile(filename, { encoding: 'utf8' }, (err, file) => {
    if (err) {
      console.log(err)
      process.exit(1)
    }

    file.split('\n').forEach(grep(pattern))
  })
)
