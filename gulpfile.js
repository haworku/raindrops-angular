const gulp = require('gulp');
const run = require('gulp-run');
const concat = require('gulp-concat');
const livereload = require('gulp-livereload');
const less = require('gulp-less');
const path = require('path');

const watch = {
  less: ['./app/**/*.less'],
  js: ['./app/**/*.js'],
};

gulp.task('js', () =>
  gulp.src([
    '/bower_components/jquery/dist/jquery.min.js',
    '/bower_components/angular/angular.min.js',
    '/bower_components/angular-route/angular-route.min.js',
    '/bower_components/angular-sanitize/angular-sanitize.min.js',
    '/bower_components/moment/min/moment.min.js',
    '/bower_components/angular-moment/angular-moment.min.js',
    './app/app.js',
    './app/app.config.js',
    './app/app.run.js',
    './app/**/*.js'
  ])
    .pipe(concat('script.js'))
    .pipe(gulp.dest('dist/'))
    .pipe(livereload())
);

gulp.task('less', () =>
  gulp.src(watch.less)
      .pipe(less({
        paths: [path.join(__dirname, 'less', 'includes')],
      }))
      .pipe(concat('style.css'))
      .pipe(gulp.dest('dist/'))
      .pipe(livereload())
);

gulp.task('dev', () => {
  livereload.listen();
  run('node app.js').exec();
  gulp.watch(watch.less, ['less']);
  gulp.watch(watch.js, ['js']);
});
