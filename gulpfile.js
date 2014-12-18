var gulp = require('gulp');
var pipe = require('multipipe');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var rimraf = require('rimraf');



var paths = {
	js: ['./src/**/*.js'],
	dist: {
		js: './dist/'
	}
};



/**
 * removes css- and js-dist folder.
 */
gulp.task('clean', function() {
	rimraf.sync(paths.dist.js);
})

gulp.task('js', function() {
	gulp.src(paths.js)
		.pipe(concat('isoCurrency.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(paths.dist.js));

	gulp.src(paths.js)
		.pipe(concat('isoCurrency.js'))
		.pipe(gulp.dest(paths.dist.js));
});

gulp.task('watch', function() {
	gulp.watch(paths.js, ['js', 'dist']);
	console.log('watching directory:' + paths.js.join(', '));	
});


/**
 * optimizes the output in terms of minification and concatenation.
 */
gulp.task('dist', function() {

	// add some optimizations (?)
	
});



gulp.task('build', ['clean', 'js', 'dist']);
gulp.task('default', ['build']);