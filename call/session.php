<?php
require_once(__DIR__.'/../lti_session.php');

if (!$context->valid) {
  http_response_code(401);
  return;
}

header('Content-Type: application/json');
echo json_encode([
  'id' => $context->getUserKey(),
  'role' => $context->isAdministrator()
    ? 'admin'
    :($context->isInstructor()
      ? 'instr'
      : '')
]);
