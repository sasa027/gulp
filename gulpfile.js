const { src, dest, series, watch } = require('gulp');
const include = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso');
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const del = require('del');
const sync = require('browser-sync').create()

function htmlInclude() {
  return src('src/**.html')
    .pipe(include({
      prefix:'@@'
    }))
    .pipe(htmlmin({
      collapseWhitespace:true
    }))
    .pipe(dest('dist'))
}
function scss(){
  return src('src/scss/style.scss')
    .pipe(sass())
    .pipe(csso())
    .pipe(concat('style.css'))
    .pipe(dest('dist/css'))
}
function clear(){
  return del('dist')
}
function imgs(){
  return src('src/img/**/**/**.**')
    .pipe(dest('dist/img/'))
}
function serve() {
  sync.init({
    server:'./dist'
  })
  
  watch('src/**.html', series(htmlInclude)).on('change',sync.reload)
  watch('src/scss/**.scss', series(scss)).on('change',sync.reload)
  watch('src/html/', series(htmlInclude)).on('change',sync.reload)
}
exports.dev = series(clear,imgs, scss, htmlInclude, serve);
exports.imgs  = (imgs)
exports.clear  = (clear)
