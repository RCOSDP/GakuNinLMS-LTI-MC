<?php
require_once(__DIR__.'/lib.php');
require_once(__DIR__.'/config.php');

// Load up the LTI Support code
require_once(__DIR__.'/ims-blti/blti.php');

use const Config\OAUTH_CONSUMERS;
use const Config\DB_HOST;
use const Config\DB_USERNAME;
use const Config\DB_PASSWORD;
use const Config\DB_DATABASE;

function blti_context(): BLTI {
    $index = NULL;
    $context = NULL;
    $oauth_consumer_keys = array_column(OAUTH_CONSUMERS, 'oauth_consumer_key');

    if (realpath($_SERVER['SCRIPT_FILENAME']) === __DIR__.'/index.php' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        $index = array_search($_POST['oauth_consumer_key'], $oauth_consumer_keys);
    } elseif (isset($_SESSION['_basic_lti_context']) && isset($_SESSION['_basic_lti_context']['oauth_consumer_key'])) {
        $index = array_search($_SESSION['_basic_lti_context']['oauth_consumer_key'], $oauth_consumer_keys);
    }

    if (is_int($index)) {
        // Initialize, all secrets are 'secret', do not set session, and do not redirect
        $context = new BLTI(OAUTH_CONSUMERS[$index]['oauth_signature'], true, false);
    } else {
        die("oauth_consumer_key not found");
    }

    return $context;
}

$mysqli = new mysqli(
    DB_HOST,
    DB_USERNAME,
    DB_PASSWORD,
    DB_DATABASE
);
if ($mysqli->connect_error) {
    die(htmlspecialchars("Connect Error ({$mysqli->connect_errno}) {$mysqli->connect_error}"));
}

//error_reporting(E_ALL & ~E_NOTICE);
//ini_set("display_errors", 1);
session_start();
header('Content-Type: text/html; charset=utf-8');

$context = blti_context();
