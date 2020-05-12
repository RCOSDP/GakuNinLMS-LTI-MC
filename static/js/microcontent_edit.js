microcontentPlayer = videojs('video_player_microcontent_edit');

$('#subtitle-lang').load('lang.html');

$.ajax({
  type: 'POST',
  data: {
    "microcontent_id": edit_microcontent_id
  },
  url: LTI_URL + 'call/microcontent_edit.php',
  dataType: 'json'
}).done((data) => {
  if (data) {
    $('#microcontent-edit-title').val(data.title);
    $('#video-key').val(data.video);
    $('#microcontent-edit-description').val(data.description);
    $(data.subtitles).each(function(i) {
      $e = $(this);
      item = itemInfo($e);
      list = listInfo_subtitle(item);
      $('.subtitle-list').append(list);
    });
	  if(isCompetency){
	    $(data.skills).each(function(i) {
	      $e = $(this);
	      item = itemInfo_checked($e);
	      list = listInfo_skill(item);
	      $('.skill-list').append(list);
	    });
	    $(data.tasks).each(function(i) {
	      $e = $(this);
	      item = itemInfo_checked($e);
	      list = listInfo_task(item);
	      $('.task-list').append(list);
	    });
	    $(data.levels).each(function(i) {
	      $e = $(this);
	      item = itemInfo_checked($e);
	      list = listInfo_level(item);
	      $('.level-list').append(list);
	    });
	  }else{
	    $('#microcontentModal .competency-area').css('display', 'none');
	  }
  }
}).fail((data) => {
  console.log('ng');
}).always((data) => {});


