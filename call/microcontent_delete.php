<?php 
require('../lti_session.php');

if ( $context->valid ) {

	$uid = $context->getUserKey();
	$time = time();
    $microcontentid = $_POST['microcontentid'];
    
    $sql = "UPDATE mc_microcontent SET timemodified = '".$time."' , modifiedby = '".$uid."' , deleted = '1' WHERE id = '".$microcontentid."'";
    $mysqli->query($sql);

	echo "ok";

}else{
  // no context
}

