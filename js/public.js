/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2016 OA Wu Design
 */

$(function () {
  $('#menu_button, #cover').click (function () {
    $('body').toggleClass ('menu_show');
  });
  $('.tab').each (function () {
    var $that = $(this);

    $that.find ('.titles > a').click (function () {
      $(this).addClass ('show').siblings ().removeClass ('show');
      $that.find ('.panels > div').eq ($(this).index ()).addClass ('show').siblings ().removeClass ('show');
    }).first ().click ();
  });

  $('.todo').each (function () {
    var $that = $(this);
    $that.find ('button').click (function () {
      var $input = $that.find ('input');
      if (!$input.val ().length) return;

      $('<span />').text ($input.val ()).appendTo ($that.find ('.list'));
      $input.val ('');
    });

  });

});