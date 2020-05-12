<?php 
require('../lti_session.php');

if ( $context->valid ) {

  $content_id = $_POST['content_id'];

  $sql = "SELECT name FROM mc_content WHERE id = '".$content_id."' AND deleted = 0";
  $stmt = $mysqli->query($sql);
  if($row = $stmt->fetch_assoc()){
    $content_name = $row['name'];

    $sql = "SELECT name,microcontentid FROM mc_toc WHERE contentid = '".$content_id."' ORDER by sort";
    $stmt = $mysqli->query($sql);
    $tocs = array();
    foreach ($stmt as $row) {
      $toc = array();
      $toc['id'] = $row['microcontentid'];;
      $toc['cname'] = $row['name'];;
      array_push($tocs,$toc);
    }

    $arr = array('title' => $content_name, 'contents' => $tocs);
    echo json_encode($arr);

  }else{
    // content not found 
  }
}
