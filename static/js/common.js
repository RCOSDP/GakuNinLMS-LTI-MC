$.ajaxSetup({
  cache: false
});

var content_new_page;
var content_edit_page;

var list_content_id;
var edit_content_id;
var edit_microcontent_id;

const itemInfo_checked = $item => {
  item = {};
  item.id = $item[0]['id'];
  item.name = $item[0]['name'];
  item.checked = $item[0]['checked'];
  return item;
};
const itemInfo_content_list = $item => {
  item = {};
  item.id = $item[0]['id'];
  item.title = $item[0]['name'];
  item.timemodified = $item[0]['timemodified'];
  item.uid = $item[0]['createdby'];
  return item;
};
const itemInfo_n = $item => {
  item = {};
  item.id = $item[0]['id'];
  item.title = $item[0]['name'];
  return item;
};
const itemInfo = $item => {
  item = {};
  item.id = $item[0]['id'];
  item.ctitle = $item[0]['cname'];
  return item;
};

const listInfo_level = (item) => {
	s = $('<input>');
	s.attr('id', 'level_'+item.id);
	s.attr('class', 'level');
	s.attr('type', 'checkbox');
	s.attr('value', item.id);
	if(item.checked == 'checked') s.attr('checked', item.checked);
	m = $('<label>');
	m.attr('for', 'level_'+item.id);
	m.append(item.name);
	l = $('<span>');
	l.attr('class', 'd-inline-block pr-3');
	l.append(s);
	l.append(m);
  return l;
};

const listInfo_task = (item) => {
	s = $('<input>');
	s.attr('id', 'task_'+item.id);
	s.attr('class', 'task');
	s.attr('type', 'checkbox');
	s.attr('value', item.id);
	if(item.checked == 'checked') s.attr('checked', item.checked);
	m = $('<label>');
	m.attr('for', 'task_'+item.id);
	m.append(item.name);
	l = $('<span>');
	l.attr('class', 'd-inline-block pr-3');
	l.append(s);
	l.append(m);
  return l;
};

const listInfo_skill = (item) => {
	s = $('<input>');
	s.attr('id', 'skill_'+item.id);
	s.attr('class', 'skill');
	s.attr('type', 'checkbox');
	s.attr('value', item.id);
	if(item.checked == 'checked') s.attr('checked', item.checked);
	m = $('<label>');
	m.attr('for', 'skill_'+item.id);
	m.append(item.name);
	l = $('<li>');
	l.append(s);
	l.append(m);
  return l;
};

const listInfo_subtitle = (item) => {
	s = $('<span>');
	s.attr('data-id', item.id);
	s.attr('data-title', item.ctitle);
	s.attr('data-ctitle', item.ctitle);
	s.append(item.ctitle);
	l = $('<li>');
	l.attr('data-id', item.id);
	l.append(s);
	l.append('<div class="toc-edit"><span class="oi oi-trash subtitle-trash" data-id="'+item.id+'" data-ctitle="'+item.ctitle+'"></span></div>');
  return l;
};

const listInfo_toc = (item) => {
	s = $('<span>');
	s.attr('class', 'list-text');
	s.attr('data-id', item.id);
	s.attr('data-title', item.ctitle);
	s.attr('data-ctitle', item.ctitle);
	s.append(item.ctitle);
	l = $('<li>');
	l.attr('data-id', item.id);
	l.append(s);
	l.append('<div class="toc-edit"><span class="oi oi-pencil" data-edit="false"></span><span class="oi oi-trash"></span></div>');
  return l;
};

const listInfo_n = (item,display,i,num) => {
	s = $('<span>');
	s.attr('class', 'list-text');
	s.attr('data-id', item.id);
	s.attr('data-title', item.title);
	s.attr('data-ctitle', item.title);
	s.append(item.title);
	l = $('<li>');
	l.attr('style', display);
	l.attr('data-id', item.id);
	l.attr('class', 'toc-group' + num);
	l.append(s);
	l.append('<div class="toc-edit"><span class="oi oi-pencil" data-edit="false"></span><span class="oi oi-trash"></span></div>');
  return l;
};
const listInfo = (item,display,i,num) => {
  s = $('<span>');
  s.attr('class', 'list-text');
  s.attr('data-id', item.id);
  s.attr('data-ctitle', item.ctitle);
  s.attr('data-value', i + 1);
  s.attr('id', i + 1);
  s.append(item.ctitle);
  l = $('<li>');
  l.attr('class', 'toc-group' + num);
  l.attr('style', display);
  l.attr('data-id', item.id);
  if(i != 0) l.attr('value', i + 1);
  return l.append(s);
};

