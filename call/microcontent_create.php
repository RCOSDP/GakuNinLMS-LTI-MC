<?php
require_once(__DIR__.'/../lti_session.php');

if (!$context->valid) {
  http_response_code(401);
  return;
}

$db = require(__DIR__.'/../database.php');

$uid = $context->getUserKey();
$time = time();

$json = file_get_contents('php://input');
$arr = json_decode($json, true);
$title = $arr['title'];
$video = $arr['video'];
$description = $arr['description'];
$skill = $arr['skill'];
$task = $arr['task'];
$level = $arr['level'];

$db->prepare(<<<'SQL'
  INSERT INTO mc_microcontent
    (name, video, description, timecreated, timemodified, createdby, modifiedby)
  VALUES
    (:title, :video, :description, :time, :time, :uid, :uid)
SQL)->execute([
  ':title' => $title,
  ':video' => $video,
  ':description' => $description,
  ':time' => $time,
  ':uid' => $uid
]);

$microcontentid = $db->lastInsertId();

foreach ($skill as $row) {
  $db->prepare(<<<'SQL'
    INSERT INTO mc_microcontent_skill
      (microcontentid, skillid)
    VALUES
      (?, ?)
  SQL)->execute([
    $microcontentid, $row[0]]);
}

foreach ($task as $row) {
  $db->prepare(<<<'SQL'
    INSERT INTO mc_microcontent_task
      (microcontentid, taskid)
    VALUES
      (?, ?)
  SQL)->execute([
    $microcontentid, $row[0]]);
}

foreach ($level as $row) {
  $db->prepare(<<<'SQL'
    INSERT INTO mc_microcontent_level
      (microcontentid, levelid)
    VALUES
      (?, ?)
  SQL)->execute([
    $microcontentid, $row[0]]);
}

$lang = $arr['lang'];
if ($lang) {
  $db->prepare(<<<'SQL'
    INSERT INTO mc_subtitle
      (microcontentid, lang, timecreated, timemodified, createdby, modifiedby)
    VALUES
      (:microcontentid, :lang, :time, :time, :uid, :uid)
  SQL)->execute([
    ':microcontentid' => $microcontentid,
    ':lang' => $lang,
    ':time' => $time,
    ':uid' => $uid
  ]);

  http_response_code(201);
  echo "{$microcontentid}_{$lang}";
} else {
  http_response_code(400);
  echo "no_subtitle";
}
