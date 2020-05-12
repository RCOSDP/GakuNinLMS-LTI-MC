$(".vjs-styles-dimensions").remove();
$('#search-result').sortable({
  connectWith: '.connected-sortable',
  forcePlaceholderSize: false,
  helper: function(e, li) {
    copyHelper = li.clone().insertAfter(li);
    return li.clone();
  },
  stop: function() {
    copyHelper && copyHelper.remove();
  }
});
$('.connected-sortable').sortable({
  receive: function(e, ui) {
    copyHelper = null;
    id = ui.item.data('id');
    $('#search-result [data-id=' + id + ']').css('background-color', '#f3f3f3');
  }
});