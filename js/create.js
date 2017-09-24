/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2017 OA Wu Design
 * @license     http://creativecommons.org/licenses/by-nc/2.0/tw/
 */
!function(){"use strict";function e(e){return r(n(e),arguments)}function t(t,r){return e.apply(null,[t].concat(r||[]))}function r(t,r){var n,s,o,a,p,c,l,f,u,d=1,g=t.length,y="";for(s=0;s<g;s++)if("string"==typeof t[s])y+=t[s];else if("object"==typeof t[s]){if((a=t[s]).keys)for(n=r[d],o=0;o<a.keys.length;o++){if(!n.hasOwnProperty(a.keys[o]))throw new Error(e('[sprintf] property "%s" does not exist',a.keys[o]));n=n[a.keys[o]]}else n=a.param_no?r[a.param_no]:r[d++];if(i.not_type.test(a.type)&&i.not_primitive.test(a.type)&&n instanceof Function&&(n=n()),i.numeric_arg.test(a.type)&&"number"!=typeof n&&isNaN(n))throw new TypeError(e("[sprintf] expecting number but found %T",n));switch(i.number.test(a.type)&&(f=n>=0),a.type){case"b":n=parseInt(n,10).toString(2);break;case"c":n=String.fromCharCode(parseInt(n,10));break;case"d":case"i":n=parseInt(n,10);break;case"j":n=JSON.stringify(n,null,a.width?parseInt(a.width):0);break;case"e":n=a.precision?parseFloat(n).toExponential(a.precision):parseFloat(n).toExponential();break;case"f":n=a.precision?parseFloat(n).toFixed(a.precision):parseFloat(n);break;case"g":n=a.precision?String(Number(n.toPrecision(a.precision))):parseFloat(n);break;case"o":n=(parseInt(n,10)>>>0).toString(8);break;case"s":n=String(n),n=a.precision?n.substring(0,a.precision):n;break;case"t":n=String(!!n),n=a.precision?n.substring(0,a.precision):n;break;case"T":n=Object.prototype.toString.call(n).slice(8,-1).toLowerCase(),n=a.precision?n.substring(0,a.precision):n;break;case"u":n=parseInt(n,10)>>>0;break;case"v":n=n.valueOf(),n=a.precision?n.substring(0,a.precision):n;break;case"x":n=(parseInt(n,10)>>>0).toString(16);break;case"X":n=(parseInt(n,10)>>>0).toString(16).toUpperCase()}i.json.test(a.type)?y+=n:(!i.number.test(a.type)||f&&!a.sign?u="":(u=f?"+":"-",n=n.toString().replace(i.sign,"")),c=a.pad_char?"0"===a.pad_char?"0":a.pad_char.charAt(1):" ",l=a.width-(u+n).length,p=a.width&&l>0?c.repeat(l):"",y+=a.align?u+n+p:"0"===c?u+p+n:p+u+n)}return y}function n(e){if(s[e])return s[e];for(var t,r=e,n=[],o=0;r;){if(null!==(t=i.text.exec(r)))n.push(t[0]);else if(null!==(t=i.modulo.exec(r)))n.push("%");else{if(null===(t=i.placeholder.exec(r)))throw new SyntaxError("[sprintf] unexpected placeholder");if(t[2]){o|=1;var a=[],p=t[2],c=[];if(null===(c=i.key.exec(p)))throw new SyntaxError("[sprintf] failed to parse named argument key");for(a.push(c[1]);""!==(p=p.substring(c[0].length));)if(null!==(c=i.key_access.exec(p)))a.push(c[1]);else{if(null===(c=i.index_access.exec(p)))throw new SyntaxError("[sprintf] failed to parse named argument key");a.push(c[1])}t[2]=a}else o|=2;if(3===o)throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported");n.push({placeholder:t[0],param_no:t[1],keys:t[2],sign:t[3],pad_char:t[4],align:t[5],width:t[6],precision:t[7],type:t[8]})}r=r.substring(t[0].length)}return s[e]=n}var i={not_string:/[^s]/,not_bool:/[^t]/,not_type:/[^T]/,not_primitive:/[^v]/,number:/[diefg]/,numeric_arg:/[bcdiefguxX]/,json:/[j]/,not_json:/[^j]/,text:/^[^\x25]+/,modulo:/^\x25{2}/,placeholder:/^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,key:/^([a-z_][a-z_\d]*)/i,key_access:/^\.([a-z_][a-z_\d]*)/i,index_access:/^\[(\d+)\]/,sign:/^[\+\-]/},s=Object.create(null);"undefined"!=typeof exports&&(exports.sprintf=e,exports.vsprintf=t),"undefined"!=typeof window&&(window.sprintf=e,window.vsprintf=t,"function"==typeof define&&define.amd&&define(function(){return{sprintf:e,vsprintf:t}}))}();

$(function () {
  // function _ (a, x) { return new Function (a,'return ' + x); }

  var w = 6;
  var h = 8;
  var lD = false;
  var rD = false;

  var $lametricTime = $('#lametric-time').addClass ('w' + w).addClass ('h' + h);
  var u = $lametricTime.append (new Array (w * h).fill (0).map (function (t) {
    return $('<div />').attr ('class', 'c' + t).click (function () {
      // 
      $(this).attr ('class', 'c-1');
    }).contextmenu (function () {
      $(this).attr ('class', 'c0');
      return false;
    }).mouseenter (function () {
      if (lD) $(this).attr ('class', 'c-1');
      if (rD) $(this).attr ('class', 'c0');
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
  
  function to1d (arr) {
    return arr.map (function (t) {
      return $.extend (new Array (w).fill (null), t).slice (0, w);
    }).reduce (function (p, n) {
      return p.concat (n);
    });
  }
  function render (arr2d) {
    if (!arr2d.length) return;
    return (Array.isArray (arr2d[0]) ? to1d (arr2d) : $.extend (new Array (w).fill (null), arr2d)).forEach (function (t, i) {
      t != null && u.eq (i).attr ('class', 'c' + t);
    });
  }
  function delay (a) {
    var t = null;

    if (Array.isArray (a) && a.length) {
      t = a.shift ();
      t = t ();
      t = isNaN (t) ? 1 : t;
      setTimeout (delay.bind (this, a), t * 500);
    } else if (typeof a === 'function') {
      t = a ();
      t = isNaN (t) ? 1 : t;
      var params = Array.prototype.slice.call (arguments); params.shift ();
      setTimeout (delay.bind (this, params), t * 500);
    }
    if (typeof a != 'function') return ;
  }
  var arr2d = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ];

    $('#x').click (function () {
      var x = [], str = '';
      for (var i = 0; i < w; i++) {
        str = '';
        for (var j = 0; j < h; j++) {
          str += u.eq (j * w + i).hasClass ('c-1') ? '1' : '0';
        }
        x.push (str);
      }
      console.error ("\n" + "'_': [" + x.map (function (d) { return '0b' + d;}).join (', ') + '],');
                  
      
    });

});