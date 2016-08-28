/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2016 OA Wu Design
 */



function cursor_feature_dashboard () { window.vars.$.tabTitles.find ('a[data-key="dashboard"]').click (); }
function cursor_feature_heatmaps () { window.vars.$.tabTitles.find ('a[data-key="heatmaps"]').click (); }
function cursor_feature_heatmaps_all () { window.vars.heatmaps.$.typeAll.click (); }
function cursor_feature_heatmaps_store () { window.vars.heatmaps.$.typeStore.click (); }
function cursor_feature_heatmaps_user () { window.vars.heatmaps.$.typeUser.click (); }
function cursor_feature_heatmaps_clean () { window.vars.heatmaps.$.typeClean.click (); }

function cursor_feature_dashboard_all () {
  window.func.popanel.show (window.vars.$.cursor.offset ().left, window.vars.$.cursor.offset ().top, '/oaf2e/data/p.json', function (result) {
    $content = $(_.template ($('#_popanel_dashboard_all').html (), {}) ({}));

    $(this).addClass ('dashboard_all').append ($content);

    var options = {
      // is3D: true,
      titleTextStyle: {color: '#ffffff', bold: true, fontSize: 20 },
      legend: {textStyle: {color: '#ffffff', fontSize: 18 }},
      backgroundColor: '#1e222a',
      slices: { 0: { color: '#f44336' }, 1: { color: '#ff9800' }, 2: { color: '#4caf50' }, 3: { color: '#03a9f4' }, 4: { color: '#ff5722' }, 5: { color: '#ffeb3b' }, 6: { color: '#2196f3' }, 7: { color: '#00bcd4' }, }
    };


    var pie = new google.visualization.PieChart ($(this).find ('.chart1').get (0));
    var row = new google.visualization.DataTable ();
    row.addColumn ('string', '區域');
    row.addColumn ('number', '訂單數');
    row.addRows ([['台北單數', parseInt (Math.random () * 100, 10)]]);
    row.addRows ([['台南單數', parseInt (Math.random () * 100, 10)]]);
    row.addRows ([['台中單數', parseInt (Math.random () * 100, 10)]]);
    row.addRows ([['高雄單數', parseInt (Math.random () * 100, 10)]]);
    pie.draw (row, $.extend({}, options, { title: '區域比例' }));



    pie = new google.visualization.PieChart ($(this).find ('.chart2').get (0));
    row = new google.visualization.DataTable ();
    row.addColumn ('string', '類型');
    row.addColumn ('number', '訂單數');
    row.addRows ([['一般商品', parseInt (Math.random () * 100, 10)]]);
    row.addRows ([['分潤商品', parseInt (Math.random () * 100, 10)]]);
    row.addRows ([['買斷商品', parseInt (Math.random () * 100, 10)]]);
    row.addRows ([['快付商品', parseInt (Math.random () * 100, 10)]]);
    pie.draw (row, $.extend({}, options, { title: '訂單類型' }));





    row = new google.visualization.DataTable ();

    row.addColumn({ type: 'date', id: '日期' });
    row.addColumn({ type: 'number', id: '訂單數' });
    row.addRows([
      [ new Date(2013, 9, 4), 38177 ],
      [ new Date(2013, 9, 5), 38705 ],
      [ new Date(2013, 9, 12), 38210 ],
      [ new Date(2013, 9, 13), 38029 ],
      [ new Date(2013, 9, 19), 38823 ],
      [ new Date(2013, 9, 23), 38345 ],
      [ new Date(2013, 9, 24), 38436 ],
      [ new Date(2013, 9, 30), 38447 ],
      [ new Date(2013, 10, 30), 38447 ]
    ]);

    pie = new google.visualization.Calendar ($(this).find ('.chart3').get (0));


    pie.draw (row, {
      title: '每日訂單比例',
      titleTextStyle: {color: '#ffffff', bold: true, fontSize: 20 },
      calendar: {
        daysOfWeek: '日一二三四五六',
        dayOfWeekRightSpace: 10,
        dayOfWeekLabel: {
          fontSize: 14,
          bold: true,
        },
        cellColor: {
          stroke: '#0a324b',
          strokeOpacity: 1,
          strokeWidth: 1,
        },
        monthOutlineColor: {
          stroke: '#03a9f4',
          strokeOpacity: 0.4,
          strokeWidth: 1
        },
        unusedMonthOutlineColor: {
          stroke: '#03a9f4',
          strokeOpacity: 0.1,
          strokeWidth: 1
        },
        monthLabel: {
          bold: true,
        },
        underMonthSpace: 10,
        underYearSpace: 10
      },
      colorAxis: {
        colors: ['#ffffff', '#4285f4']
      },
      noDataPattern: {
        backgroundColor: '#1e222a',
        color: '#1e222a'
      },
    });
  });
}
function cursor_feature_dashboard_taipei () {
  window.func.popanel.show (window.vars.$.cursor.offset ().left, window.vars.$.cursor.offset ().top, '/oaf2e/data/p.json', function (result) {
    
    
  });
}

