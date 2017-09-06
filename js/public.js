/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2017 OA Wu Design
 * @license     http://creativecommons.org/licenses/by-nc/2.0/tw/
 */
 
window.fbAsyncInit = function () { FB.init ({ appId: '151833618725768', cookie: true, xfbml: true, version: 'v2.10' }); };
(function(d, s, id){ var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) {return;} js = d.createElement(s); js.id = id; js.src = "//connect.facebook.net/zh_TW/sdk.js"; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'facebook-jssdk'));

$(function () {
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

  // loading.show ();
  // setTimeout (function () {
  //   loading.close ();
  // }, 3000);

});