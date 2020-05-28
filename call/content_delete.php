<?php
require_once(__DIR__.'/../lti_session.php');

if (!$context->valid) {
  http_response_code(401);
  return;
}

$db = require(__DIR__.'/../database.php');

$time = time();
$uid = $context->getUserKey();

$content_id = $_POST['content_id'];

$db->prepare(<<<'SQL'
  UPDATE mc_content
  SET
    timemodified=:time, modifiedby=:uid, deleted=1
  WHERE
    id=:content_id
SQL)->execute([
  ':content_id' => $content_id, ':time' => $time, ':uid' => $uid]);

echo "ok";
