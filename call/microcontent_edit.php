<?php 
require('../lti_session.php');

if ( $context->valid ) {

  $microcontent_id = $_POST['microcontent_id'];

  $sql = "SELECT name,video,description FROM mc_microcontent WHERE id = '".$microcontent_id."' AND deleted = 0";
  $stmt = $mysqli->query($sql);
  if($row = $stmt->fetch_assoc()){
    $content_name = $row['name'];
    $content_video = $row['video'];
    $content_description = $row['description'];

    $sql = "SELECT id,lang FROM mc_subtitle WHERE microcontentid = '".$microcontent_id."' AND deleted = 0 ORDER by lang";
    $stmt = $mysqli->query($sql);
    $subtitles = array();
    foreach ($stmt as $row) {
      $subtitle = array();
      $subtitle['id'] = $row['id'];
      $subtitle['cname'] = $row['lang'];
      array_push($subtitles,$subtitle);
    }

    $sql = "SELECT id,name FROM mc_skill";
    $stmt = $mysqli->query($sql);
    $sql = "SELECT skillid FROM mc_microcontent_skill WHERE microcontentid = '".$microcontent_id."'";
    $stmt2 = $mysqli->query($sql);
    $skills = array();
    foreach ($stmt as $row) {
      $skill = array();
      $skill['id'] = $row['id'];
      $skill['name'] = $row['name'];
      foreach ($stmt2 as $row2) {
        if($row['id'] == $row2['skillid']){
          $skill['checked'] = 'checked';
          break;
        }else{
          $skill['checked'] = '';
        }
      }
      array_push($skills,$skill);
    }

    $sql = "SELECT id,name FROM mc_task";
    $stmt = $mysqli->query($sql);
    $sql = "SELECT taskid FROM mc_microcontent_task WHERE microcontentid = '".$microcontent_id."'";
    $stmt2 = $mysqli->query($sql);
    $tasks = array();
    foreach ($stmt as $row) {
      $task = array();
      $task['id'] = $row['id'];
      $task['name'] = $row['name'];
      foreach ($stmt2 as $row2) {
        if($row['id'] == $row2['taskid']){
          $task['checked'] = 'checked';
          break;
        }else{
          $task['checked'] = '';
        }
      }
      array_push($tasks,$task);
    }

    $sql = "SELECT id,name FROM mc_level";
    $stmt = $mysqli->query($sql);
    $sql = "SELECT levelid FROM mc_microcontent_level WHERE microcontentid = '".$microcontent_id."'";
    $stmt2 = $mysqli->query($sql);
    $levels = array();
    foreach ($stmt as $row) {
      $level = array();
      $level['id'] = $row['id'];
      $level['name'] = $row['name'];
      foreach ($stmt2 as $row2) {
        if($row['id'] == $row2['levelid']){
          $level['checked'] = 'checked';
          break;
        }else{
          $level['checked'] = '';
        }
      }
      array_push($levels,$level);
    }

    $arr = array('title' => $content_name, 'video' => $content_video, 'description' => $content_description, 'subtitles' => $subtitles, 'skills' => $skills, 'tasks' => $tasks, 'levels' => $levels);
    echo json_encode($arr);
  }else{
    // microcontent not found 
  }
}