function itemdisplay(i,num) {
        if (i !== 0) {
          if (i % 20 === 0) {
            display = 'display:none;';
            num = num + 1;
          }
        }
};
function pagination(num) {
      $('#pagination-here').bootpag({
        total: num,
        page: 1,
        maxVisible: 4,
        leaps: true,
      })
};

// player //

$('.main').on('click', '.list-text', function() {

  $('.list-area .active , .toc-area .active').each(function() {
    $(this).removeClass('active');
  });
  $e = $(this);
  $e.parent().addClass('active');
  microcontent_id = $e.data('id');

  if(typeof change_page == "function"){
    change_page('changepage',microcontent_id);
  }

  $.ajax({
    type: 'POST',
    data: {
      "microcontent_id": microcontent_id
    },
    url: LTI_URL + '/call/video_play.php',
    dataType: 'json'
  }).done((data) => {

	if(content_edit_page == 1){
		content_edit_page = 2;
	   	myPlayer.dispose();
		myPlayer = videojs('video_player_content_edit');
   	}
	if(content_new_page == 1){
		content_new_page = 2;
	   	myPlayer.dispose();
		myPlayer = videojs('video_player_content_new');
   	}
	if(content_edit_page >= 1 || content_new_page >= 1){
	  if(info.role == 'administrator' || data.createdby == info.uid){
	    $('#mcedit-update-area').html('<a href="#" class="oi oi-pencil" style="display: inline;" data-id="'+microcontent_id+'" data-name="'+data.name+'" data-uid="'+data.createdby+'"></a> <a href="#" class="oi oi-trash delete" style="display: inline;" data-id="'+microcontent_id+'" data-name="'+data.name+'" data-uid="'+data.createdby+'"></a>');
	  }else{
	    $('#mcedit-update-area').empty();
	  }
   	}

        $('.carousel-inner').data('value', $e.data('value'));
        $('.reuse-title').html($e.text());
        $('.item-cover').css('display','none');
      if (data.video) {
        info['video'] = data.video;
        info['videofile'] = data.videofile;
        info['videoquery'] = data.videoquery;
        $('.item-video').css('display','inline');
        myPlayer.poster();
		myPlayer.src({type: 'video/youtube', src: data.video});
		myPlayer.ready(function() {
		  myPlayer.pause();
		  myPlayer.currentTime(0);
		  myPlayer.play();
		});

		var oldTracks = myPlayer.remoteTextTracks();
		var i = oldTracks.length;
		while (i--) {
		  myPlayer.removeRemoteTextTrack(oldTracks[i]);
		}
	    if (data.tracks) {
	      $(data.tracks).each(function(i,v) {
			let track = {
			    kind: 'subtitles',
			    srclang: v.srclang,
			    label: v.label,
			    src: './track/' + microcontent_id + '_' + v.srclang + '.vtt'
			  };
			myPlayer.addRemoteTextTrack(track,false);
	      });
	    }
        $('.item-text').html(data.description);
      }
  }).fail((data) => {
    console.log('ng');
  }).always((data) => {});
});

// toc //

$('#pagination-here').on('page', function(event, num) {
  $('.list-area li').css('display', 'none');
  $('.toc-group' + num).css('display', 'list-item');
});

// content_view //

$('.carousel-control-prev').on('click', function() {
  $c = $('.carousel-inner');
  val = $c.data('value');
  prevPage = val - 1;
  $('#' + prevPage).click();
  if (val !== 0 && prevPage % 20 === 0) {
    $('.bootpag .prev a').click();
  }
  if (prevPage <= 0) {}
});

$('.carousel-control-next').on('click', function() {
  $c = $('.carousel-inner');
  val = $c.data('value');
  nextPage = val + 1;
  $('#' + nextPage).click();
  if (val !== 0 && val % 20 === 0) {
    $('.bootpag .next a').click();
  }
});

