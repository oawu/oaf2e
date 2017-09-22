/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2017 OA Wu Design
 * @license     http://creativecommons.org/licenses/by-nc/2.0/tw/
 */

$(function () {
  // function _ (a, x) { return new Function (a,'return ' + x); }

  var w = 38;
  var h = 8;
  var lD = false;
  var rD = false;

  var $lametricTime = $('#lametric-time');
  var u = $lametricTime.append (new Array (w * h).fill (0).map (function (t) {
    return $('<div />').attr ('class', 'c' + t).click (function () {
      // 
$(this).attr ('class', 'c-1');
    }).contextmenu (function () {
      // $(this).attr ('class', 'c0');
      return false;
    }).mouseenter (function () {
      // if (lD) $(this).attr ('class', 'c-1');
      // if (rD) $(this).attr ('class', 'c0');
    });

  })).find ('>*');
  $(document).mousedown (function() {
    if (event.which == 1)
      lD = true;
    if (event.which == 3)
      rD = true;
  }).mouseup (function() {
      lD = false;
      rD = false;
  });
  

  var arr2d = [
    [1,1,1,1,1,1,1,1,1,1,1,1,],
    [0, 1,1,1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1,1,1,1,],
    [1,1,1,1,1,1,1,1,1,1,1,1,],
  ];

  function to1d (arr) {
    return arr.map (function (t) {
      return $.extend (new Array (w).fill (0), t).slice (0, w);
    }).reduce (function (p, n) {
      return p.concat (n);
    });
  }
  function render (arr2d) {
    if (!arr2d.length) return;
    return (Array.isArray (arr2d[0]) ? to1d (arr2d) : $.extend (new Array (w).fill (0), arr2d)).forEach (function (t, i) {
      u.eq (i).attr ('class', 'c' + t);
    });
  }
  function delay (a) {
    var t = null;

    if (Array.isArray (a) && a.length) {
      t = a.shift ();
      t = t ();
      t = isNaN (t) ? 1 : t;
      setTimeout (delay.bind (this, a), t * 100);
    } else if (typeof a === 'function') {
      t = a ();
      t = isNaN (t) ? 1 : t;
      var params = Array.prototype.slice.call (arguments); params.shift ();
      setTimeout (delay.bind (this, params), t * 100);
    }
    if (typeof a != 'function') return ;
  }
  render ([
    [2,2,2,2,2,2,4,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [2,2,2,2,2,4,3,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [2,2,0,0,0,3,1,1,1,0,0,0,0,0,5,0,0,5,5,5,0,5,5,5,0],
    [2,0,2,0,0,0,0,1,1,0,0,0,0,5,5,0,0,0,0,5,0,0,0,5,0],
    [4,0,4,0,0,0,0,1,1,0,0,0,0,0,5,0,0,5,5,5,0,5,5,5,0],
    [2,4,3,0,0,0,0,1,1,0,0,0,0,0,5,0,0,5,0,0,0,0,0,5,0],
    [4,3,1,0,1,1,0,1,1,0,0,0,0,5,5,5,0,5,5,5,0,5,5,5,0],
    [3,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ]);
  // delay (function () {
  //   render ([1]);
  // }, function () {
  //   render ([,1]);
  // }, function () {
  //   render ([,,1]);
  // }, function () {
  //   render ([,,,1]);
  // });
  

});