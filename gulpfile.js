const gulp = require('gulp');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const config = require('./config.json');
const del = require('del');
const postcssImport = require('postcss-import');
const simpleVars = require('postcss-simple-vars');
const minify = require('cssnano');
const customProps = require('postcss-custom-properties');

// const mixins = require('postcss-mixins');
// const nested = require('postcss-nested');
// const customMedia = require('postcss-custom-media');
// const metalsmith = require('gulp-metalsmith');
// const restart = require('gulp-restart');
// const customMedia = require('postcss-custom-media');
// const customSelectors = require('postcss-custom-selectors');
// const mediaMinMax = require('postcss-media-minmax');
// const presetEnv = require('postcss-preset-env');
// const utilities = require('postcss-utilities');

const processorsCSS =[
  postcssImport,
  customProps,
  simpleVars,
  minify
]

function styles() {
  return gulp.src(config.css.src)
    .pipe(postcss(processorsCSS))  
    .pipe(rename("styles.min.css"))
    .pipe(gulp.dest(config.css.out));
}

// gulp.task('metalsmith', function() {
//   return gulp.src('src/**')
//     .pipe(metalsmith())
//     .pipe(gulp.dest('build'));
// });

function watch() {
  gulp.watch(config.css.src, styles);
}

const clean = () => del(config.destination);
const build = gulp.series(clean, styles);

gulp.task('watch', watch);
gulp.task('build', build);
gulp.task('default', build);
 
