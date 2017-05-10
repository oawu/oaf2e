<?php

/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2016 OA Wu Design
 *
 */

define ('PHP', '.php');
define ('PATH', implode (DIRECTORY_SEPARATOR, explode (DIRECTORY_SEPARATOR, dirname (str_replace (pathinfo (__FILE__, PATHINFO_BASENAME), '', __FILE__)))) . '/');
define ('PATH_CMD', PATH . 'cmd' . DIRECTORY_SEPARATOR);
define ('PATH_CMD_LIBS', PATH_CMD . 'libs' . DIRECTORY_SEPARATOR);

include_once PATH_CMD_LIBS . 'defines' . PHP;
include_once PATH_CMD_LIBS . 'Step' . PHP;
include_once PATH_CMD_LIBS . 'Minify' . DIRECTORY_SEPARATOR . 'Min' . PHP;



Step::start ();

$file = array_shift ($argv);
$argv = Step::params ($argv, array (array ('-b', '-bucket'), array ('-a', '-access'), array ('-s', '-secret'), array ('-u', '-upload'), array ('-m', '-minify'), array ('-n', '-usname')));
if (!(isset ($argv['-b'][0]) && ($bucket = trim ($argv['-b'][0], '/')) && isset ($argv['-a'][0]) && ($access = $argv['-a'][0]) && isset ($argv['-s'][0]) && ($secret = $argv['-s'][0]))) {
  echo str_repeat ('=', 80) . "\n";
  echo ' ' . Step::color ('◎', 'R') . ' ' . Step::color ('錯誤囉！', 'r') . Step::color ('請確認參數是否正確，分別需要', 'p') . ' ' . Step::color ('-b', 'W') . '、' . Step::color ('-a', 'W') . '、' . Step::color ('-s', 'W') . Step::color (' 的參數！', 'p') . ' ' . Step::color ('◎', 'R');
  echo "\n" . str_repeat ('=', 80) . "\n\n";
  exit ();
}

  define ('BUCKET', $bucket);
  define ('ACCESS', $access);
  define ('SECRET', $secret);

  // do {
  //   $pathLocal = Step::scanLocal ();
  //   $pathS3 = Step::scanS3 ();
  // } while (!Step::checkPath ($pathLocal, $pathS3));

  $pathLocal = '/Users/OA/Downloads/aa/';
  $pathS3 = 'a';

  include_once PATH_CMD_LIBS . 'S3' . PHP;
  Step::initS3 (ACCESS, SECRET, '=');
  
//   Step::listLocalFiles2 ($pathLocal, $pathS3);
//   Step::listS3Files2 ($pathS3);

//   $files = Step::filterLocalFiles2 ();
//   Step::uploadLocalFiles2 ($files);

//   $files = Step::filterS3Files2 ();
//   Step::deletwS3Files ($files);

// Step::usage ();
// Step::end ();
// function set_nested_array_value(&$array, $path, &$value, $delimiter = '/') {
//     $pathParts = explode($delimiter, $path);

//     $current = &$array;
//     foreach($pathParts as $key) {
//         $current = &$current[$key];
//     }

//     $backup = $current;
//     $current = $value;

//     return $backup;

// }$b = array (1,23);
// set_nested_array_value ($a, '123/324/435/123', $b);
// var_dump ($a, $b);
// exit ();

Step::listS3Files2 ('');

$arr = array_values (array_map (function ($t) {
  return array (
      'p' => explode ('/', pathinfo ($t['name'], PATHINFO_DIRNAME)),
      'n' => pathinfo ($t['name'], PATHINFO_BASENAME)
    );
}, Step::$s3Files));

$arr2 = array ();
foreach ($arr as $val) {
  $a = &$arr2;

  foreach ($val['p'] as $k) {
    if (!isset ($a[$k]))
      $a[$k] = array ();
    $a = &$a[$k];
  }
  array_push ($a, $val['n']);
}

var_dump (json_encode ($arr2));
exit ();

echo "\n";
exit ();



  