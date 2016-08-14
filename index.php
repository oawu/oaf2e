<!DOCTYPE html>
<html lang="tw">
  <head>
    <meta http-equiv="Content-Language" content="zh-tw" />
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui" />

    <title></title>

    <meta name="robots" content="index,follow" />

    <meta name="author" content="吳政賢(OA Wu)" />

    <meta name="keywords" content="" />
    <meta name="description" content="" />
    <meta property="og:site_name" content="" />
    <meta property="og:title" content="" />
    <meta property="og:description" content="" />
    <meta property="og:url" content="" />

    <meta property="fb:admins" content="100000100541088" />
    <meta property="fb:app_id" content="640377126095413" />

    <meta property="og:locale" content="zh_TW" />
    <meta property="og:locale:alternate" content="en_US" />

    <meta property="og:type" content="city" />
    <meta property="og:image" content="" alt="" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <link href="css/public.css" rel="stylesheet" type="text/css" />

    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&language=zh-TW" language="javascript" type="text/javascript" ></script>
    <script src="js/jquery_v1.10.2/jquery-1.10.2.min.js" language="javascript" type="text/javascript" ></script>
    <script src="js/public.js" language="javascript" type="text/javascript" ></script>

  </head>
  <body lang="zh-tw">
    <div id='maps'></div>
    <div id='length'>0</div>

    <div id='map_menu'><div><div class='add_marker'>新增節點</div></div></div>
    <div id='marker_menu'><div><div class='del'>刪除節點</div></div></div>
    <div id='polyline_menu'><div><div class='add'>插入節點</div></div></div>

    <label class='switch' id='move'>
      <input type='checkbox' checked>
      <span></span>
      跟著路徑移動
    </label>
    <div id='speed'>0</div>
  </body>
</html>
