<?php
require_once(__DIR__.'/lti_session.php');

if (!$context->valid) {
  header('Content-Type: text/html', true, 401);
  echo "<p style=\"color:red\">Could not establish context: ".htmlspecialchars($context->message)."<p>\n";
  return;
}

$db = require(__DIR__.'/database.php');

$resource_exists = $db->prepare(<<<'SQL'
  SELECT 1 FROM mc_resource
  WHERE
    resourcelinkid=? AND deleted=0
  LIMIT 1
SQL)->execute([$context->getResourceKey()]);

header('Content-Type: text/html');
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title><?= isset($title) ? htmlspecialchars($title) : ''; ?></title>
  <link href="static/img/favicon.ico" rel="icon" type="image/vnd.microsoft.icon">
  <link href="lib/jquery/jquery-ui.min.css" rel="stylesheet">
  <link href="lib/bootstrap/bootstrap.min.css" rel="stylesheet">
  <link href="lib/bootstrap/font/css/open-iconic-bootstrap.min.css" rel="stylesheet">
  <link href="lib/videojs/video-js.min.css" rel="stylesheet" />
  <link href="lib/videojs/videojs-seek-buttons.css" rel="stylesheet" />
  <link href="static/css/common.css" rel="stylesheet" type="text/css" />
  <link href="static/css/video.css" rel="stylesheet" type="text/css" />
</head>
<body>
  <div class="wrapper view-wrapper">
    <!-- head -->
    <div class="heading">
      <div class="modal-header">
        <ul class="list-inline nav"></ul>
        <div class="view-title" id="bookTitle"></div>
      </div>
    </div>
    <!-- main -->
    <div class="main">
    <?php if ($resource_exists): ?>
      <div style="height: 100%;">
        <table class="main-container">
          <tbody>
            <tr>
              <!-- toc -->
              <td class="middle-cell" id="toc">
                <div class="list-block">
                  <p id="pagination-here"></p>
                  <div class="list-div">
                    <ol class="list-area view-list" id="list"></ol>
                  </div>
                </div>
              </td>
              <!-- contents -->
              <td>
                <div class="page-switch-area">
                  <div class="carousel-control-prev page-switch-overlay-icon" data-slide="prev" role="button">
                    <span aria-hidden="true" class="carousel-control-prev-icon"></span> <span class="sr-only">Prev</span>
                  </div>
                </div>
              </td>
              <td class="right-cell">
                <div class="carousel-inner" data-value="0">
                  <div class="reuse-info">
                    <div class="reuse-title"></div>
                  </div>
                  <div class="item-info">
                    <div class="item-cover">
                      <button class="btn btn-secondary  btn-lg" type="button">視聴開始</button>
                    </div>
                    <div class="item-video" style="display:none;">
                      <video id="video_player" class="video-js vjs-default-skin vjs-big-play-centered" data-setup='{"controls": true, "autoplay": true, "preload": "auto","fluid": true,"playbackRates": [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],"nativeControlsForTouch": false}'></video>
                      <div class="item-text"></div>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div class="page-switch-area">
                  <div class="carousel-control-next page-switch-overlay-icon" data-slide="next" role="button">
                    <span aria-hidden="true" class="carousel-control-next-icon"></span> <span class="sr-only">Next</span>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    <?php else: ?>
      <div class="item-video" style="display:none;">
        <video id="video_player" class="video-js vjs-default-skin vjs-big-play-centered" data-setup='{"controls": true, "autoplay": true, "preload": "auto","fluid": true,"playbackRates": [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],"nativeControlsForTouch": false}'></video>
        <div class="item-text"></div>
      </div>
    <?php endif; ?>
    </div>
  </div>
<?php if ($context->isInstructor()): ?>
  <!-- modal -->
  <div aria-hidden="true" aria-labelledby="microcontentModal" class="modal fade" id="microcontentModal" role="dialog" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="microcontentModalTitle">マイクロコンテンツ編集</h5><button aria-label="閉じる" class="close" data-dismiss="modal" type="button"><span aria-hidden="true">&times;</span></button>
        </div>
        <div class="modal-body"></div>
      </div>
    </div>
  </div>
  <!-- modal -->
  <div aria-hidden="true" aria-labelledby="contentModal" class="modal fade" id="contentModal" role="dialog" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="contentModalTitle">プレビュー</h5><button aria-label="閉じる" class="close" data-dismiss="modal" type="button"><span aria-hidden="true">&times;</span></button>
        </div>
        <div class="modal-body"></div>
      </div>
    </div>
  </div>
<?php endif; ?>
  <script src="static/js/config.js"></script>
  <script>const info = <?= json_encode([
    'uid' => $context->getUserKey(),
    'role' => isAdministrator($context) ? 'administrator' : ''
  ]); ?>;</script>
  <script src="lib/jquery/jquery.min.js"></script>
  <script src="lib/jquery/jquery-ui.min.js"></script>
  <script src="lib/jquery/jquery.bootpag.min.js"></script>
  <script src="lib/bootstrap/bootstrap.min.js"></script>
  <script src="lib/videojs/video.min.js"></script>
  <script src="lib/videojs/videojs-seek-buttons.min.js"></script>
  <script src="lib/videojs/videojs.persistvolume.js"></script>
  <script src="lib/videojs/Youtube.min.js"></script>
  <script src="lib/mobile-detect.min.js"></script>
  <script src="static/js/check.js"></script>
  <script src="static/js/common.js"></script>
<?php if ($context->isInstructor()): ?>
  <script src="static/js/instructor.js"></script>
  <script src="static/js/video-instructor.js"></script>
  <link rel="stylesheet" href="lib/datatables/dataTables.bootstrap4.min.css"/>
  <script src="lib/datatables/jquery.dataTables.min.js"></script>
  <script src="lib/datatables/dataTables.bootstrap4.min.js"></script>
<?php else: ?>
  <script src="static/js/video-learner.js"></script>
<?php endif; ?>
<?php if (isAdministrator($context)): ?>
  <script src="static/js/administrator.js"></script>
<?php endif; ?>
  <script src="static/js/content_view.js"></script>
</body>
</html>
