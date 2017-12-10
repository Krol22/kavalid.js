const gulp = require('gulp');
const babel = require('gulp-babel');
const minify = require('gulp-minify');

gulp.task('build', function() {
    gulp.src('lib/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(minify())
        .pipe(gulp.dest('dist'))
});