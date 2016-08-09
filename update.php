<?php
/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2016 OA Wu Design
 */

http_response_code (405);


if (!(isset ($_POST['id']) && isset ($_POST['type']) && isset ($_POST['val']) && is_numeric ($id = $_POST['id']) && is_numeric ($val = $_POST['val']) && is_string ($type = $_POST['type']) && ($val >= 0))) {
  echo json_encode (array (
    'msg' => 'Post error!'
  ));
  return ;
}
require_once 'core.php';
if (!$store = Store::find ('one', array ('conditions' => array ('status = 1 AND id = ?', $id)))) {
  echo json_encode (array (
    'msg' => 'Store not found!'
  ));
  return ;
}

$column = 'pokemon_' . $type;
if (isset ($store->$column)) {
  $store->$column = $val;
  $store->pokemon = json_encode (array (
      'store' => $store->pokemon_store,
      'gym' => $store->pokemon_gym,
    ));
}

if (!$store->save ()) {
  echo json_encode (array (
    'msg' => 'Store save!'
  ));
  return ; 
}


http_response_code (200);
header ('Content-Type: application/json; charset=utf-8');
echo json_encode (array (
    'id' => $store->id,
    'name' => $store->name,
    'lat' => $store->latitude,
    'lng' => $store->longitude,
    'store' => $store->pokemon_store,
    'gym' => $store->pokemon_gym,
  ));