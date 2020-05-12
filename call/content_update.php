<?php 
require('../lti_session.php');

if ( $context->valid ) {

	$time = time();
	$uid = $context->getUserKey();

	$json = file_get_contents('php://input');
	$arr = json_decode($json, true);
	$title = $arr['title'];
	$contentid = $arr['id'];

    $sql = "UPDATE mc_content SET name = '".$title."' , timemodified = '".$time."' ,  modifiedby = '".$uid."' WHERE id = '".$contentid."'";
    $mysqli->query($sql);

    $sql = "DELETE FROM mc_toc WHERE contentid = '".$contentid."'";
    $mysqli->query($sql);

	$i = 0;
	foreach ($arr['contents'] as $row) {
	  $sql = "INSERT INTO mc_toc (name,contentid,microcontentid,sort) VALUES ('".$row[1]."','".$contentid."','".$row[0]."','".$i."')";
	  $mysqli->query($sql);
	  $i++;
	}

	echo "ok";

}else{
  // no context
}

