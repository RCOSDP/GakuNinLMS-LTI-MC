<?php
require_once(__DIR__.'/../lti_session.php');

if (!$context->valid) {
  http_response_code(401);
  return;
}

$db = require(__DIR__.'/../database.php');

$uid = $context->getUserKey();
$time = time();

$microcontentid = $_POST['microcontentid'];

$db->prepare(<<<'SQL'
  UPDATE mc_microcontent
  SET
    timemodified=:time, modifiedby=:uid, deleted=1
  WHERE
    id=:microcontentid
SQL)->execute([
  ':microcontentid' => $microcontentid, ':time' => $time, ':uid' => $uid]);

echo "ok";
