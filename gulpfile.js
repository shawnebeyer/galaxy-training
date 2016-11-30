var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload;

gulp.task('default', ['browser-sync','styles', 'jshint', 'watch']);

gulp.task('styles', function() {
	return gulp.src('sass/*.scss')
		.pipe(plumber({
			errorHandler: notify.onError("Error: <%= error.message %>")
			}))
		.pipe(sass({
			'sourcemap=none': true,
			errLogToConsole: true
		}))
		.pipe(concat('style.css'))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
		.pipe(gulp.dest('sass/css'))
		.pipe(browserSync.stream())
		.pipe(notify("Regenerated CSS! ( <%= file.relative %> )"));
});

gulp.task('browser-sync', function() {
  browserSync({
    server: { baseDir: "./" }
  });
});

gulp.task('jshint', function() {
  return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(reload({stream: true}));
});

gulp.task('watch', function() {
  gulp.watch('js/*.js', ['jshint']);
  gulp.watch('sass/*.scss', ['styles']);
  gulp.watch('*.html', reload);
});