$('.item-cover button').on('click', function() {
  $c = $('.carousel-inner');
  val = $c.data('value');
  nextPage = val + 1;
  $('#' + nextPage).click();
  if (val !== 0 && val % 20 === 0) {
    $('.bootpag .next a').click();
  }
});

// competency_list //

$('.main').on('click', '#competency_new', function() {
  edit_content_id = 0;
  $('.main').load('competency_new.html');
});


$('.main').on('click', '#competency_list_area .oi-pencil', function() {
  $e = $(this);
  if(info.role == 'administrator' || $e.data('uid') == info.uid){
    edit_content_id = $e.data('id');
    $('.main').load('competency_edit.html');
  }else{
    alert('権限がありません');
    return;
  }
});

$('.main').on('click', '#competency_list_area .oi-trash', function() {
  $e = $(this);
  if(info.role == 'administrator' || $e.data('uid') == info.uid){
	  $f = $e.parent().parent();
	  id = $e.data('id');
	  title = $e.data('title');
	  if (window.confirm(title + " を削除しますか？")) {
	    $.ajax({
	      type: 'POST',
	      data: {
	        "content_id": id
	      },
	      url: LTI_URL + '/call/competency_delete.php'
	    }).done((data) => {
	      $f.remove();
	      alert(data);
	    }).fail((data) => {
	      console.log('ng');
	    }).always((data) => {});
	  }
  }else{
    alert('権限がありません');
    return;
  }
});


// content_list //

$('.main').on('click', '#content_list_area button', function() {
  $e = $(this);
  id = $e.data('id');
  title = $e.data('title');
  if (window.confirm(title + " を登録しますか？")) {
    $.ajax({
      type: 'POST',
      data: {
        "content_id": id,
        "resource_link_id": info.rid
      },
      url: LTI_URL + '/call/content_regist.php'
    }).done((data) => {
      alert(data);
    }).fail((data) => {
      console.log('ng');
    }).always((data) => {});
  }
});

$('.main').on('click', '#content_new', function() {
  edit_content_id = 0;
  $('.main').load('content_new.html');
});


$('.main').on('click', '#content_list_area .oi-pencil', function() {
  $e = $(this);
  if(info.role == 'administrator' || $e.data('uid') == info.uid){
    edit_content_id = $e.data('id');
    $('.main').load('content_edit.html');
  }else{
    alert('権限がありません');
    return;
  }
});


$('.main').on('click', '#content_list_area .oi-trash', function() {
  $e = $(this);
  if(info.role == 'administrator' || $e.data('uid') == info.uid){
	  $f = $e.parent().parent();
	  id = $e.data('id');
	  title = $e.data('title');
	  if (window.confirm(title + " を削除しますか？")) {
	    $.ajax({
	      type: 'POST',
	      data: {
	        "content_id": id
	      },
	      url: LTI_URL + '/call/content_delete.php'
	    }).done((data) => {
	      $f.remove();
	      alert(data);
	    }).fail((data) => {
	      console.log('ng');
	    }).always((data) => {});
	  }
  }else{
    alert('権限がありません');
    return;
  }
});

$('.main').on('click', '#windowclose', function() {
  window.open('about:blank','_self').close();
});


// content_edit //

$(document).on('keypress', '#search-key', function(e) {
  $e = $(this).next().children(':first');
  if (e.which == 13) {
    $('#search-exe').click();
  }
});
$(document).on('keypress', '.toc-form', function(e) {
  $f = $(this);
  $e = $(this).next().children(':first');
  if (e.which == 13) {
    $e.css('color', '');
    $e.data('edit', false);
    $f.replaceWith("<span class=\"list-text\" data-id=" + $f.data('id') + " data-title=" + $f.data('title') + " data-ctitle=" + $f.val() + ">" + $f.val() + "</span>");
  }
});
$(document).on('keypress', '#content_edit_title', function(e) {
  $e = $(this).next().children(':first');
  if (e.which == 13) {
    $('#content_edit_save').click();
    $('#content_edit_update').click();
  }
});

