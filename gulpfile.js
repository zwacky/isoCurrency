var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var merge = require('merge-stream');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var history = require('connect-history-api-fallback');

var paths = {
	js: ['./src/components/**/*.js', '!./src/components/**/*.spec.js'],
	dist: {
		js: './dist',
	},
};

/**
 * removes css- and js-dist folder.
 */
gulp.task('clean', function() {
	return del(['./dist']);
});

gulp.task('lint', function() {
	return gulp.src(paths.js)
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter('jshint-stylish'))
		.pipe(plugins.jshint.reporter('fail'));
});

gulp.task('js-build', function() {
	return gulp.src(paths.js)
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.babel({
			presets: ['@babel/preset-env']
		}))
		.pipe(plugins.ngAnnotate())
		.pipe(plugins.concat('isoCurrency.js'))
		.pipe(gulp.dest('dist/'))
		.pipe(plugins.uglify())
		.pipe(plugins.concat('isoCurrency.min.js'))
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(gulp.dest('dist/'))
});

gulp.task('js', gulp.series('lint', 'js-build'));

gulp.task('build', gulp.series('clean', 'js'));

gulp.task('watch', gulp.series('build', function() {
	gulp.watch(paths.js, ['watch-js']);

	browserSync.init({
		server: {
			baseDir: '',
			middleware: [ history() ]
		},
		startPath: '/demo/'
	});
}));

gulp.task('_browser-reload', function(cb) {
	browserSync.reload();
	cb();
});

gulp.task('watch-js', function(cb) {
	return gulp.watch(['src/**/**.js', ['js']]);
});

gulp.task('default', gulp.series('build'));


//
// var gulp = require('gulp');
// var pipe = require('multipipe');
// var less = require('gulp-less');
// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
// var minify = require('gulp-minify-css');
// var rimraf = require('rimraf');
// var ngAnnotate = require('gulp-ng-annotate');
//
//
//
// var paths = {
// 	js: ['./src/**/!(*.spec).js'],
// 	dist: {
// 		js: './dist/'
// 	}
// };
//
//
//
// /**
//  * removes css- and js-dist folder.
//  */
// gulp.task('clean', function() {
// 	rimraf.sync(paths.dist.js);
// })
//
// gulp.task('js', function() {
// 	gulp.src(paths.js)
// 		.pipe(concat('isoCurrency.min.js'))
// 		.pipe(ngAnnotate())
// 		.pipe(uglify())
// 		.pipe(gulp.dest(paths.dist.js));
//
// 	gulp.src(paths.js)
// 		.pipe(ngAnnotate())
// 		.pipe(concat('isoCurrency.js'))
// 		.pipe(gulp.dest(paths.dist.js));
// });
//
// gulp.task('watch', function() {
// 	gulp.watch(paths.js, ['js', 'dist']);
// 	console.log('watching directory:' + paths.js.join(', '));
// });
//
//
// /**
//  * optimizes the output in terms of minification and concatenation.
//  */
// gulp.task('dist', function() {
//
// 	// add some optimizations (?)
//
// });
//
//
//
// gulp.task('build', ['clean', 'js', 'dist']);
// gulp.task('default', ['build']);
