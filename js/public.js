/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2016 OA Wu Design
 */

$(function () {
  var i = 1;
  var $scroll = $('#scroll');
  var $div = $scroll.find ('> div');
  var $unit = $div.find ('> *');
  var w = $scroll.width ();
  var uw = $unit.width () + parseFloat ($unit.css ('border-left-width')) + parseFloat ($unit.css ('border-right-width')) + parseFloat ($unit.css ('margin-right')) + parseFloat ($unit.css ('margin-right'));

  $div.css ({'left': -(uw * i + uw / 2 - w / 2)}).draggable ({
    axis: 'x',
    start: function () {
      $(this).removeClass ('t');
    },
    stop: function () {
      $(this).addClass ('t');
      if (Math.abs (($(this).offset().left + uw * i + uw / 2 - w / 2) % w) > w / 3)
        if (parseInt (($(this).offset().left + uw * i + uw / 2 - w / 2), 10) < 0)
          i++;
        else
          i--;
      if (i + 1 > $unit.length)
        i = $unit.length - 1;

      var l = -(uw * i + uw / 2 - w / 2);
      if (i + 1 == $unit.length)
        $(this).css ({'left': l - (uw / 2 - w / 2) + 'px' });
      else
        $(this).css ({'left': l > 0 ? 0 : l + 'px' });
    }
  });
});