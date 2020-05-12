<?php 
require('../lti_session.php');

if ( $context->valid ) {

    $sql = "SELECT id,name FROM mc_skill";
    $stmt = $mysqli->query($sql);
    $skills = array();
    foreach ($stmt as $row) {
      $skill = array();
      $skill['id'] = $row['id'];
      $skill['name'] = $row['name'];
      array_push($skills,$skill);
    }

    $sql = "SELECT id,name FROM mc_task";
    $stmt = $mysqli->query($sql);
    $tasks = array();
    foreach ($stmt as $row) {
      $task = array();
      $task['id'] = $row['id'];
      $task['name'] = $row['name'];
      array_push($tasks,$task);
    }

    $sql = "SELECT id,name FROM mc_level";
    $stmt = $mysqli->query($sql);
    $levels = array();
    foreach ($stmt as $row) {
      $level = array();
      $level['id'] = $row['id'];
      $level['name'] = $row['name'];
      array_push($levels,$level);
    }

    $arr = array('skills' => $skills, 'tasks' => $tasks, 'levels' => $levels);
    echo json_encode($arr);
}
