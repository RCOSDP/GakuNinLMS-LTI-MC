<?php 
require('../lti_session.php');

if ( $context->valid ) {

	include '../lang.php';
    $microcontent_id = $_POST['microcontent_id'];

    $sql = "SELECT name,video,description,createdby FROM mc_microcontent WHERE id = '".$microcontent_id."' AND deleted = 0";
    $stmt = $mysqli->query($sql);
    if($row = $stmt->fetch_assoc()){
    
    
      $name = $row['name'];
      $video = $row['video'];
      $link = "//www.youtube.com/watch?v=".$video;
      $videoquery = "v=".$video;
      $description = $row['description'];
      $createdby = $row['createdby'];
      
      $sql = "SELECT lang FROM mc_subtitle WHERE microcontentid = '".$microcontent_id."' AND deleted = 0";
      $stmt = $mysqli->query($sql);
      $tracks = array();
      foreach ($stmt as $row) {
          $track = array();
          $track['srclang'] = $row['lang'];
	      foreach ($lang as $v) {
	          if($v[code] == $track['srclang']) {
	              $track['label'] = $v[name];
	          }
	      }
          array_push($tracks,$track);
      }

      //$arr = array('name' => $name , 'video' => $video , 'description' => $description ,  'createdby' => $createdby , 'tracks' => $tracks);
      $arr = array('name' => $name , 'video' => $link , 'videofile' => $video , 'videoquery' => $videoquery , 'description' => $description ,  'createdby' => $createdby , 'tracks' => $tracks);
      echo json_encode($arr);
    }else{
      // microcontent not found 
      echo "no_microcontent";
    }
}
?>