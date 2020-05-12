<?php 
require('../lti_session.php');

if ( $context->valid ) {

	$uid = $context->getUserKey();
	$time = time();

	$json = file_get_contents('php://input');
	$arr = json_decode($json, true);
	$title = $arr['title'];

	$sql = "INSERT INTO mc_content (name,timecreated,timemodified,createdby,modifiedby) VALUES ('".$title."','".$time."','".$time."','".$uid."','".$uid."')";
	$mysqli->query($sql);
	$contentid = $mysqli->insert_id;

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

