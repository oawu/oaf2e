/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2016 OA Wu Design
 */

$(function () {

  window.vars.dashboard.$ = {
    allCount: $('#all_order_count > div').data ('count', 0),
    taipeiCount: $('#taipei_order_count > div').data ('count', 0),
    tainanCount: $('#tainan_order_count > div').data ('count', 0),
    taichungCount: $('#taichung_order_count > div').data ('count', 0),
    kaohsiungCount: $('#kaohsiung_order_count > div').data ('count', 0),
    alleypayCount: $('#alleypay_order_count > div').data ('count', 0),
    appOnlineCount: $('#app_online_count > div').data ('count', 0),

    appLines: $('#app_lines').find ('> div'),
    compareLines: $('#compare_lines'),
  };

  window.vars.dashboard.timers = [];

  window.vars.dashboard.$.compareLines.find ('a.today').text ('今日(' + ['日', '一', '二', '三', '四', '五', '六'][new Date ().getDay ()] + ')');
  window.vars.dashboard.$.compareLines.find ('a.last_week_day').text ('上週(' + ['日', '一', '二', '三', '四', '五', '六'][new Date ().getDay ()] + ')');
  window.vars.dashboard.$.compareLines.find ('.hours').append (Array.apply (null, Array (16)).map (function () { return $('<div />').append ($('<span />').addClass ('_l0').attr ('data-val', '')).append ($('<span />').addClass ('_l0').attr ('data-val', '')); })).next ().append (Array.apply (null, Array (16)).map (function () { return $('<div />'); }));
  window.vars.dashboard.$.appLines.append (Array.apply (null, Array (15)).map (function () {
    return $('<div />').attr ('class', '_l' + 0).append ($('<span />').text (''));
  }));

  window.vars.dashboard.$.compareLineDivs = window.vars.dashboard.$.compareLines.find ('.hours > div');

  window.func.dashboard.updateCount = function ($obj, count, isEffect) {
    if (typeof animation == 'undefined') animation = true;
    var now = parseInt ($obj.data ('count'), 10);

    if (now == count) return false;
    
    if (isEffect) {
      $obj.addClass ('show');
      window.vars.dashboard.timers.push (setTimeout (function () { $obj.removeClass ('show'); }, 1000));
    }

    $obj.data ('count', count).empty ().append (
      $('<span />').text (count));
    return true;
  };
  
  window.func.loads.dashboard = function () {
    
    if (window.vars.dashboard.isLoad) return false;
    window.vars.dashboard.isLoad = true;

    var data = {
      counts: {
        taipei: parseInt (Math.random () * 100, 10),
        tainan: parseInt (Math.random () * 100, 10),
        taichung: parseInt (Math.random () * 100, 10),
        kaohsiung: parseInt (Math.random () * 100, 10),
        alleypay: parseInt (Math.random () * 100, 10),
        online: parseInt (Math.random () * 1000, 10),
      },
      hours: {
        today: [
          parseInt (Math.random () * 100, 10), parseInt (Math.random () * 100, 10), parseInt (Math.random () * 100, 10), parseInt (Math.random () * 100, 10), parseInt (Math.random () * 100, 10), parseInt (Math.random () * 100, 10), parseInt (Math.random () * 100, 10), parseInt (Math.random () * 100, 10)
        ],
        last: [
          parseInt (Math.random () * 100, 10), parseInt (Math.random () * 100, 10), parseInt (Math.random () * 100, 10), parseInt (Math.random () * 100, 10), parseInt (Math.random () * 100, 10), parseInt (Math.random () * 100, 10), parseInt (Math.random () * 100, 10), parseInt (Math.random () * 100, 10), parseInt (Math.random () * 100, 10), parseInt (Math.random () * 100, 10), parseInt (Math.random () * 100, 10), parseInt (Math.random () * 100, 10), parseInt (Math.random () * 100, 10), parseInt (Math.random () * 100, 10), parseInt (Math.random () * 100, 10), parseInt (Math.random () * 100, 10)
        ],
      }
    };

    window.vars.dashboard.data = data;
    if (typeof window.vars.dashboard.onlines == 'undefined') window.vars.dashboard.onlines = [window.vars.dashboard.data.counts.online];
    else window.vars.dashboard.onlines.unshift (window.vars.dashboard.data.counts.online);
    window.vars.dashboard.onlines.splice (15);
    typeof window.func.inits.dashboard != 'undefined' && window.func.inits.dashboard ();

    window.vars.dashboard.isLoad = false;

  };
  window.func.releases.dashboard = function () {
    window.vars.dashboard.timers.forEach (function (t) { clearTimeout (t); });

    window.vars.dashboard.$.appLines.find ('> div').each (function (i) {
      $(this).attr ('class', '_l0') && $(this).find ('span').text ('');
    });

    window.vars.dashboard.$.compareLineDivs.each (function (i) {
      var $span = $(this).find ('span');
      $span.eq (0).attr ('class', '_l0').attr ('data-val', '');
      $span.eq (1).attr ('class', '_l0').attr ('data-val', '');
    });

    window.func.dashboard.updateCount (window.vars.dashboard.$.allCount, 0);
    window.func.dashboard.updateCount (window.vars.dashboard.$.taipeiCount, 0);
    window.func.dashboard.updateCount (window.vars.dashboard.$.tainanCount, 0);
    window.func.dashboard.updateCount (window.vars.dashboard.$.taichungCount, 0);
    window.func.dashboard.updateCount (window.vars.dashboard.$.kaohsiungCount, 0);
    window.func.dashboard.updateCount (window.vars.dashboard.$.alleypayCount, 0);
    window.func.dashboard.updateCount (window.vars.dashboard.$.appOnlineCount, 0);
  };

  window.func.inits.dashboard = function () {
    if (typeof window.vars.dashboard.data == 'undefined')
      return window.func.loads.dashboard (window.func.inits.dashboard);

    window.func.dashboard.updateCount (window.vars.dashboard.$.allCount, window.vars.dashboard.data.counts.taipei + window.vars.dashboard.data.counts.tainan + window.vars.dashboard.data.counts.taichung + window.vars.dashboard.data.counts.kaohsiung, true);
    window.func.dashboard.updateCount (window.vars.dashboard.$.taipeiCount, window.vars.dashboard.data.counts.taipei);
    window.func.dashboard.updateCount (window.vars.dashboard.$.tainanCount, window.vars.dashboard.data.counts.tainan);
    window.func.dashboard.updateCount (window.vars.dashboard.$.taichungCount, window.vars.dashboard.data.counts.taichung);
    window.func.dashboard.updateCount (window.vars.dashboard.$.kaohsiungCount, window.vars.dashboard.data.counts.kaohsiung);
    window.func.dashboard.updateCount (window.vars.dashboard.$.alleypayCount, window.vars.dashboard.data.counts.alleypay);
    window.func.dashboard.updateCount (window.vars.dashboard.$.appOnlineCount, window.vars.dashboard.data.counts.online);

    window.vars.dashboard.timers.push (setTimeout (function () {
      var max = window.vars.dashboard.onlines.max ();
      window.vars.dashboard.$.appLines.find ('> div').each (function (i) {
        typeof window.vars.dashboard.onlines[i] != "undefined" && $(this).attr ('class', '_l' + window.func.percentage (window.vars.dashboard.onlines[i], max)) && $(this).find ('span').text (window.vars.dashboard.onlines[i]);
      });
    }, 500));

    var max1 = window.vars.dashboard.data.hours.today.length ? window.vars.dashboard.data.hours.today.max () : 0;
    var max2 = window.vars.dashboard.data.hours.last.length ? window.vars.dashboard.data.hours.last.max () : 0;
    var max = max1 > max2 ? max1 : max2;
    
    window.vars.dashboard.timers.push (setTimeout (function () {
      window.vars.dashboard.$.compareLineDivs.each (function (i) {
        var $span = $(this).find ('span');
        typeof window.vars.dashboard.data.hours.last[i] != "undefined" && $span.eq (0).attr ('class', '_l' + window.func.percentage (window.vars.dashboard.data.hours.last[i], max)).attr ('data-val', window.vars.dashboard.data.hours.last[i]);
        typeof window.vars.dashboard.data.hours.today[i] != "undefined" && $span.eq (1).attr ('class', '_l' + window.func.percentage (window.vars.dashboard.data.hours.today[i], max)).attr ('data-val', window.vars.dashboard.data.hours.today[i]);
      });
    }, 500));
  };

});