$('.main').on('click', '#search-exe', function() {
  $.ajax({
    type: 'POST',
    data: {
      keyword: $('#search-key').val()
    },
      url: LTI_URL + '/call/microcontent_search.php',
    dataType: 'json'
  }).done((data) => {
    $('#search-result').empty();
    num = 1;
    display = 'display:list-item;';
    if (data.contents) {
      $(data.contents).each(function(i) {
        $e = $(this);
        item = itemInfo_n($e);
        //itemdisplay(i,num);
        if (i !== 0) {
          if (i % 20 === 0) {
            display = 'display:none;';
            num = num + 1;
          }
        }
        list = listInfo_n(item,display,i,num);
        $('#search-result').append(list);
      });
      pagination(num);
    }
  }).fail((data) => {
    console.log('ng');
  }).always((data) => {});
});


$('.main').on('click', '#toc .oi-trash', function() {
  $e = $(this).parent().prev();
  $f = $e.parent();
  if (window.confirm($e.data('ctitle') + " を削除しますか？")) {
    $f.remove();
  }
});

$('.main').on('click', '#toc .oi-pencil', function() {
  $e = $(this);
  $f = $(this).parent().prev();
  if ($e.data('edit') == false) {
    $e.css('color', 'red');
    $e.data('edit', true);
    $f.replaceWith("<input type=\"text\" class=\"form-control form-control-sm toc-form\" data-id=" + $f.data('id') + " data-title=" + $f.data('title') + " data-ctitle=" + $f.text() + " value=" + $f.text() + "></input>");
  } else {
    $e.css('color', '');
    $e.data('edit', false);
    $f.replaceWith("<span class=\"list-text\" data-id=" + $f.data('id') + " data-title=" + $f.data('title') + " data-ctitle=" + $f.val() + ">" + $f.val() + "</span>");
  }
});

$('.main').on('click', '#content_edit_save', function() {
  book = {};
  contents = [];
  let title = $('#content_edit_title').val().trim();
  if (!title) title = 'no title';
  book.title = title;
  if (window.confirm(book.title + " で保存しますか？")) {
    $('.toc-area .list-text').each(function(i) {
      item = [];
      $e = $(this);
      item.push($e.data('id'));
      item.push($e.data('ctitle'));
      contents.push(item);
    });
    book.contents = contents;
    $.ajax({
      type: 'POST',
      data: JSON.stringify(book),
      url: LTI_URL + '/call/content_create.php'
    }).done((data) => {
		alert('作成しました');
    }).fail((data) => {
      console.log('ng');
    }).always((data) => {});
  }
});

$('.main').on('click', '#content_edit_update', function() {
  book = {};
  contents = [];
  let title = $('#content_edit_title').val().trim();
  if (!title) title = 'no title';
  book.title = title;
  book.id = edit_content_id;
  if (window.confirm("更新しますか？")) {
    $('.toc-area .list-text').each(function(i) {
      item = [];
      $e = $(this);
      item.push($e.data('id'));
      item.push($e.data('ctitle'));
      contents.push(item);
    });
    book.contents = contents;
    $.ajax({
      type: 'POST',
      data: JSON.stringify(book),
      url: LTI_URL + '/call/content_update.php'
    }).done((data) => {
		alert('更新しました');
    }).fail((data) => {
      console.log('ng');
		alert('更新失敗しました');
    }).always((data) => {});
  }
});

// microcontent_edit //

$('.main').on('click', '#microcontent_new', function() {
  myPlayer.pause();
  edit_microcontent_id = 0;
  $('#microcontentModal .modal-body').load('microcontent_new.html');
  $('#microcontentModal').modal('show');
});
$('#microcontentModal').on('hidden.bs.modal', function () {
microcontentPlayer.dispose();
})

$('.main').on('click', '#mcedit-update-area .oi-pencil', function() {
  $e = $(this);
  if(info.role == 'administrator' || $e.data('uid') == info.uid){
	  edit_microcontent_id = $e.data('id');
	  myPlayer.pause();
	  $('#microcontentModal .modal-body').load('microcontent_edit.html');
	  $('#microcontentModal').modal('show');
  }else{
    alert('権限がありません');
    return;
  }
});

