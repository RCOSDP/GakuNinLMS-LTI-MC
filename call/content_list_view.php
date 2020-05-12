<?php 
require('../lti_session.php');

if ( $context->valid ) {

    $sql = "SELECT * FROM mc_content WHERE deleted = 0";
    $stmt = $mysqli->query($sql);
    $contents = array();
    foreach ($stmt as $row) {
          $content = array();
          $content['id'] = $row['id'];
          $content['name'] = $row['name'];
          $content['timemodified'] = date('Y/m/d H:i:s', $row['timemodified']);
          $content['createdby'] = $row['createdby'];
          array_push($contents,$content);
    }
    echo json_encode($contents);

}
?>