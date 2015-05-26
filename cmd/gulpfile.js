var gulp       = require ('gulp'),
    livereload = require('gulp-livereload'),
    uglifyJS   = require ('gulp-uglify'),
    htmlmin    = require('gulp-html-minifier'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    del        = require('del');

// ===================================================

gulp.task ('default', function () {

  livereload.listen ();

  ['./root/*.html', './root/css/**/*.css', './root/js/**/*.js'].forEach (function (t) {
    gulp.watch (t).on ('change', function () {
      gulp.run ('reload');
    });
  });
});
gulp.task ('reload', function () {
  livereload.changed ();
  console.info ('\n== ReLoad Browser! ================================================\n');
});

// ===================================================

gulp.task ('minify', function () {
  console.info ('\n== Start minify.. =================================================\n');

  console.info ('\n== Run js-uglify.. ================================================\n');
  gulp.run ('js-uglify');

  console.info ('\n== Run minify-html.. ==============================================\n');
  gulp.run ('minify-html');

  console.info ('\n== Run image-min.. ================================================\n');
  gulp.run ('image-min');

  console.info ('\n== Finish minify! =================================================\n');
});
gulp.task ('gh-pages', function () {
  console.info ('\n== Start gh-pages.. ===============================================\n');
  del (['./root']);
  console.info ('\n== Finish gh-pages! ===============================================\n');
});
gulp.task ('js-uglify', function () {
  gulp.src ('./root/js/**/*.js')
      .pipe (uglifyJS ())
      .pipe (gulp.dest ('./root/js/'));
});
gulp.task ('minify-html', function () {
  gulp.src ('./root/*.html')
      .pipe (htmlmin ({collapseWhitespace: true}))
      .pipe (gulp.dest ('./root/'));
});
gulp.task ('image-min', function () {
  gulp.src ('./root/img/**/*.+(png|jpg|gif)')
      .pipe (imagemin ({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant ()]
      }))
      .pipe(gulp.dest ('./root/img/'));
});