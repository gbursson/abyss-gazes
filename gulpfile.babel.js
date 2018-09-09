const gulp = require('gulp');
const postcss = require('gulp-postcss');
// const babel = require('@babel/core');
// const babel = require('gulp-babel');
const rename = require('gulp-rename');
const config = require('./config.json');
const del = require('del');
const simpleVars = require('postcss-simple-vars');
const postcssImport = require('postcss-import');
const minify = require('cssnano');
const mixins = require('postcss-mixins');
const nested = require('postcss-nested');

// const customMedia = require('postcss-custom-media');
// const customProp = require('postcss-custom-properties');
// const customSelectors = require('postcss-custom-selectors');
// const mediaMinMax = require('postcss-media-minmax');
// const presetEnv = require('postcss-preset-env');

// const utilities = require('postcss-utilities');

const processorsCSS =[
  postcssImport,
  simpleVars,
  minify,
  mixins,
  nested
]

function styles() {
  return gulp.src(config.css.src)
    .pipe(postcss(processorsCSS))  
    .pipe(rename("style.css"))
    .pipe(gulp.dest(config.css.out));
}

function watch() {
  gulp.watch(config.css.src, styles);
}

const clean = () => del([ 'out' ]);
const build = gulp.series(clean, styles);

gulp.task('watch', watch);
gulp.task('build', build);
gulp.task('default', build);