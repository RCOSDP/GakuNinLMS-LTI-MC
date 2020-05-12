<?php 
require('../lti_session.php');

if ( $context->valid ) {

    $keyword = $_POST['keyword'];

    $sql = "SELECT name,id FROM mc_microcontent WHERE (name like '%".$keyword."%' OR description like '%".$keyword."%') AND deleted = 0 ";
    $stmt = $mysqli->query($sql);
    $tocs = array();
    foreach ($stmt as $row) {
      $toc = array();
      $toc['id'] = $row['id'];;
      $toc['name'] = $row['name'];;
      array_push($tocs,$toc);
    }
    $arr = array('title' => $keyword, 'contents' => $tocs);
    echo json_encode($arr);
}
?>