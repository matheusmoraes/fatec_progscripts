var gulp = require('gulp');

gulp.task('default', function() {

  gulp.src('./bower_components/**/*.js')
  .pipe(gulp.dest('./static'));
});
