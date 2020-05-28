<?php
require('../lti_session.php');

if (!$context->valid) {
  http_response_code(401);
  return;
}

// TODO: Unimplemented.
