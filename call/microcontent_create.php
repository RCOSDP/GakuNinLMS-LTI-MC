<?php 
require('../lti_session.php');

if ( $context->valid ) {

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

	$sql = "INSERT INTO mc_microcontent (name,video,description,timecreated,timemodified,createdby,modifiedby) VALUES ('".$title."','".$video."','".$description."','".$time."','".$time."','".$uid."','".$uid."')";
	$mysqli->query($sql);
	$microcontentid = $mysqli->insert_id;

	foreach ($skill as $row) {
	  $sql = "INSERT INTO mc_microcontent_skill (microcontentid,skillid) VALUES ('".$microcontentid."','".$row[0]."')";
	  $mysqli->query($sql);
	}

	foreach ($task as $row) {
	  $sql = "INSERT INTO mc_microcontent_task (microcontentid,taskid) VALUES ('".$microcontentid."','".$row[0]."')";
	  $mysqli->query($sql);
	}

	foreach ($level as $row) {
	  $sql = "INSERT INTO mc_microcontent_level (microcontentid,levelid) VALUES ('".$microcontentid."','".$row[0]."')";
	  $mysqli->query($sql);
	}

	$lang = $arr['lang'];
    if($lang){
	  $sql = "INSERT INTO mc_subtitle (microcontentid,lang,timecreated,timemodified,createdby,modifiedby) VALUES  ('".$microcontentid."','".$lang."','".$time."','".$time."','".$uid."','".$uid."')";
	  $mysqli->query($sql);
		echo $microcontentid . "_" . $lang;
		return;
    }else{
		echo "no_subtitle";
		return;
    }



}else{
  // no context
}

