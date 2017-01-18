var gulp = require('gulp');
// gulp.fs = require("fs");
gulp.autoprefixer = require('gulp-autoprefixer');
var stripCssComments = require('gulp-strip-css-comments');
gulp.cssnano = require('gulp-cssnano');
gulp.connect = require('gulp-connect-multi')();
gulp.jade = require('gulp-jade');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var errorNotifier = require('gulp-error-notifier');
var gcmq = require('gulp-group-css-media-queries');
// var uglify = require('gulp-uglify');

var imagemin = require('gulp-imagemin');


// var path = require('path');
// var svgmin = require('gulp-svgmin');
// var svgstore = require('gulp-svgstore');
// var rename = require('gulp-rename');

// gulp.task('svgstore', function () {
//     return gulp
//         .src('dev/svg/*.svg')
//         .pipe(svgmin(function (file) {
//             var prefix = path.basename(file.relative, path.extname(file.relative));
//             return {
//                 plugins: [{
//                     cleanupIDs: {
//                         prefix: prefix + '-',
//                         minify: true
//                     }
//                 }]
//             }
//         }))
//         .pipe(svgstore())
//         .pipe(gulp.dest('dev/svg-ready'));
// });



/* watch document change */
gulp.paths = {
    scripts: 'dev/**/*.js',
    jade: 'dev/**/*.jade',
    style: ['dev/jade/**/*.less', 'dev/styles/**/*.less'],
    html: 'dev/assets/index.html',
    js: 'dev/js/main.js',
    ccs: 'dev/assets/css/*.css'
};

gulp.task('server', gulp.connect.server({
  root: ['dev/assets'],
  port: 9000,
  open: {
    file: 'index.html'
    // browser: 'chrome'
  },  
  livereload: true
}));

gulp.task('concat', function () {
    return gulp.src('dev/styles/style.less')
        .pipe(errorNotifier())
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(gulp.autoprefixer({browsers: ['last 10 versions','ie >= 9']}))      
        // .pipe(stripCssComments())
        // .pipe(gcmq())
        // .pipe(gulp.cssnano())
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('dev/assets/css'))
        .pipe(gulp.connect.reload());
});

gulp.task('jade', function() {
    gulp.src('dev/*.jade')
        .pipe(errorNotifier())
        .pipe(gulp.jade({
            pretty: true
        }))
        .pipe(gulp.dest('dev/assets'))
        .pipe(gulp.connect.reload());
});

gulp.task('css', function () {
  gulp.src('dev/assets/css/*.css')
    .pipe(gulp.connect.reload());
});

// gulp.task('html', function () {
//   gulp.src(gulp.paths.html)
//     .pipe(gulp.connect.reload());
// });

gulp.task('img', function () {
  gulp.src('dev/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dev/assets/images'))
});

gulp.task('js', function () {
  gulp.src('dev/js/main.js')
    // .pipe(uglify())
    .pipe(gulp.dest('dev/assets/js'))
    .pipe(gulp.connect.reload());
});

gulp.task('watch', function(){
    gulp.watch(gulp.paths.style, ['concat']);
    gulp.watch(gulp.paths.jade, ['jade']);
    gulp.watch(gulp.paths.css, ['css']);
    // gulp.watch(gulp.paths.html, ['html']);
    gulp.watch(gulp.paths.js, ['js']);
});

gulp.task('default', ['concat', 'jade','js', 'server', 'watch']);