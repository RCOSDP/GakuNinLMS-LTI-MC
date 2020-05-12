<?php 
require('../lti_session.php');

if ( $context->valid ) {

	$uid = $context->getUserKey();
	$time = time();
    $subtitleid = $_POST['subtitleid'];
    
    $sql = "UPDATE mc_subtitle SET timemodified = '".$time."' , modifiedby = '".$uid."' , deleted = '1' WHERE id = '".$subtitleid."'";
    $mysqli->query($sql);

	echo "ok";

}else{
  // no context
}

