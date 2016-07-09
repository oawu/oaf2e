/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2016 OA Wu Design
 */

Array.prototype.column = function (k) { return this.map (function (t) { return k ? eval ("t." + k) : t; }); };
function getStorage (key) { return ((typeof (Storage) !== 'undefined') && (value = localStorage.getItem (key)) && (value = JSON.parse (value))) ? value : undefined; }
function setStorage (key, data) { if (typeof (Storage) !== 'undefined') { localStorage.setItem (key, JSON.stringify (data)); return true; } return false; }

$(function () {
  var weathers = ['01@2x.png', '02@2x.png', '03@2x.png', '04@2x.png', '05@2x.png', '06@2x.png', '07@2x.png', '08@2x.png', '09@2x.png', '10@2x.png', '11@2x.png', '12@2x.png', '13@2x.png', '14@2x.png', '15@2x.png', '16@2x.png', '17@2x.png', '18@2x.png', '19@2x.png', '20@2x.png', '21@2x.png', '22@2x.png', '23@2x.png', '24@2x.png', '25@2x.png', '26@2x.png', '27@2x.png', '28@2x.png', '29@2x.png', '30@2x.png', '31@2x.png', '32@2x.png', '33@2x.png', '34@2x.png', '35@2x.png', '36@2x.png', '37@2x.png', '38@2x.png', '39@2x.png', '40@2x.png', '41@2x.png', '42@2x.png', '43@2x.png', '44@2x.png', '45@2x.png', '46@2x.png', '47@2x.png', '48@2x.png', '49@2x.png', '50@2x.png', '51@2x.png', '52@2x.png', '53@2x.png', '54@2x.png', '55@2x.png', '56@2x.png', '57@2x.png', '58@2x.png', '59@2x.png', '60@2x.png', '61@2x.png', '62@2x.png', '63@2x.png', '64@2x.png', '65@2x.png'];
  var icons = ['icon-01', 'icon-02', 'icon-03', 'icon-04', 'icon-05', 'icon-06', 'icon-07', 'icon-08', 'icon-09', 'icon-10', 'icon-11', 'icon-12', 'icon-13', 'icon-14', 'icon-15', 'icon-16', 'icon-17', 'icon-18', 'icon-19', 'icon-20', 'icon-21', 'icon-22', 'icon-23', 'icon-24', 'icon-25', 'icon-26', 'icon-27', 'icon-28', 'icon-29', 'icon-30', 'icon-31', 'icon-32', 'icon-33', 'icon-34', 'icon-35', 'icon-36', 'icon-37', 'icon-38', 'icon-39', 'icon-40', 'icon-41', 'icon-42', 'icon-t', 'icon-43', 'icon-44', 'icon-45', 'icon-46', 'icon-47', 'icon-48', 'icon-49', 'icon-50', 'icon-51', 'icon-52', 'icon-54', 'icon-54', 'icon-55', 'icon-56', 'icon-57', 'icon-58', 'icon-59', 'icon-60', 'icon-61', 'icon-62', 'icon-63', 'icon-64', 'icon-65', 'icon-66', 'icon-67', 'icon-68', 'icon-69', 'icon-70', 'icon-71', 'icon-72', 'icon-73', 'icon-74', 'icon-75', 'icon-76', 'icon-77', 'icon-78', 'icon-79', 'icon-80', 'icon-81', 'icon-82', 'icon-83', 'icon-84', 'icon-85', 'icon-86', 'icon-87', 'icon-88', 'icon-89', 'icon-90', 'icon-91', 'icon-92', 'icon-93', 'icon-94', 'icon-95', 'icon-96', 'icon-97', 'icon-98', 'icon-99', 'icon-100', 'icon-101', 'icon-102', 'icon-103', 'icon-104', 'icon-105', 'icon-106', 'icon-017', 'icon-018', 'icon-109', 'icon-110', 'icon-111', 'icon-112', 'icon-113', 'icon-114', 'icon-115', 'icon-116', 'icon-117', 'icon-118', 'icon-119', 'icon-120', 'icon-121', 'icon-122', 'icon-123', 'icon-124', 'icon-125', 'icon-126', 'icon-127', 'icon-128', 'icon-129', 'icon-130', 'icon-131', 'icon-132', 'icon-133', 'icon-134', 'icon-135', 'icon-136', 'icon-137', 'icon-138', 'icon-139', 'icon-a1', 'icon-a2', 'icon-a3', 'icon-a4', 'icon-a5', 'icon-a6', 'icon-m', 'icon-u', 'icon-h', 'icon-g', 'icon-s'];
  var old = getStorage ('oaf2e_weather');
  old = old ? old : [];
  var $icons1 = $('.icons1');
  var $icons2 = $('.icons2');
  var $icons3 = $('.icons3');
  var oldIcons = [];
  var remove = getStorage ('oaf2e_weather_remove');
  remove = remove ? remove : [];

  $icons1.append (weathers.map (function (t) {
    var is = [];
    if (old.length) is = $.grep (old, function(e) { return e.weather == t; })[0].icons;
    oldIcons = oldIcons.concat (is);

    return $('<div />').append ($('<div />').append ($('<img />').data ('name', t).attr ('src', 'img/weathers/' + t))).append ($('<div />').addClass ('icons').addClass ('item').append (is.map (function (u) {
      return $('<div />').data ('name', u).addClass (u);
    })));
  }));
  
  $icons2.append (icons.map (function (t) {
    return $.inArray (t, remove) == -1 && $.inArray (t, oldIcons) == -1 ? $('<div />').data ('name', t).addClass (t) : null;
  }));
  $icons3.append (remove.map (function (t) {
    return $('<div />').data ('name', t).addClass (t);
  }));

  $('[class^="icon-"]').dblclick (function () {
    var $that = $(this).clone (true);
    $('.icons .' + $(this).data ('name')).remove ();
    $('.icons3').append ($that);
  });
  // .mousedown (function (e) {
  //   if(e.button == 2) {
  //     $(this).remove ();
  //     return false;
  //   }
  //   return true;
  // });
  $('.item').sortable ({
    connectWith: ".icons",
    remove: function (event, ui) {
        ui.item.clone (true).appendTo (ui.item.parent ());
        $(this).sortable ('cancel');
      }
  }).disableSelection ();

  $('.icons2, .icons3').sortable ({
    connectWith: ".icons",
  }).disableSelection ();


  $('.panel > div').click (function () { $('.panel').toggleClass ('s'); });
  $('.print').click (function () {
    var set = $('.icons1 > div').map (function () {
      return {
        weather: $(this).find ('img').data ('name'),
        icons: $(this).find ('.icons > *').map (function () {
          return $(this).data ('name');
        }).toArray ()
      };
    }).toArray ();
    setStorage ('oaf2e_weather', set);
    setStorage ('oaf2e_weather_remove', $('.icons3 > div').map (function () {
      return $(this).data ('name');
    }).toArray ());
    

    var str = "";
    str = "array (" + "\n";
    for (var i = 0; i < set.length; i++)
      str += "  '" + set[i].weather + "' => array (" + set[i].icons.map (function (t) { return "'" + t + "'"; }).join (', ') + ")" + "\n";
    str += ");";

    $('.panel > pre').empty ().text (str);
    $('.panel').toggleClass ('s');
  });
});