$('.main').on('click', '#mcedit-update-area .oi-trash ', function() {
  $e = $(this);
  if(info.role == 'administrator' || $e.data('uid') == info.uid){
	  $f = $e.parent().parent();
	  id = $e.data('id');
	  name = $e.data('name');
	  title = $e.data('title');
	  myPlayer.pause();
	  if (window.confirm("元タイトル「"+ name + "」のマイクロコンテンツを削除しますか？")) {
	    $.ajax({
	      type: 'POST',
	      data: {
	        "microcontentid": id
	      },
	      url: LTI_URL + '/call/microcontent_delete.php'
	    }).done((data) => {
	      alert(data);
	    }).fail((data) => {
	      console.log('ng');
	    }).always((data) => {});
	  }
  }else{
    alert('権限がありません');
    return;
  }


});


function form_disabled(value) {
  $("#subtitle-file").prop("disabled", value);
  $("#preview").prop("disabled", value);
}


$('#microcontentModal').on('click', '#cancel', function() {
  microcontentPlayer.pause();
  microcontentPlayer.poster();
  $('#microcontentModal .middle-cell').css('display', 'inline');
  $('#microcontentModal .right-cell').css('display', 'none');
  $('#microcontentModal .edit_footer').css('display', 'inline');
  $('#microcontentModal .preview_footer').css('display', 'none');
});

$('#microcontentModal').on('click', '#preview', function() {
  if ($("#video-key").val() == '') {
    alert('動画IDを入力してください');
    return;
  }

  $('#microcontentModal .middle-cell').css('display', 'none');
  $('#microcontentModal .right-cell').css('display', 'inline');
  $('#microcontentModal .edit_footer').css('display', 'none');
  $('#microcontentModal .preview_footer').css('display', 'inline');

  if ($("#subtitle-file").val() !== '') {
    fd = new FormData();
    fd.append("file", $("#subtitle-file").prop("files")[0]);
     var postData = {
      url: LTI_URL + '/call/microcontent_subtitle.php',
      type: "POST",
      dataType: "text",
      data: fd,
      processData: false,
      contentType: false,
      beforeSend: function() {
        form_disabled(true);
        $("#uploader-status").text("アップロード中…");
      }
    };
    $.ajax(postData).done(function(data) {
      form_disabled(false);
      $("#uploader-status").text(data);
      // ファイル選択をクリアする
      //$("#subtitle-file").val("");
      vtt = data;
      data = [];
      data.video = $('#video-key').val();
     data.lang = $('#subtitle-lang').val();
     data.label = $('#subtitle-lang option:selected').text();
     if (data.video) {
        info['video'] = data.video;
        $('.microcontent-video').css('display', 'inline');
        microcontentPlayer.src({
          type: 'video/youtube',
          src: VIDEO_HOSTING + data.video
        });
        microcontentPlayer.ready(function() {
          microcontentPlayer.pause();
          microcontentPlayer.currentTime(0);
          microcontentPlayer.play();
        });
        var oldTracks = microcontentPlayer.remoteTextTracks();
        var i = oldTracks.length;
        while (i--) {
          microcontentPlayer.removeRemoteTextTrack(oldTracks[i]);
        }
          let track = {
            kind: 'subtitles',
            srclang: data.lang,
            label: data.label,
            src: './tmp/' + vtt
          };
          microcontentPlayer.addRemoteTextTrack(track);
        $('.microcontent-text').html(data.description);
      }
    }).fail(function(data) {
      $("#uploader-status").text("アップロードに失敗しました");
    });
  } else {
    data = [];
    data.video = $('#video-key').val();
    if (data.video) {
      info['video'] = data.video;
      $('.microcontent-video').css('display', 'inline');
      microcontentPlayer.src({
        type: 'video/youtube',
        src: VIDEO_HOSTING + data.video
      });
      microcontentPlayer.ready(function() {
        microcontentPlayer.pause();
        microcontentPlayer.currentTime(0);
        microcontentPlayer.play();
      });
      var oldTracks = microcontentPlayer.remoteTextTracks();
      var i = oldTracks.length;
      while (i--) {
        microcontentPlayer.removeRemoteTextTrack(oldTracks[i]);
      }
      $('.microcontent-text').html(data.description);
    }
  }
});


