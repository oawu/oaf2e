/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2017 OA Wu Design
 * @license     http://creativecommons.org/licenses/by-nc/2.0/tw/
 */

$(function () {
  $("input[name='style']").change (function () {
    if ($(this).val () == '1') {
      $('#list').removeClass ('block');
    } else {
      $('#list').addClass ('block');
    }
    
  })
});