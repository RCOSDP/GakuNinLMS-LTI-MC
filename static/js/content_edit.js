content_new_page = 0;
content_edit_page = 1;
$("#content-list-view").removeClass("active");
$("#content-list-view").html("←戻る");
$("#pagination-here").on("page", function (event, num) {
  $(".list-area li").css("display", "none");
  $(".toc-group" + num).css("display", "list-item");
});

$.ajax({
  type: "POST",
  data: {
    content_id: edit_content_id,
  },
  url: LTI_URL + "call/content_edit.php",
  dataType: "json",
})
  .done((data) => {
    if (data) {
      $("#content_edit_title").val(data.title);
      $(data.contents).each(function (i) {
        $e = $(this);
        item = itemInfo($e);
        list = listInfo_toc(item);
        $(".toc-area").append(list);
      });
    }
  })
  .fail((data) => {
    console.log("ng");
  })
  .always((data) => {});
