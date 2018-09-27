const {
  gulp,
  series,
  parallel,
  src,
  dest,
} = require('gulp');

const postcss = require('gulp-postcss');
const config = require('./config.json');
const del = require('del');
const minify = require('cssnano');
const rename = require('rename');
// const normalize = require('normalize');
const autoprefix = require('autoprefixer');
// const customVariables = require('postcss-css-variables');
const customProperties = require('postcss-custom-properties');
const mixins = require('postcss-mixins');
// const simpleVariables = require('postcss-simple-vars');
const nested = require('postcss-nested');
// const importCSS = require('gulp-cssimport');
const concat = require('gulp-concat');


// exports.default = function() {
//   return src('src/*.js')
//     .pipe(dest('output/'));
// }

const processorsCSS = [
  // importCSS,
  customProperties,
  // simpleVariables,
  mixins,
  nested,
  autoprefix,
  minify
]

function styles() {
  return src(config.css.src)
    // .pipe(precss)
    .pipe(concat('style.min.css'))
    .pipe(postcss(processorsCSS))
    .pipe(dest(config.css.out));
}

// const watch = () => watch(config.css.src, styles);
const clean = () => del(config.destination);


exports.styles = styles;
exports.clean = clean;
exports.default = series(clean, styles);