<?php 

if (isset($_FILES["file"]["tmp_name"]) && file_exists($_FILES["file"]["tmp_name"]))
{

	if($_POST['filename']){
		$uploadFolder = "../track/";
		$rnm = $_POST['filename'] . ".vtt";
	}else{
		$uploadFolder = "../tmp/";
		$nm = $_FILES["file"]["name"];
		$rnm = "";
		if (file_exists($uploadFolder . $nm))
		{
			$i = 1;
			$rnm = $nm;
			while (file_exists($uploadFolder . $rnm))
			{
				$info = pathinfo($nm);
				$rnm = $info["filename"] . "[". $i ."]" . "." . $info["extension"];
				$i++;
			}
		}else{
			$info = pathinfo($nm);
			$rnm = $info["filename"] . "." . $info["extension"];
		}
	}
	$uploadPath = $uploadFolder . ($rnm !== "" ? $rnm:$nm);
	if (@move_uploaded_file($_FILES["file"]["tmp_name"],$uploadPath) === true)
	{
		echo $rnm;
		return;
	}	
}
echo "アップロードに失敗しました";
?>