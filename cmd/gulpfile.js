var gulp       = require ('gulp'),
    livereload = require ('gulp-livereload'),
    uglifyJS   = require ('gulp-uglify'),
    htmlmin    = require ('gulp-html-minifier'),
    del        = require ('del'),
    chokidar   = require ('chokidar'),
    read       = require ('read-file'),
    writeFile  = require ('write'),
    gutil      = require ('gulp-util'),
    shell      = require ('gulp-shell'),
    colors     = gutil.colors;

gulp.task ('default', function () {

  livereload.listen ({
    silent: true
  });

  var watcherScss = chokidar.watch ('./root/scss/**/*.scss', {
    ignored: /(^|[\/\\])\../,
    persistent: true
  });

  watcherScss.on ('change', function (path) {
    gulp.start ('compass_compile');
    console.log ('\n ' + colors.red ('•') + colors.yellow (' [scss] ') + '完成編譯 scss，檔案：' + colors.gray (path.replace (/\\/g,'/').replace (/.*\//, '')) + '');
  });

  var watcherReload = chokidar.watch (['./root/*.html', './root/css/**/*.css', './root/js/**/*.js'], {
    ignored: /(^|[\/\\])\../,
    persistent: true
  });

  watcherReload.on ('change', function (path) {
    console.log ('\n ' + colors.red ('•') + colors.yellow (' [重整] ') + '有檔案更新，檔案：' + colors.gray (path.replace (/\\/g,'/').replace (/.*\//, '')) + '');
    gulp.start ('reload');
    console.log ('    ' + colors.green ('reload') + ' 重新整理頁面成功！');
  }).on ('add', function (path) {
    console.log ('\n ' + colors.red ('•') + colors.yellow (' [重整] ') + '有新增檔案，檔案：' + colors.gray (path.replace (/\\/g,'/').replace (/.*\//, '')) + '');
    gulp.start ('reload');
    console.log ('    ' + colors.green ('reload') + ' 重新整理頁面成功！');
  }).on ('unlink', function (path) {
    console.log ('\n ' + colors.red ('•') + colors.yellow (' [重整] ') + '有檔案刪除，檔案：' + colors.gray (path.replace (/\\/g,'/').replace (/.*\//, '')) + '');
    gulp.start ('reload');
    console.log ('    ' + colors.green ('reload') + ' 重新整理頁面成功！');
  });

  var watcherStyle = chokidar.watch ('./root/font/icomoon/style.css', {
    ignored: /(^|[\/\\])\../,
    persistent: true
  });

  watcherStyle.on ('add', function (path) { gulp.start ('update_icomoon_font_icon'); })
              .on ('change', function (path) { gulp.start ('update_icomoon_font_icon'); });
  // watcherStyle.on ('unlink', function (path) { gulp.start ('update_icomoon_font_icon'); });
});

// // ===================================================

gulp.task ('update_icomoon_font_icon', function () {
  read ('./root/font/icomoon/style.css', 'utf8', function (err, buffer) {
    var t = buffer.match (/\.icon-[a-zA-Z_-]*:before\s?\{\s*content:\s*"[\\A-Za-z0-9]*";\s*}/g);
      if (!(t && t.length)) return;

      writeFile ('./root/scss/icon.scss', '@import "_oa";\n\n@include font-face("icomoon", font-files("icomoon/fonts/icomoon.eot", "icomoon/fonts/icomoon.woff", "icomoon/fonts/icomoon.ttf", "icomoon/fonts/icomoon.svg"));\n[class^="icon-"], [class*=" icon-"] {\n  font-family: "icomoon", Roboto,RobotoDraft,Helvetica,Arial,sans-serif,"微軟正黑體", "Microsoft JhengHei"; speak: none; font-style: normal; font-weight: normal; font-variant: normal; text-transform: none; line-height: 1;\n  @include font-smoothing(antialiased);\n}\n\n' + t.join ('\n'), function(err) {
        console.log ('\n ' + colors.red ('•') + colors.yellow (' [icon] ') + '更新 icon 惹，目前有 ' + colors.magenta (t.length) + ' 個！');
        if (err) console.log(err);
      });
  });
});

// // ===================================================

gulp.task ('compass_compile', shell.task ('compass compile'));

// // ===================================================

gulp.task ('reload', function () {
  livereload.changed ();
});

// // ===================================================

gulp.task ('minify', function () {
  gulp.start ('js-uglify');
  gulp.start ('minify-html');
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

// // ===================================================

gulp.task ('gh-pages', function () {
  del (['./root']);
});