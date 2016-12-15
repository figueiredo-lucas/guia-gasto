var gulp = require('gulp');
var server = require('gulp-express');
var sass = require('gulp-sass');
var wiredep = require('wiredep').stream;

gulp.task('default', ['sass', 'wiredep', 'server']);

gulp.task('wiredep', function() {
    gulp.src('./app/index.html')
        .pipe(wiredep())
        .pipe(gulp.dest('./app'));
});

gulp.task('sass', function() {
    gulp.src('./app/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/style'));
})

gulp.task('server', function() {
    server.run(['server/app.js']);
    // gulp.watch(['client/**/*.html'], server.notify);
    // gulp.watch(['server/app.js'], [server.run]);
    gulp.watch(['./app/scss/**/*.scss'], ['sass']);
});