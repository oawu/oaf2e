/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2016 OA Wu Design
 */

(function( factory ) {
  if ((typeof define === 'function') && define.amd) define (['jquery'], factory);
  else factory (jQuery);
}(function ($) {

  $.fn.extend ({
    OADatePicker: function (opt) {
      
      var d4Opt = {
        chineseWeekNum: ['日', '一', '二', '三', '四', '五', '六'],
        chineseMonthNum: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        choiceEvent: function () {}
      }, monthDayCount = function (y, m) {
        return (m == 1) ? ((y % 4) === 0) && ((y % 100) !== 0) || ((y % 400) === 0) ? 29 : 28 : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m];
      }, zeroPad = function (nr,base) {
        var  len = (String(base).length - String(nr).length) + 1;
        return len > 0? new Array(len).join ('0') + nr : nr;
      }, prevMonth = function (y, m) {
        m = isNaN (y) ? y.m : m;
        y = isNaN (y) ? y.y : y;
        return { y: m == 1 ? y - 1 : y, m: m == 1 ? 12 : m - 1 };
      }, nextMonth = function (y, m) {
        m = isNaN (y) ? y.m : m;
        y = isNaN (y) ? y.y : y;
        return { y: m == 12 ? y + 1 : y, m: m == 12 ? 1 : m + 1 };
      }, createMonth = function (y, m) {
        var f = new Date(y, --m, 1).getDay ();
        var mc = monthDayCount (y, m);
        var wc = parseInt ((f + mc) / 7, 10) + (((f + mc) % 7) ? 1 : 0);

        var prev = prevMonth (y, m + 1);
        var next = nextMonth (y, m + 1);
        var pm = monthDayCount (prev.y, prev.m - 1);
        var nm = monthDayCount (next.y, next.m - 1);

        return $('<div />').addClass ('m').data ('y', y).data ('m', ++m).append ($('<div />').addClass ('w').append (opt.chineseWeekNum.slice (0, 7).map (function (t) {
          return $('<div />').text (t);
        }))).append ($('<div />').addClass ('d').append (Array.apply (null, Array (wc)).map (function (_, i) {
          return $('<div />').addClass ('w').append (Array.apply (null, Array (7)).map (function (_, j) {
            var d = i * 7 + j, nd = (d < f) || (d - f >= mc) ? (d < f) ? pm - (f - d - 1) : (d - f + 1) % mc : d - f + 1;
            return $('<a />').addClass ((d < f) || d - f >= mc ? 'n' : null).text (nd).click (opt.choiceEvent.bind ($(this), {
              y: (d < f) || (d - f >= mc) ? (d < f) ? prev.y : next.y : y, m: zeroPad ((d < f) || (d - f >= mc) ? (d < f) ? prev.m : next.m : m, 10), d: zeroPad (nd, 10)
            }));
          }));
        })));
      }, setCHeight = function ($m) {
        $m.parent ().css ({'height': $m.height () + parseInt ($m.css ('padding-top'), 10) + parseInt ($m.css ('padding-bottom'), 10)})
          .prev ().find ('> a').eq (1).text ($m.data ('y') + ' · ' + opt.chineseMonthNum[$m.data ('m') - 1]);
      }, initMonth = function (t, $c) {
        $c.append (createMonth ((m = prevMonth (t.getFullYear (), t.getMonth () + 1)).y, m.m));
        $c.append (createMonth ((m = nextMonth (m)).y, m.m));
        $c.append (createMonth ((m = nextMonth (m)).y, m.m));

        setCHeight ($c.find ('> .m').eq (1));
      };

      opt = $.extend (true, d4Opt, opt);

      return $(this).each (function () {
        var $l = $('<a />').text ('❮');
        var $r = $('<a />').text ('❯');
        var $t = $('<a />').text ('');
        var $c = $('<div />').addClass ('c');

        $(this).append ($('<div />').addClass ('t').append ($l).append ($t).append ($r));
        $(this).append ($c);

        initMonth (new Date (), $c);

        $r.click (function () {
          var $m = $c.find ('> .m').eq (1);
          var next = nextMonth (nextMonth ($m.data ('y'), $m.data ('m')));
          $c.append (createMonth (next.y, next.m)).find ('> .m').first ().remove ();
          setCHeight ($m.next ());
        }.bind ($(this)));

        $l.click (function () {
          var $m = $c.find ('> .m').eq (1);
          var prev = prevMonth (prevMonth ($m.data ('y'), $m.data ('m')));
          $c.prepend (createMonth (prev.y, prev.m)).find ('> .m').last ().remove ();
          setCHeight ($m.prev ());
        }.bind ($(this)));
      });
    }
  });
}));


$(function () {
  $('#datepick').OADatePicker ({
    choiceEvent: function (e) {
      $('input').val (e.y + '-' + e.m + '-' + e.d);
    }
  });
});