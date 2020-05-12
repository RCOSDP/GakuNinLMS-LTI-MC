<?php
//var_dump($_POST);

require_once(__DIR__.'/config.php');

// Load up the LTI Support code
require_once(__DIR__.'/ims-blti/blti.php');

//error_reporting(E_ALL & ~E_NOTICE);
//ini_set("display_errors", 1);
session_start();
header('Content-Type: text/html; charset=utf-8'); 

$result = array_search($_POST['oauth_consumer_key'], array_column($consumer_list, 'oauth_consumer_key'));
if ( $result !== false ) {
    $consumer_target = $consumer_list[$result];
}else{
    die("oauth_consumer_key not found");
}

// Initialize, all secrets are 'secret', do not set session, and do not redirect
$context = new BLTI($consumer_target['oauth_signature'], true, false);

