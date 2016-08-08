<?php
/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2016 OA Wu Design
 */

require_once __DIR__ . '/ActiveRecord.php';

ActiveRecord\Config::initialize(function($cfg) {
    $cfg->set_model_directory(__DIR__ . '/models');
    $cfg->set_connections(array('development' => 'mysql://root:xxx1963@127.0.0.1/test?charset=utf8'));
});