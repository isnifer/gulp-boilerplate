var gulp = require('gulp');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');
var csscomb = require('gulp-csscomb');
var cssmin = require('gulp-csso');
var rename = require('gulp-rename');
var connect = require('gulp-connect');

var paths = {
    scripts: 'src/js/common.js',
    styles: ['src/stylus/*.styl', 'src/stylus/**/*.styl'],
    html: ['build/*.html']
};

gulp.task('uglify', function () {
    return gulp.src(paths.scripts)
        .pipe(uglify({mangle: true, compress: true}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./build/js'))
        .pipe(connect.reload());
});

gulp.task('stylus', function () {
    return gulp.src('./src/stylus/style.styl')
        .pipe(stylus())
        .pipe(csscomb())
        .pipe(gulp.dest('./build/css'))
        .pipe(cssmin())
        .pipe(rename({
            basename: 'style',
            suffix: '.min',
            ext: '.css'
        }))
        .pipe(gulp.dest('./build/css'))
        .pipe(connect.reload());
});

gulp.task('html', function () {
    return gulp.src(paths.html)
        .pipe(connect.reload());
});

gulp.task('connect', function() {
    connect.server({
        root: 'build',
        livereload: true
    });
});

gulp.task('watch', function() {
    gulp.watch(paths.html, ['html']);
    gulp.watch(paths.scripts, ['uglify']);
    gulp.watch(paths.styles, ['stylus']);
});

gulp.task('default', ['connect', 'watch', 'uglify', 'stylus']);
