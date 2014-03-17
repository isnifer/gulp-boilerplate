var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    csscomb = require('gulp-csscomb'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload');

var paths = {
    scripts: './src/js/common.js',
    styles: './src/stylus/**.styl'
};

gulp.task('jshint', function () {
    return gulp.src(paths.scripts)
        .pipe(jshint());
});

gulp.task('uglify', function () {
    return gulp.src('./src/js/common.js')
        .pipe(uglify({mangle: true, compress: true}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./assets/js'))
        .pipe(livereload());
});

gulp.task('stylus', function () {
    return gulp.src('./src/stylus/style.styl')
        .pipe(stylus({use: ['nib']}))
        .pipe(gulp.dest('./assets/css'));
});

gulp.task('csscomb', function () {
    return gulp.src('./assets/css/style.css')
        .pipe(csscomb())
        .pipe(rename({suffix: '.sorted'}))
        .pipe(gulp.dest('./assets/css'));
});

gulp.task('cssmin', function () {
    return gulp.src(['./assets/css/fonts.css', './assets/css/normalize.css', './assets/css/style.sorted.css'])
        .pipe(cssmin())
        .pipe(rename({basename: 'style', suffix: '.min', ext: '.css'}))
        .pipe(gulp.dest('./assets/css'))
        .pipe(livereload());
});

gulp.task('watch', function() {
    var server = livereload();
    gulp.watch('./*.html').on('change', function (file) {
        server.changed(file.path);
    });
    gulp.watch(paths.scripts, ['jshint', 'uglify']);
    gulp.watch(paths.styles, ['stylus', 'csscomb', 'cssmin']);
});

gulp.task('default', ['watch']);