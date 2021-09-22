const gulp = require('gulp')
const concat = require('gulp-concat')
const browserSync = require('browser-sync').create()
const del = require('del')


function components() {
  return gulp.src('src/components/*.{html,htm}')
    .pipe(concat('components.htm'))
    .pipe(gulp.dest('dist'))
}

function serve(done) {
  browserSync.init({
    server: { baseDir: "./" }
  })
  done()
}

function reload(done) {
  browserSync.reload()
  done()
}

function clean() {
  return del('dist')
}

function copy() {
  return gulp.src('src/assets/**/*.*')
    .pipe(gulp.dest('dist'))
}

function watch() {
  gulp.watch('index.html', gulp.series(reload))
  gulp.watch('src/**/*.{html,htm}', gulp.series(components, reload))
}

const dev = gulp.series(clean, copy, components, serve, watch)

gulp.task('default', dev)