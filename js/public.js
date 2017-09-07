/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2017 OA Wu Design
 * @license     http://creativecommons.org/licenses/by-nc/2.0/tw/
 */
 /*!
  Autosize 3.0.8
  license: MIT
  http://www.jacklmoore.com/autosize
*/
!function(e,t){if("function"==typeof define&&define.amd)define(["exports","module"],t);else if("undefined"!=typeof exports&&"undefined"!=typeof module)t(exports,module);else{var o={exports:{}};t(o.exports,o),e.autosize=o.exports}}(this,function(e,t){"use strict";function o(e){function t(){var t=window.getComputedStyle(e,null);"vertical"===t.resize?e.style.resize="none":"both"===t.resize&&(e.style.resize="horizontal"),u="content-box"===t.boxSizing?-(parseFloat(t.paddingTop)+parseFloat(t.paddingBottom)):parseFloat(t.borderTopWidth)+parseFloat(t.borderBottomWidth),i()}function o(t){var o=e.style.width;e.style.width="0px",e.offsetWidth,e.style.width=o,v=t,l&&(e.style.overflowY=t),n()}function n(){var t=window.pageYOffset,o=document.body.scrollTop,n=e.style.height;e.style.height="auto";var i=e.scrollHeight+u;return 0===e.scrollHeight?void(e.style.height=n):(e.style.height=i+"px",document.documentElement.scrollTop=t,void(document.body.scrollTop=o))}function i(){var t=e.style.height;n();var i=window.getComputedStyle(e,null);if(i.height!==e.style.height?"visible"!==v&&o("visible"):"hidden"!==v&&o("hidden"),t!==e.style.height){var r=document.createEvent("Event");r.initEvent("autosize:resized",!0,!1),e.dispatchEvent(r)}}var r=void 0===arguments[1]?{}:arguments[1],d=r.setOverflowX,s=void 0===d?!0:d,a=r.setOverflowY,l=void 0===a?!0:a;if(e&&e.nodeName&&"TEXTAREA"===e.nodeName&&!e.hasAttribute("data-autosize-on")){var u=null,v="hidden",f=function(t){window.removeEventListener("resize",i),e.removeEventListener("input",i),e.removeEventListener("keyup",i),e.removeAttribute("data-autosize-on"),e.removeEventListener("autosize:destroy",f),Object.keys(t).forEach(function(o){e.style[o]=t[o]})}.bind(e,{height:e.style.height,resize:e.style.resize,overflowY:e.style.overflowY,overflowX:e.style.overflowX,wordWrap:e.style.wordWrap});e.addEventListener("autosize:destroy",f),"onpropertychange"in e&&"oninput"in e&&e.addEventListener("keyup",i),window.addEventListener("resize",i),e.addEventListener("input",i),e.addEventListener("autosize:update",i),e.setAttribute("data-autosize-on",!0),l&&(e.style.overflowY="hidden"),s&&(e.style.overflowX="hidden",e.style.wordWrap="break-word"),t()}}function n(e){if(e&&e.nodeName&&"TEXTAREA"===e.nodeName){var t=document.createEvent("Event");t.initEvent("autosize:destroy",!0,!1),e.dispatchEvent(t)}}function i(e){if(e&&e.nodeName&&"TEXTAREA"===e.nodeName){var t=document.createEvent("Event");t.initEvent("autosize:update",!0,!1),e.dispatchEvent(t)}}var r=null;"undefined"==typeof window||"function"!=typeof window.getComputedStyle?(r=function(e){return e},r.destroy=function(e){return e},r.update=function(e){return e}):(r=function(e,t){return e&&Array.prototype.forEach.call(e.length?e:[e],function(e){return o(e,t)}),e},r.destroy=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],n),e},r.update=function(e){return e&&Array.prototype.forEach.call(e.length?e:[e],i),e}),t.exports=r});


window.fbAsyncInit = function () { FB.init ({ appId: '151833618725768', cookie: true, xfbml: true, version: 'v2.10' }); };
(function(d, s, id){ var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) {return;} js = d.createElement(s); js.id = id; js.src = "//connect.facebook.net/zh_TW/sdk.js"; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'facebook-jssdk'));

$(function () {
  autosize ($('.autosize'));
  $('#menu .wrap').each (function () { $(this).addClass ('n' + $(this).find ('>*').length); });
  var loading = {
    $el: $('#loading'),
    ter: [],
    clrTer: function (str) {
      this.ter.map (clearTimeout);
      this.ter = [];
    },
    show: function (str) {
      if (typeof str !== 'undefined') this.$el.text (str);
      this.clrTer ();
      this.$el.addClass ('s');
      this.ter.push (setTimeout (function () { this.$el.addClass ('a'); }.bind (this), 100));
    },
    close: function () {
      this.clrTer ();
      this.$el.removeClass ('a');
      this.ter.push (setTimeout (function () { this.$el.removeClass ('s'); }.bind (this), 330));
    },
  };
  var ntf = {
    $el: $('#ntf'),
    add: function (obj) {
      var $a = $('<a />').addClass ('icon-12').click (function () { var $t = $(this).parent ().removeClass ('s'); setTimeout (function () { $t.remove (); }, 300); });

      var $t = $('<div />').append (
        typeof obj.m !== 'undefined' ? $('<div />').addClass ('_ic').append ($('<img />').attr ('src', obj.m)) : (typeof obj.i !== 'undefined' ? $('<div />').addClass (obj.i).addClass (typeof obj.c !== 'undefined' ? null : 'i').css (typeof obj.c !== 'undefined' ? {color: obj.c} : {}) : null)).append (
        $('<span />').text (obj.t)).append (
        $('<span />').text (obj.d)).append (
        $a);

      this.$el.append ($t);
      // $t.find ('>div._ic').imgLiquid ({verticalAlign: 'center'});
      setTimeout (function () { $t.addClass ('s'); }, 100);
      setTimeout (function () { $a.click (); }, 1000 * 10);
      return true;
    }
  };


  $('form.create').submit (function () {
    loading.show ();

    setTimeout (function () {
      ntf.add ({i: 'icon-10', c: 'rgba(49, 183, 164, 1.00)', t: '完成！', d: '已經成功完成操作囉。'});
      $(this).prepend ($('<span />').addClass ('b').text ('已經成功完成操作囉。'));
      loading.close ();
    }.bind ($(this)), 1000);
    return false;
  });

});