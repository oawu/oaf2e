/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2016 OA Wu Design
 */

$(function () {

  window.func.loads.dashboard ();
  setInterval (window.func.loads.dashboard, window.vars.timer.loadDashboard);
  setTimeout (function () {
    window.vars.$.tabTitles.find ('a[data-key="heatmaps"]').click ();
  }, 1500);
});