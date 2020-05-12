<?php

function h($str) {
    return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
}

function e($str) {
    if(empty($str) && $str !== "0"){
        return "-";
    }else{
        return $str;
    }
}

function isAdministrator($context) {
    $roles = $context->info['roles'];
    $roles = strtolower($roles);
    if ( ! ( strpos($roles,"administrator") === false ) ) return true;
    return false;
}
