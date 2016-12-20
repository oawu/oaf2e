/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2016 OA Wu Design
 */

$(function () {
  var token = 'aaaa';

  // $.get ('https://dev.admin.zeusdesign.com.tw/api/test?token=' + token, function (r) {
  // });
  $.get ('http://127.0.0.1/base/t_' + token + '_profile.json', function (r) {
    console.error (r);
  });
});