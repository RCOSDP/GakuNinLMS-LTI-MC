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
	$microcontentid = $arr['id'];

    $sql = "UPDATE mc_microcontent SET name = '".$title."' , video = '".$video."' , description = '".$description."' , timemodified = '".$time."' , modifiedby = '".$uid."' WHERE id = '".$microcontentid."'";
	$mysqli->query($sql);

    $sql = "DELETE FROM mc_microcontent_skill WHERE microcontentid = '".$microcontentid."'";
    $mysqli->query($sql);
	foreach ($skill as $row) {
	  $sql = "INSERT INTO mc_microcontent_skill (microcontentid,skillid) VALUES ('".$microcontentid."','".$row[0]."')";
	  $mysqli->query($sql);
	}

    $sql = "DELETE FROM mc_microcontent_task WHERE microcontentid = '".$microcontentid."'";
    $mysqli->query($sql);
	foreach ($task as $row) {
	  $sql = "INSERT INTO mc_microcontent_task (microcontentid,taskid) VALUES ('".$microcontentid."','".$row[0]."')";
	  $mysqli->query($sql);
	}

    $sql = "DELETE FROM mc_microcontent_level WHERE microcontentid = '".$microcontentid."'";
    $mysqli->query($sql);
	foreach ($level as $row) {
	  $sql = "INSERT INTO mc_microcontent_level (microcontentid,levelid) VALUES ('".$microcontentid."','".$row[0]."')";
	  $mysqli->query($sql);
	}

	$lang = $arr['lang'];
    if($lang){

      $sql = "SELECT id,lang FROM mc_subtitle WHERE microcontentid = '".$microcontentid."' AND lang = '".$lang."'";
      $stmt = $mysqli->query($sql);
      if($row = $stmt->fetch_assoc()){
         $subtitle_id = $row['id'];
		  $sql = "UPDATE mc_subtitle SET timemodified = '".$time."' , modifiedby = '".$uid."' , deleted = '0' WHERE id = '".$subtitle_id."'";
		  $mysqli->query($sql);
      }else{
		  $sql = "INSERT INTO mc_subtitle (microcontentid,lang,timecreated,timemodified,createdby,modifiedby) VALUES  ('".$microcontentid."','".$lang."','".$time."','".$time."','".$uid."','".$uid."')";
		  $mysqli->query($sql);
      }
	  echo $microcontentid . "_" . $lang;
	  return;
    }else{
		echo "no_subtitle";
		return;
    }



}else{
  // no context
}

