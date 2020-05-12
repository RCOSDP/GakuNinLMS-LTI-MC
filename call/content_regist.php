<?php 
require('../lti_session.php');

if ( $context->valid ) {

	$time = time();
	$uid = $context->getUserKey();

    $content_id = $_POST['content_id'];
    $resource_link_id = $_POST['resource_link_id'];
	
    $sql = "SELECT id FROM mc_resource WHERE resourcelinkid = '".$resource_link_id."' AND deleted = 0";
    $stmt = $mysqli->query($sql);
    if($row = $stmt->fetch_assoc()){
      $resource_id = $row['id'];
      $sql = "UPDATE mc_resource SET contentid = '".$content_id."' , timemodified = '".$time."' ,  modifiedby = '".$uid."' WHERE id = '".$resource_id."'";
      $mysqli->query($sql);
	echo "update";
    }else{
	  $sql = "INSERT INTO mc_resource (resourcelinkid,contentid,timecreated,timemodified,createdby,modifiedby) VALUES ('".$resource_link_id."','".$content_id."','".$time."','".$time."','".$uid."','".$uid."')";
	  $mysqli->query($sql);
	echo "new";
    }

}else{
  // no context
}