function hasFinished () {
  if (typeof (window.vars.isFinished) == 'undefined' || !window.vars.isFinished) return false;
  return true;
}

function closeAuto () {
  if (!hasFinished ()) return false;
  
  if ((window.vars.$.cursor.attr ('data-hide') == 'yes') && (window.vars.$.cursor.attr ('data-hide', 'no'))) {
    var page = window.vars.$.tabTitles.find ('a.a').data ('key');
    window.vars.$.cursor.attr ('class', page)
                        .data ('page', page)
                        .data ('x', 0)
                        .data ('y', 0);
    
    window.vars.cursorArray = window.func.cursor.buildArray (page);
    
console.error (window.vars.cursorArray);
    
    return false;
  }

  return true;
}

function pageNext () {}
function pagePrev () {}
function cursorUp () {
  if (!closeAuto () || !window.vars.popanel.isFinish) return false;

  var up = window.func.cursor.arrayUp (window.vars.$.cursor.attr ('class'), window.vars.$.cursor.data ('x'), window.vars.$.cursor.data ('y'));

  window.vars.$.cursor.attr ('class', up.page)
                      .data ('x', up.x)
                      .data ('y', up.y);
}
function cursorDown () {
  if (!closeAuto () || !window.vars.popanel.isFinish) return false;

  var down = window.func.cursor.arrayDown (window.vars.$.cursor.attr ('class'), window.vars.$.cursor.data ('x'), window.vars.$.cursor.data ('y'));

  window.vars.$.cursor.attr ('class', down.page)
                      .data ('x', down.x)
                      .data ('y', down.y);
  return true;
}
function cursorLeft () {
  if (!closeAuto () || !window.vars.popanel.isFinish) return false;


  var prev = window.func.cursor.arrayPrev (window.vars.$.cursor.attr ('class'), window.vars.$.cursor.data ('x'), window.vars.$.cursor.data ('y'));

  window.vars.$.cursor.attr ('class', prev.page)
                      .data ('x', prev.x)
                      .data ('y', prev.y);
}
function cursorRight () {
  if (!closeAuto () || !window.vars.popanel.isFinish) return false;

  var next = window.func.cursor.arrayNext (window.vars.$.cursor.attr ('class'), window.vars.$.cursor.data ('x'), window.vars.$.cursor.data ('y'));

  window.vars.$.cursor.attr ('class', next.page)
                      .data ('x', next.x)
                      .data ('y', next.y);
  return true;
}
function cursorIn () {
  if (!closeAuto () || !window.vars.popanel.isFinish) return false;

  if (window.vars.$.cursor.data ('y') === 0) {
    var page = window.vars.$.cursor.attr ('class');
    window.vars.$.cursor.attr ('class', page)
                        .data ('page', page)
                        .data ('x', 0)
                        .data ('y', 0);
    window.vars.cursorArray = window.func.cursor.buildArray (page);
  } else {
  // //   window.vars.$.cursor.attr ('data-hide', 'yes');
  }

  var funcName = 'cursor_feature_' + window.vars.$.cursor.attr ('class');
  if (typeof window[funcName] == 'undefined') {
    window.vars.$.cursor.attr ('data-in', 'not');
    clearTimeout (window.vars.cursorTimer);
    window.vars.cursorTimer = setTimeout (function () { window.vars.$.cursor.attr ('data-in', 'no'); }, 500);
    return false;
  }
  
  window.vars.$.cursor.attr ('data-in', 'yes');
  
  clearTimeout (window.vars.cursorTimer);
  window.vars.cursorTimer = setTimeout (function () { window.vars.$.cursor.attr ('data-in', 'no'); }, 500);

  var tmpFunc = window[funcName];
  tmpFunc ();

  return true;
}
function cursorOut () {
  if (!closeAuto ()) return false;
  if (window.vars.popanel.isFinish) return false;

  window.func.popanel.hide (function () {

  });
}

