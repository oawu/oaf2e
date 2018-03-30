/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2015 - 2018, OAF2E
 * @license     http://opensource.org/licenses/MIT  MIT License
 * @link        https://www.ioa.tw/
 */
 
$(function () {
  $.get ('api_project.json').done (function (r) {
    var selector = 'loading';
    $('#' + selector).html (_.template ($('#_' + selector).text ()) (r));
  });

  $('.format').each (function () {
    var $that = $(this).attr ('data-i', 1);
    $that.find ('.tabs > *').click (function () {
      $that.attr ('data-i', $(this).index () + 1);
    });
  });

});