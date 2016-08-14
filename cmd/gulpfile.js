var gulp       = require ('gulp'),
    livereload = require('gulp-livereload'),
    uglifyJS   = require ('gulp-uglify'),
    htmlmin    = require('gulp-html-minifier'),
    del        = require('del'),
    shell      = require('gulp-shell');

// ===================================================
gulp.task ('xcode', shell.task ('osascript ../autoclick.applescript'));

gulp.task ('updatexcode', function () {
  var timer = false;
  gulp.watch ('./root/app/pokemonLocation.gpx').on ('change', function () {
    if (timer) return;
    timer = true;
    gulp.run ('xcode');
    
console.log ('Update!');
    timer = false;
  });
  

});
gulp.task ('default', function () {
  var timer = false;
  gulp.watch ('./root/app/pokemonLocation.gpx').on ('change', function () {
    if (timer) return;
    timer = true;
    gulp.run ('xcode');
    timer = false;
  });

  // setInterval (function () {
  //   if (timer) return;
  //   timer = true;
  //   gulp.run ('xcode');
  //   timer = false;
  // }, 3000);

  // livereload.listen ();

  // ['./root/*.html', './root/*.php', './root/css/**/*.css', './root/js/**/*.js'].forEach (function (t) {
  //   gulp.watch (t).on ('change', function () {
  //     gulp.run ('reload');
  //   });
  // });
});
gulp.task ('x', function () {
  livereload.listen ();

  ['./root/*.html', './root/*.php', './root/css/**/*.css', './root/js/**/*.js'].forEach (function (t) {
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
  gulp.run ('js-uglify');
  gulp.run ('minify-html');
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

// ===================================================

gulp.task ('gh-pages', function () {
  del (['./root']);
});