$('#microcontentModal').on('click', '#microcontent_edit_save', function() {
  book = {};

  let title = $('#microcontent-new-title').val().trim();
  if (!title) title = 'no title';
  book.title = title;

  if ($("#video-key").val() !== '') {
    book.video = $("#video-key").val();
  } else {
    alert('動画IDを入力してください');
    return;
  }
  book.description = $('#microcontent-new-description').val().trim();

	book.skill = $('.skill-list .skill:checked').map(function() {
	  return $(this).val();
	}).get();

	book.task = $('.task-list .task:checked').map(function() {
	  return $(this).val();
	}).get();

	book.level = $('.level-list .level:checked').map(function() {
	  return $(this).val();
	}).get();

 
  if ($("#subtitle-file").val() !== '') {
    book.lang = $("#subtitle-lang").val();
    fd = new FormData();
    fd.append("file", $("#subtitle-file").prop("files")[0]);
  }

  if (window.confirm(book.title + " で保存しますか？")) {
    $.ajax({
      type: 'POST',
      data: JSON.stringify(book),
      url: LTI_URL + '/call/microcontent_create.php'
    }).done((data) => {
  if (data !== 'no_subtitle') {
     fd.append("filename",data);
     var postData = {
     url: LTI_URL + '/call/microcontent_subtitle.php',
      type: "POST",
      dataType: "text",
      data: fd,
      processData: false,
      contentType: false,
      beforeSend: function() {
        form_disabled(true);
        $("#uploader-status").text("アップロード中…");
      }
    };
    $.ajax(postData).done(function(data) {
      form_disabled(false);
      $("#uploader-status").text(data);
	  $("#subtitle-file").val("");
	  $("#uploader-status").empty();
      alert('作成しました');
    }).fail(function(data) {
      $("#uploader-status").text("アップロードに失敗しました。");
    });
  }else{
      alert('作成しました');
  }
    }).fail((data) => {
      console.log('ng');
    }).always((data) => {});
  }
});



$('#microcontentModal').on('click', '#microcontent_edit_update', function() {
  book = {};
  let title = $('#microcontent-edit-title').val().trim();
  let id = edit_microcontent_id;
  if (!title) title = 'no title';
  book.title = title;
  book.id = id;
  if ($("#video-key").val() !== '') {
    book.video = $("#video-key").val();
  } else {
    alert('動画IDを入力してください');
    return;
  }
  book.description = $('#microcontent-edit-description').val().trim();

	book.skill = $('.skill-list .skill:checked').map(function() {
	  return $(this).val();
	}).get();

	book.task = $('.task-list .task:checked').map(function() {
	  return $(this).val();
	}).get();

	book.level = $('.level-list .level:checked').map(function() {
	  return $(this).val();
	}).get();

 
  if ($("#subtitle-file").val() !== '') {
    book.lang = $("#subtitle-lang").val();
    fd = new FormData();
    fd.append("file", $("#subtitle-file").prop("files")[0]);
  }

  if (window.confirm("更新しますか？")) {
    $.ajax({
      type: 'POST',
      data: JSON.stringify(book),
      url: LTI_URL + '/call/microcontent_update.php'
    }).done((data) => {

  if (data !== 'no_subtitle') {
     fd.append("filename",data);
     var postData = {
     url: LTI_URL + '/call/microcontent_subtitle.php',
      type: "POST",
      dataType: "text",
      data: fd,
      processData: false,
      contentType: false,
      beforeSend: function() {
        form_disabled(true);
        $("#uploader-status").text("アップロード中…");
      }
    };
    $.ajax(postData).done(function(data) {
      form_disabled(false);
      $("#uploader-status").text(data);
      // ファイル選択をクリアする
	  $("#subtitle-file").val("");
	  $("#uploader-status").empty();
      alert('更新しました');
    }).fail(function(data) {
      $("#uploader-status").text("アップロードに失敗しました。");
    });
  }else{
      alert('更新しました');
  }
    }).fail((data) => {
      console.log('ng');
    }).always((data) => {});
  }
});


