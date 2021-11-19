const through2 = require('through2').obj
const sass = require('sass')

module.exports = function(indented = false) {
  return through2(function(file, encoding, callback) {
    file.contents = Buffer.from(file.contents.toString().replace(/(?<=<style[^>]*?>)([^]+?)(?=<\/style>)/g,
      (match, fixing) => sass.renderSync({
        data: fixing.toString(),
          indentedSyntax: indented
        }).css.toString()
      )
    )
    callback(null, file)
  })
}