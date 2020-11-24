var gulp         = require("gulp")
var sass         = require("gulp-sass")
var concat       = require("gulp-concat")
var autoprefixer = require("gulp-autoprefixer")
var browserSync  = require("browser-sync")
var bsInjector   = require("bs-snippet-injector")

var options = {
  browsersync: {
    open: false,
    // xip: false,
    // port: 3001,
    // socket: {
    //   port: 3003
    // },
    // ui: {
    //   port: 3002
    // },
    // server: {
    //   baseDir: "./"
    // }
  },
  sass: {
    includePaths: ["scss"]
  },
  cssnano: {
    reduceIdents: false,
    discardUnused: {
      fontFace: false
    },
    minifyFontValues: false
  },
  autoprefixer: {
    flexbos: "no-2009"
  }
}

var handleError = (err) => {
  console.log(err.toString())
  this.emit("end")
}

gulp.task("css", () => {
  return gulp
    .src([
      "assets/css/fonts.scss",
      "assets/css/reset.scss",
      "assets/css/main.scss"
    ])
    .pipe(sass(options.sass).on("error", sass.logError))
    .pipe(autoprefixer(options.autoprefixer).on("error", handleError))
    .pipe(concat("all.css").on("error", handleError))
    .pipe(gulp.dest("assets/built"))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task("watch", () => {
  browserSync.init(options.browsersync)

  gulp.watch("assets/css/**", gulp.parallel("css"))
})



// var gulp = require('gulp');
//
// // gulp plugins and utils
// var gutil = require('gulp-util');
// var livereload = require('gulp-livereload');
// var postcss = require('gulp-postcss');
// var sourcemaps = require('gulp-sourcemaps');
// var zip = require('gulp-zip');
//
// // postcss plugins
// var autoprefixer = require('autoprefixer');
// var colorFunction = require('postcss-color-function');
// var cssnano = require('cssnano');
// var customProperties = require('postcss-custom-properties');
// var easyimport = require('postcss-easy-import');
//
// var swallowError = function swallowError(error) {
//     gutil.log(error.toString());
//     gutil.beep();
//     this.emit('end');
// };
//
// var nodemonServerInit = function () {
//     livereload.listen(1234);
// };
//
// gulp.task('build', ['css'], function (/* cb */) {
//     return nodemonServerInit();
// });
//
// gulp.task('css', function () {
//     var processors = [
//         easyimport,
//         customProperties,
//         colorFunction(),
//         autoprefixer({browsers: ['last 2 versions']}),
//         cssnano()
//     ];
//
//     return gulp.src('assets/css/*.css')
//         .on('error', swallowError)
//         .pipe(sourcemaps.init())
//         .pipe(postcss(processors))
//         .pipe(sourcemaps.write('.'))
//         .pipe(gulp.dest('assets/built/'))
//         .pipe(livereload());
// });
//
// gulp.task('watch', function () {
//     gulp.watch('assets/css/**', ['css']);
// });
//
// gulp.task('zip', ['css'], function () {
//     var targetDir = 'dist/';
//     var themeName = require('./package.json').name;
//     var filename = themeName + '.zip';
//
//     return gulp.src([
//         '**',
//         '!node_modules', '!node_modules/**',
//         '!dist', '!dist/**'
//     ])
//         .pipe(zip(filename))
//         .pipe(gulp.dest(targetDir));
// });
//
// gulp.task('default', ['build'], function () {
//     gulp.start('watch');
// });
