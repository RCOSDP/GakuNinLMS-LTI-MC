content_new_page = 1;
content_edit_page = 0;
$("#content-list-view").removeClass("active");
$("#content-list-view").html("←戻る");
$("#pagination-here").on("page", function (event, num) {
  $(".list-area li").css("display", "none");
  $(".toc-group" + num).css("display", "list-item");
});