$('#microcontentModal').on('click', '.subtitle-trash ', function() {
  $e = $(this);
  $f = $e.parent().parent();
  id = $e.data('id');
  title = $e.data('ctitle');
  if (window.confirm("字幕「"+ title + "」を削除しますか？")) {
    $.ajax({
      type: 'POST',
      data: {
        "subtitleid": id
      },
      url: LTI_URL + '/call/microcontent_subtitle_delete.php'
    }).done((data) => {
      alert(data);
      $f.remove();
    }).fail((data) => {
      console.log('ng');
    }).always((data) => {});
  }
});

$('#microcontentModal').on('click', '#reset', function() {
  $("#microcontent-new-title").val("");
  $("#microcontent-edit-title").val("");
  $("#video-key").val("");
  $("#microcontent-new-description").val("");
  $("#microcontent-edit-description").val("");
  $("#subtitle-file").val("");
  $("#subtitle-lang").val("ja");
  $("#uploader-status").empty();
  $(".competency-area input").prop('checked', false);
});


// content_preview //

$('.main').on('click', '#content_list_area .preview', function() {
  $e = $(this);
  list_content_id = $e.data('id');
  $('#contentModal .modal-body').load('content_view.html');
  $('#contentModal').modal('show');
});
$('#contentModal').on('hidden.bs.modal', function () {
  list_content_id = 0;
contentPlayer.dispose();
})

$('#contentModal').on('click', '.list-text', function() {

  if(typeof change_page == "function"){
    change_page('changepage',microcontent_id);
  }

  $('.list-area .active , .toc-area .active').each(function() {
    $(this).removeClass('active');
  });
  $e = $(this);
  $e.parent().addClass('active');
  microcontent_id = $e.data('id');
  $.ajax({
    type: 'POST',
    data: {
      "microcontent_id": microcontent_id
    },
    url: LTI_URL + '/call/video_play.php',
    dataType: 'json'
  }).done((data) => {


        $('.carousel-inner').data('value', $e.data('value'));
        $('.reuse-title').html($e.text());
        $('.item-cover').css('display','none');
      if (data.video) {
        info['video'] = data.video;
        info['videofile'] = data.videofile;
        info['videoquery'] = data.videoquery;
        $('.item-video').css('display','inline');
        contentPlayer.poster();
		contentPlayer.src({type: 'video/youtube', src: data.video});
		contentPlayer.ready(function() {
		  contentPlayer.pause();
		  contentPlayer.currentTime(0);
		  contentPlayer.play();
		});

		var oldTracks = contentPlayer.remoteTextTracks();
		var i = oldTracks.length;
		while (i--) {
		  contentPlayer.removeRemoteTextTrack(oldTracks[i]);
		}
	    if (data.tracks) {
	      $(data.tracks).each(function(i,v) {
			let track = {
			    kind: 'subtitles',
			    srclang: v.srclang,
			    label: v.label,
			    src: './track/' + microcontent_id + '_' + v.srclang + '.vtt'
			  };
			contentPlayer.addRemoteTextTrack(track,false);
	      });
	    }
        $('.item-text').html(data.description);
      }
  }).fail((data) => {
    console.log('ng');
  }).always((data) => {});
});

$('#contentModal').on('click', '.carousel-control-prev', function() {
  $c = $('#contentModal .carousel-inner');
  val = $c.data('value');
  prevPage = val - 1;
  $('#' + prevPage).click();
  if (val !== 0 && prevPage % 20 === 0) {
    $('#contentModal .bootpag .prev a').click();
  }
  if (prevPage <= 0) {}
});

$('#contentModal').on('click', '.carousel-control-next', function() {
  $c = $('#contentModal .carousel-inner');
  val = $c.data('value');
  nextPage = val + 1;
  $('#' + nextPage).click();
  if (val !== 0 && val % 20 === 0) {
    $('#contentModal .bootpag .next a').click();
  }
});

$('#contentModal').on('click', '.item-cover button', function() {
  $c = $('#contentModal .carousel-inner');
  val = $c.data('value');
  nextPage = val + 1;
  $('#' + nextPage).click();
  if (val !== 0 && val % 20 === 0) {
    $('#contentModal .bootpag .next a').click();
  }
});
