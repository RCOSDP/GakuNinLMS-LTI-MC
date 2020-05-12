$('.list-inline').append('<li class="list-inline-item nav-item"><a id="content-list-view" class="nav-link" href="#">LMSへの登録</a></li>');

$('#content-list-view').on('click', function() {
  $('.main').load('content_list_view.html');
  $('#competency-list-view').removeClass('active');
  $(this).addClass('active');
});
