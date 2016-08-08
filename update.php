<?php
/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2016 OA Wu Design
 */

http_response_code (405);


if (!(isset ($_POST['id']) && isset ($_POST['pokemon']) && is_numeric ($id = $_POST['id']) && is_numeric ($pokemon = $_POST['pokemon']))) {
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

$store->pokemon = $pokemon;

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
    'pokemon' => $store->pokemon ? $store->pokemon : 0
  ));