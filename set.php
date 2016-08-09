<?php
/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2016 OA Wu Design
 */

if (!function_exists ('write_file')) {
  function write_file ($path, $data, $mode = 'wb') {
    if (!$fp = @fopen ($path, $mode)) return false;

    flock($fp, LOCK_EX);
    fwrite($fp, $data);
    flock($fp, LOCK_UN);
    fclose($fp);

    return true;
  }
}

http_response_code (405);
if (!(isset ($_POST['id']) && isset ($_POST['lat']) && isset ($_POST['id']) && isset ($_POST['lng']) && is_numeric ($id = $_POST['id']) && is_numeric ($lat = $_POST['lat']) && is_numeric ($lng = $_POST['lng']))) {
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

$path = 'app/pokemonLocation.gpx';
$content = '<gpx creator="Xcode" version="1.1"><wpt lat="' . $lat . '" lon="' . $lng . '"><name>PokemonLocation</name></wpt></gpx>';
if (!write_file ($path, $content)) {
  echo json_encode (array (
    'msg' => 'write file error!'
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