$(function () {
  
  window.func.cursor.arrayUp = function (page, x, y) {
    for (var i = y - 1; i > -1 && i < window.vars.cursorArray.length; i--) for (var j = y > 1 ? (i == y - 1) ? x : window.vars.cursorArray[i].length - 1 : window.vars.$.tabTitles.find ('a.a').index (); j > -1 && (j < window.vars.cursorArray[i].length || ((i == y - 1) && ((j = window.vars.cursorArray[i].length - 1) || window.vars.cursorArray[i].length))); j--) return { page: window.vars.cursorArray[i][j], x: j, y: i };
    return typeof window.vars.cursorArray[window.vars.cursorArray.length - 1] == 'undefined' || typeof window.vars.cursorArray[window.vars.cursorArray.length - 1][window.vars.cursorArray[window.vars.cursorArray.length - 1].length - 1] == 'undefined' ? { page: window.vars.cursorArray[y][x], x: x, y: y } : { page: window.vars.cursorArray[window.vars.cursorArray.length - 1][window.vars.cursorArray[window.vars.cursorArray.length - 1].length - 1], x: window.vars.cursorArray[window.vars.cursorArray.length - 1].length - 1, y: window.vars.cursorArray.length - 1 };
  };
  window.func.cursor.arrayDown = function (page, x, y) {
    for (var i = y + 1; i > -1 && i < window.vars.cursorArray.length; i--) for (var j = y > 0 ? (i == y + 1) ? x : window.vars.cursorArray[i].length - 1 : 0; j > -1 && (j < window.vars.cursorArray[i].length || ((i == y + 1) && ((j = window.vars.cursorArray[i].length - 1) || window.vars.cursorArray[i].length))); j--) return { page: window.vars.cursorArray[i][j], x: j, y: i };
    return typeof window.vars.cursorArray[0] == 'undefined' || typeof window.vars.cursorArray[0][0] == 'undefined' ? { page: window.vars.cursorArray[y][x], x: x, y: y } : { page: window.vars.cursorArray[0][0], x: 0, y: 0 };
  };
  window.func.cursor.arrayPrev = function (page, x, y) {
    for (var i = y; i > -1 && i < window.vars.cursorArray.length; i--) for (var j = (i == y) ? x - 1 : window.vars.cursorArray[i].length - 1; j > -1 && j < window.vars.cursorArray[i].length; j--) return { page: window.vars.cursorArray[i][j], x: j, y: i };
    return typeof window.vars.cursorArray[window.vars.cursorArray.length - 1] == 'undefined' || typeof window.vars.cursorArray[window.vars.cursorArray.length - 1][window.vars.cursorArray[window.vars.cursorArray.length - 1].length - 1] == 'undefined' ? { page: window.vars.cursorArray[y][x], x: x, y: y } : { page: window.vars.cursorArray[window.vars.cursorArray.length - 1][window.vars.cursorArray[window.vars.cursorArray.length - 1].length - 1], x: window.vars.cursorArray[window.vars.cursorArray.length - 1].length - 1, y: window.vars.cursorArray.length - 1 };
  };
  
  window.func.cursor.arrayNext = function (page, x, y) {
    for (var i = y; i < window.vars.cursorArray.length; i++) for (var j = i == y ? x + 1 : 0; j < window.vars.cursorArray[i].length; j++) return { page: window.vars.cursorArray[i][j], x: j, y: i };
    return typeof window.vars.cursorArray[0] == 'undefined' || typeof window.vars.cursorArray[0][0] == 'undefined' ? { page: window.vars.cursorArray[y][x], x: x, y: y } : { page: window.vars.cursorArray[0][0], x: 0, y: 0 };
  };

  window.func.cursor.buildArray = function (page) {
    return typeof window.vars.cursor[page] == 'undefined' ? [] : [Object.keys (window.vars.cursor)].concat (window.vars.cursor[page].map (function (t) { return t.map (function (u) { return page + '_' + u; }); }));
  };

  $(document).keyup (function (e) {
    switch (e.keyCode) {
      case 38:
        cursorUp ();
        break;
      case 40:
        cursorDown ();
        break;
      case 37:
        cursorLeft ();
        break;
      case 39:
        cursorRight ();
        break;
      case 13:
        cursorIn ();
        break;
      case 27:
        cursorOut ();
        break;
    }
  });
});