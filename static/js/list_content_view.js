contentPlayer = videojs("video_player_content_preview");
$.ajax({
  type: "POST",
  data: {
    content_id: list_content_id,
  },
  url: LTI_URL + "/call/list_content_view.php",
  dataType: "json",
})
  .done((data) => {
    $("#contentModal .modal-title").text(data.title);
    //$('.carousel-inner').html('<div class="cover"><span>' + data.title + '</span></div>');
    num = 1;
    display = "display:list-item;";
    if (data.contents) {
      $(data.contents).each(function (i) {
        $e = $(this);
        item = itemInfo($e);
        //itemdisplay(i,num);
        if (i !== 0) {
          if (i % 20 === 0) {
            display = "display:none;";
            num = num + 1;
          }
        }
        list = listInfo(item, display, i, num);
        $("#contentModal #list").append(list);
      });
      pagination(num);
    }
  })
  .fail((data) => {
    console.log("ng");
    //$('.carousel-inner').html('<div class="cover"><span>未選択</span></div>');
  })
  .always((data) => {});

$("#pagination-here").on("page", function (event, num) {
  $(".list-area li").css("display", "none");
  $(".toc-group" + num).css("display", "list-item");
});
