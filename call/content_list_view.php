<?php
require_once(__DIR__.'/../lti_session.php');

if (!$context->valid) return;

$db = require(__DIR__.'/../database.php');

$contents = array();
foreach ($db->query('SELECT * FROM mc_content WHERE deleted=0') as $row) {
  $content = array();
  $content['id'] = $row['id'];
  $content['name'] = $row['name'];
  $content['timemodified'] = date('Y/m/d H:i:s', $row['timemodified']);
  $content['createdby'] = $row['createdby'];
  array_push($contents, $content);
}

echo json_encode($contents);
