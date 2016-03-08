/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2016 OA Wu Design
 */

$(function () {
  var $box = $('.box');

  for (var i = 0; i < 20 * 20; i++)
    $('<div />', {
      class: 'dot'
    }).appendTo ($box);
});