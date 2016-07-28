<?php

$data = file_get_contents ('http://stackoverflow.com/questions/17826312/how-to-parse-html-tag-with-regular-expressions');

preg_match_all ('/<div class="header">(.*?)<\/div>/is', $data, $res);

echo '<meta http-equiv="Content-type" content="text/html; charset=utf-8" /><pre>';
var_dump ($res);
exit ();