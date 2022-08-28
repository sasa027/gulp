const { src, dest, series, watch } = require('gulp');
const include = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso');
const sync = require('browser-sync').create();
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const del = require('del');

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
  return src('src/scss/**.scss')
    .pipe(sass())
    .pipe(csso())
    .pipe(concat('style.css'))
    .pipe(dest('dist/css'))
}
function clear(){
  return del('dist')
}
function serve() {
  sync.init({
    server:'./dist'
  })
  
  watch('src/**.html', series(htmlInclude)).on('change',sync.reload)
  watch('src/scss/**.scss', series(scss)).on('change',sync.reload)
  watch('src/components/**/**.**', series(clear,scss, htmlInclude)).on('change',sync.reload)
}
exports.serve = series(clear, scss, htmlInclude, serve);
