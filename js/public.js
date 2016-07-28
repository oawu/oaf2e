/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2016 OA Wu Design
 */

$(function () {

  $('label.checkbox input').change (function () {
    $(this).prop ('disabled', true).parent ().addClass ('loading');
    setTimeout (function () {
      $(this).prop ('disabled', false).parent ().removeClass ('loading');
      $(this).prop ('checked', $(this).prop ('checked'));
    }.bind ($(this)), 1000);
  });
  $('label.switch input').change (function () {
    $(this).prop ('disabled', true).parent ().addClass ('loading');

    setTimeout (function () {
      $(this).prop ('disabled', false).parent ().removeClass ('loading');
      $(this).prop ('checked', $(this).prop ('checked'));
    }.bind ($(this)), 1000);
  });
  $('div.radios input').change (function () {
    $(this).prop ('disabled', true).parents ('.radios').addClass ('loading');

    setTimeout (function () {
      $(this).prop ('disabled', false).parents ('.radios').removeClass ('loading');
    }.bind ($(this)), 1000);
  });

});