<?php 
require('../lti_session.php');

if ( $context->valid ) {

    if (isset($_POST['event'])) {
        date_default_timezone_set('Asia/Tokyo');
        $arr = [
                'date' => date("Y-m-d"),
                'time' => date("H:i:s"),
                'tz' => date("T"),
                'event' => $_POST['event'],
                'detail' => $_POST['detail'],
                'file' => $_POST['file'],
                'query' => $_POST['query'],
                'current' => $_POST['current'],
                'ip' => $_SERVER['REMOTE_ADDR'],
                'ua' => $_SERVER['HTTP_USER_AGENT'],
                'rid' => $_POST['rid'],
                'uid' => $_POST['uid'],
                'cid' => $_POST['cid'],
                'nonce' => $_POST['nonce']
        ];
        foreach ($arr as $value) {
            $data .= e($value) . "	";
        }
        $data .= "videoplayerlog";
		syslog(LOG_INFO, rtrim($data));
    }
}
