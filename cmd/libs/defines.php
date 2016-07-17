<?php

/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2016 OA Wu Design
 */

mb_regex_encoding ("UTF-8");
mb_internal_encoding ('UTF-8');

date_default_timezone_set ('Asia/Taipei');

define ('PROTOCOL', "http://");

define ('JS', '.js');
define ('CSS', '.css');
define ('JSON', '.json');
define ('HTML', '.html');
define ('TXT', '.txt');
define ('XML', '.xml');

define ('NAME', ($temps = array_filter (explode (DIRECTORY_SEPARATOR, PATH))) ? end ($temps) : '');

define ('OA', '吳政賢');
define ('URL_OA', 'http://www.ioa.tw/');
define ('URL_OA_FB', 'https://www.facebook.com/comdan66/');
define ('URL_OA_FB_UID', '100000100541088');
define ('URL_FB_APP_ID', '199589883770118');
define ('URL_FB_ADMIN_ID', URL_OA_FB_UID);
