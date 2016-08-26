/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2016 OA Wu Design
 */

$(function () {

  window.func.loads.dashboard ();
  setInterval (window.func.loads.dashboard, window.vars.timer.loadDashboard);
  window.vars.$.tabTitles.find ('a[data-key="dashboard"]').click ();
  setTimeout (function () {
    cursor_feature_dashboard_all ();
  }, 100);

  window.vars.isFinished = true;
});