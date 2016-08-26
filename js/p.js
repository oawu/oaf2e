/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2016 OA Wu Design
 */

$(function () {
  window.vars.popanel = {
    timers: [],
    isFinish: true
  };
  window.func.popanel.show = function (x, y, url, callback) {
    if (!window.vars.popanel.isFinish) return;
    window.vars.popanel.isFinish = false;

    window.vars.popanel.timers.forEach (function (t, i) { clearTimeout (t); });
    window.vars.popanel.timers = [];

    var $loading = $('<div />').addClass ('loading').append (Array.apply (null, Array (8)).map (function () { return $('<span />'); }));
    var $panel = $('<div />').addClass ('content').data ('x', x).data ('y', y).css ({ top: y, left: x });

    window.vars.$.popanel.empty ().append ($panel).append ($loading).addClass ('step1');

    window.vars.popanel.timers.push (setTimeout (function () {
      window.vars.$.popanel.addClass ('step2');

      window.vars.popanel.timers.push (setTimeout (function () {
        $panel.removeAttr ('style');
        window.vars.$.popanel.addClass ('step3');

        window.vars.popanel.timers.push (setTimeout (function () {
          window.vars.$.popanel.addClass ('step4');

          if (callback) {
            window.vars.popanel.timers.push (setTimeout (function () {
              $.ajax ({
                url: url,
                async: true, cache: false, dataType: 'json', type: 'GET',
              })
              .done (callback.bind ($panel))
              .fail (function (result) { window.func.ajaxError (result); })
              .complete (function (result) {
                window.vars.popanel.timers.push (setTimeout (function () {
                  window.vars.$.popanel.addClass ('step5');
                }, 100));
              });
            }, 300));
          }
        }, 350));
      }, 400));
    }, 500));
  };

  window.func.popanel.hide = function (callback) {
    if (window.vars.popanel.isFinish) return;

    var $tmp = window.vars.$.popanel.find ('.content').empty ();

    window.vars.popanel.timers.forEach (function (t, i) {
     clearTimeout (t); });

    window.vars.popanel.timers = [];

    window.vars.$.popanel.addClass ('step6');

    window.vars.popanel.timers.push (setTimeout (function () {
      $tmp.css ({ top: $tmp.data ('y'), left: $tmp.data ('x') });

      window.vars.popanel.timers.push (setTimeout (function () {
        window.vars.$.popanel.addClass ('step7');

        window.vars.popanel.timers.push (setTimeout (function () {
          window.vars.$.popanel.addClass ('step8');
          
          window.vars.popanel.timers.push (setTimeout (function () {
            window.vars.$.popanel.empty ().removeAttr ('class');
            window.vars.popanel.isFinish = true;
            window.vars.popanel.timers.forEach (function (t, i) { clearTimeout (t); });
            window.vars.popanel.timers = [];
          }, 300));
        }, 300));
      }, 400));
    }, 350));
  };

  $(document).keyup (function (e) {
    if (e.keyCode == 81) {
      window.func.popanel.show (0, 0, '/oaf2e/data/p.json', function (result) {

      });
    } else if (e.keyCode == 87) {
        window.func.popanel.hide (function () {

        });
    }
  });
});