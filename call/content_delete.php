<?php 
require('../lti_session.php');

if ( $context->valid ) {

	$time = time();
	$uid = $context->getUserKey();

    $content_id = $_POST['content_id'];
    
    $sql = "UPDATE mc_content SET timemodified = '".$time."' ,  modifiedby = '".$uid."' , deleted = '1' WHERE id = '".$content_id."'";
    $mysqli->query($sql);

	echo "ok";

}else{
  // no context
}

