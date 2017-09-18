/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2017 OA Wu Design
 * @license     http://creativecommons.org/licenses/by-nc/2.0/tw/
 */
var OAIL=OAIL||{VER:"0.9.944"};OAIL.bgs_Available=!1,OAIL.bgs_CheckRunned=!1,OAIL.injectCss=".OAIL img {visibility:hidden}",function(i){function t(){if(!OAIL.bgs_CheckRunned){OAIL.bgs_CheckRunned=!0;var t=i('<span style="background-size:cover" />');i("body").append(t),!function(){var i=t[0];if(i&&window.getComputedStyle){var e=window.getComputedStyle(i,null);e&&e.backgroundSize&&(OAIL.bgs_Available="cover"===e.backgroundSize)}}(),t.remove()}}i.fn.extend({OAIL:function(e){this.defaults={fill:!0,verticalAlign:"center",horizontalAlign:"center",useBackgroundSize:!0,useDataHtmlAttr:!0,responsive:!0,delay:0,fadeInTime:0,removeBoxBackground:!0,hardPixels:!0,responsiveCheckTime:500,timecheckvisibility:500,onStart:null,onFinish:null,onItemStart:null,onItemFinish:null,onItemError:null},t();var a=this;return this.options=e,this.settings=i.extend({},this.defaults,this.options),this.settings.onStart&&this.settings.onStart(),this.each(function(t){function e(){-1===u.css("background-image").indexOf(encodeURI(c.attr("src")))&&u.css({"background-image":'url("'+encodeURI(c.attr("src"))+'")'}),u.css({"background-size":g.fill?"cover":"contain","background-position":(g.horizontalAlign+" "+g.verticalAlign).toLowerCase(),"background-repeat":"no-repeat"}),i("a:first",u).css({display:"block",width:"100%",height:"100%"}),i("img",u).css({display:"none"}),g.onItemFinish&&g.onItemFinish(t,u,c),u.addClass("OAIL_bgSize"),u.addClass("OAIL_ready"),l()}function d(){function e(){c.data("OAIL_error")||c.data("OAIL_loaded")||c.data("OAIL_oldProcessed")||(u.is(":visible")&&c[0].complete&&c[0].width>0&&c[0].height>0?(c.data("OAIL_loaded",!0),setTimeout(r,t*g.delay)):setTimeout(e,g.timecheckvisibility))}if(c.data("oldSrc")&&c.data("oldSrc")!==c.attr("src")){var a=c.clone().removeAttr("style");return a.data("OAIL_settings",c.data("OAIL_settings")),c.parent().prepend(a),c.remove(),c=a,c[0].width=0,setTimeout(d,10),void 0}return c.data("OAIL_oldProcessed")?(r(),void 0):(c.data("OAIL_oldProcessed",!1),c.data("oldSrc",c.attr("src")),i("img:not(:first)",u).css("display","none"),u.css({overflow:"hidden"}),c.fadeTo(0,0).removeAttr("width").removeAttr("height").css({visibility:"visible","max-width":"none","max-height":"none",width:"auto",height:"auto",display:"block"}),c.on("error",n),c[0].onerror=n,e(),o(),void 0)}function o(){(g.responsive||c.data("OAIL_oldProcessed"))&&c.data("OAIL_settings")&&(g=c.data("OAIL_settings"),u.actualSize=u.get(0).offsetWidth+u.get(0).offsetHeight/1e4,u.sizeOld&&u.actualSize!==u.sizeOld&&r(),u.sizeOld=u.actualSize,setTimeout(o,g.responsiveCheckTime))}function n(){c.data("OAIL_error",!0),u.addClass("OAIL_error"),g.onItemError&&g.onItemError(t,u,c),l()}function s(){var i={};if(a.settings.useDataHtmlAttr){var t=u.attr("data-OAIL-fill"),e=u.attr("data-OAIL-horizontalAlign"),d=u.attr("data-OAIL-verticalAlign");("true"===t||"false"===t)&&(i.fill=Boolean("true"===t)),void 0===e||"left"!==e&&"center"!==e&&"right"!==e&&-1===e.indexOf("%")||(i.horizontalAlign=e),void 0===d||"top"!==d&&"bottom"!==d&&"center"!==d&&-1===d.indexOf("%")||(i.verticalAlign=d)}return OAIL.isIE&&a.settings.ieFadeInDisabled&&(i.fadeInTime=0),i}function r(){var i,e,a,d,o,n,s,r,m=0,h=0,f=u.width(),v=u.height();void 0===c.data("owidth")&&c.data("owidth",c[0].width),void 0===c.data("oheight")&&c.data("oheight",c[0].height),g.fill===f/v>=c.data("owidth")/c.data("oheight")?(i="100%",e="auto",a=Math.floor(f),d=Math.floor(f*(c.data("oheight")/c.data("owidth")))):(i="auto",e="100%",a=Math.floor(v*(c.data("owidth")/c.data("oheight"))),d=Math.floor(v)),o=g.horizontalAlign.toLowerCase(),s=f-a,"left"===o&&(h=0),"center"===o&&(h=.5*s),"right"===o&&(h=s),-1!==o.indexOf("%")&&(o=parseInt(o.replace("%",""),10),o>0&&(h=.01*s*o)),n=g.verticalAlign.toLowerCase(),r=v-d,"left"===n&&(m=0),"center"===n&&(m=.5*r),"bottom"===n&&(m=r),-1!==n.indexOf("%")&&(n=parseInt(n.replace("%",""),10),n>0&&(m=.01*r*n)),g.hardPixels&&(i=a,e=d),c.css({width:i,height:e,"margin-left":Math.floor(h),"margin-top":Math.floor(m)}),c.data("OAIL_oldProcessed")||(c.fadeTo(g.fadeInTime,1),c.data("OAIL_oldProcessed",!0),g.removeBoxBackground&&u.css("background-image","none"),u.addClass("OAIL_nobgSize"),u.addClass("OAIL_ready")),g.onItemFinish&&g.onItemFinish(t,u,c),l()}function l(){t===a.length-1&&a.settings.onFinish&&a.settings.onFinish()}var g=a.settings,u=i(this),c=i("img:first",u);return c.length?(c.data("OAIL_settings")?(u.removeClass("OAIL_error").removeClass("OAIL_ready"),g=i.extend({},c.data("OAIL_settings"),a.options)):g=i.extend({},a.settings,s()),c.data("OAIL_settings",g),g.onItemStart&&g.onItemStart(t,u,c),OAIL.bgs_Available&&g.useBackgroundSize?e():d(),void 0):(n(),void 0)})}})}(jQuery),!function(){var i=OAIL.injectCss,t=document.getElementsByTagName("head")[0],e=document.createElement("style");e.type="text/css",e.styleSheet?e.styleSheet.cssText=i:e.appendChild(document.createTextNode(i)),t.appendChild(e)}();
$(function () {
  $('.banners div,._ic').OAIL ({verticalAlign: 'center'});





  var ntf = {
    $el: $('#ntf'),
    add: function (obj) {
      var $a = $('<a />').addClass ('icon-7').click (function () { var $t = $(this).parent ().removeClass ('s'); setTimeout (function () { $t.remove (); }, 300); });

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
  ntf.add ({i: 'icon-13', c: 'rgba(49, 183, 164, 1.00)', t: '完成！', d: '已經成功完成操作囉。'});
});