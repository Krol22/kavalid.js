const gulp = require('gulp');
const babel = require('gulp-babel');
const minify = require('gulp-minify');
const watch = require('gulp-watch');
const jasmine = require('gulp-jasmine');

gulp.task('build', function() {
    gulp.src('lib/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(minify())
        .pipe(gulp.dest('dist'))
});

gulp.task('jasmine', function() {
    return watch('src/**/*.js', function() {
        gulp.src('src/**/*.spec.js')
        .pipe(jasmine());
    });
});


