/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2017 OA Wu Design
 * @license     http://creativecommons.org/licenses/by-nc/2.0/tw/
 */
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-46121102-7', 'auto');
  ga('send', 'pageview');

  function number_format(a,b,c,d){a=(a+"").replace(/[^0-9+\-Ee.]/g,"");var e=isFinite(+a)?+a:0,f=isFinite(+b)?Math.abs(b):0,g=void 0===d?",":d,h=void 0===c?".":c,i="",j=function(a,b){var c=Math.pow(10,b);return""+Math.round(a*c)/c};return i=(f?j(e,f):""+Math.round(e)).split("."),i[0].length>3&&(i[0]=i[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,g)),(i[1]||"").length<f&&(i[1]=i[1]||"",i[1]+=new Array(f-i[1].length+1).join("0")),i.join(h)}

$(function () {
  $('.subs').each (function () {
    $(this).addClass ('n' + $(this).find ('.sub').length);
  });
  var datas = [
      {t: '機器人控制MCU程式開發專案', p: 1234, s: 10, d: 4},
      {t: '商業室內空間設計專案', p: 234, s: 3, d: 3},
      {t: '3D動畫製作專案', p: 3411, s: 6, d: 1},
      {t: '兼職時間彈性 月入20,000↑ 經銷商營收多增6位數↑專案', p: 1234, s: 10, d: 3},
      {t: '全台灣各區輸送機維修專案', p: 2134, s: 10, d: 1},
      {t: '廠內包裝員/家庭代工專案', p: 4534, s: 2, d: 2},
      {t: '桃園區域房屋業務代銷專案', p: 1000, s: 8, d: 12},
      {t: '美工網拍行銷專案', p: 3033, s: 5, d: 7},
      {t: '代理網站機房服務專案', p: 5600, s: 4, d: 8},
      {t: '網頁設計程式撰寫專案', p: 6000, s: 7, d: 1},
      {t: '網頁版面 flash設計專案', p: 7000, s: 2, d: 8},
      {t: '機器人控制MCU程式開發專案', p: 1234, s: 10, d: 4},
      {t: '商業室內空間設計專案', p: 234, s: 3, d: 3},
      {t: '3D動畫製作專案', p: 3411, s: 6, d: 1},
      {t: '兼職時間彈性 月入20,000↑ 經銷商營收多增6位數↑專案', p: 1234, s: 10, d: 3},
      {t: '全台灣各區輸送機維修專案', p: 2134, s: 10, d: 1},
      {t: '廠內包裝員/家庭代工專案', p: 4534, s: 2, d: 2},
      {t: '桃園區域房屋業務代銷專案', p: 1000, s: 8, d: 12},
      {t: '美工網拍行銷專案', p: 3033, s: 5, d: 7},
      {t: '代理網站機房服務專案', p: 5600, s: 4, d: 8},
      {t: '網頁設計程式撰寫專案', p: 6000, s: 7, d: 1},
      {t: '網頁版面 flash設計專案', p: 7000, s: 2, d: 8},
    ];

  function start (c) {
    var full = parseInt (c / 2, 10);
    var half = parseInt (((c / 2) - full) * 10, 10) ? 1 : 0;
    var empty = 5 - full - half;

    var arr = Array.apply (null, Array (full)).map (function () {
      return 'icon-star-full';
    }).concat (Array.apply (null, Array (half)).map (function () {
      return 'icon-star-half';
    }), Array.apply (null, Array (empty)).map (function () {
      return 'icon-star-empty';
    }));
    return arr.map (function (t) {
      return $('<i />').addClass (t);
    });
  }

  function render (c, s) {
    if (c)
      datas.sort (function (a, b) {
        return c != '3' ? c != '2' ? (b.p - a.p) : (b.s - a.s) : (a.d - b.d);
      });

    var x = datas;
    if (s && s.length)
      x = datas.filter (function (t) {
        var re = new RegExp ("(" + s.split (/\s+/).join ('|') + ")+");

        return re.test (t.t);
      });

    $('#list').empty ()
              .append (x.map (function (t) {
      return $('<a />').addClass ('item')
                       .append ($('<span />').text (t.t))
                       .append ($('<span />').text (number_format (t.p)))
                       .append ($('<span />').append (start (t.s)))
                       .append ($('<span />').text (t.d + '天之前'));
    }));
  }

  $("input[name='layout']").change (function () {
    if ($(this).val () == '1') {
      $('#list').removeClass ('block');
    } else {
      $('#list').addClass ('block');
    }
  });
  $("input[name='sort']").change (function () {
    render ($(this).val ());
  });
  $('#sfm').submit (function () {
    render (null, $('#search').val ());
    
    return false;
  });

  render ();
});