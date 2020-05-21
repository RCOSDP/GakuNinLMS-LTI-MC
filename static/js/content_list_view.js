$.ajax({
  type: "GET",
  url: LTI_URL + "/call/content_list_view.php",
  dataType: "json",
})
  .done((data) => {
    $(data).each(function (i) {
      $e = $(this);
      item = itemInfo_content_list($e);
      tr = $("<tr>");
      tr.append(
        '<td scope="col" style="width: 55%;"><a href="#" class="preview" data-id="' +
          item.id +
          '" data-title="' +
          item.title +
          '">' +
          item.title +
          "</a></td>"
      );
      tr.append(
        '<td scope="col" style="width: 22%;"><span style="font-size: small;">' +
          item.timemodified +
          "</span></td>"
      );
      tr.append(
        '<td scope="col" style="width: 13%;"><button type="button" class="btn btn-primary" data-id="' +
          item.id +
          '" data-title="' +
          item.title +
          '">登録する</button></td>'
      );
      if (info.role == "administrator" || item.uid == info.uid) {
        tr.append(
          '<td scope="col" style="width: 10%;"> <span class="oi oi-pencil" style="display: inline;" data-id="' +
            item.id +
            '" data-title="' +
            item.title +
            '" data-uid="' +
            item.uid +
            '"></span>  <span class="oi oi-trash" style="display: inline;"data-id="' +
            item.id +
            '" data-title="' +
            item.title +
            '" data-uid="' +
            item.uid +
            '"></span></td>'
        );
      } else {
        tr.append('<td scope="col" style="width: 10%;"></td>');
      }
      $("#content_list_area").append(tr);
    });

    $(function () {
      $("#table1").DataTable({
        language: {
          sEmptyTable: "テーブルにデータがありません",
          sInfo: " _TOTAL_ 件中 _START_ から _END_ まで表示",
          sInfoEmpty: " 0 件中 0 から 0 まで表示",
          sInfoFiltered: "（全 _MAX_ 件より抽出）",
          sInfoPostFix: "",
          sInfoThousands: ",",
          sLengthMenu: "_MENU_ 件表示",
          sLoadingRecords: "読み込み中...",
          sProcessing: "処理中...",
          sSearch: "検索:",
          sZeroRecords: "一致するレコードがありません",
          oPaginate: {
            sFirst: "先頭",
            sLast: "最終",
            sNext: "次",
            sPrevious: "前",
          },
          oAria: {
            sSortAscending: ": 列を昇順に並べ替えるにはアクティブにする",
            sSortDescending: ": 列を降順に並べ替えるにはアクティブにする",
          },
        },
        columnDefs: [
          {
            targets: [2, 3],
            orderable: false,
          },
        ],
        dom:
          "<'row'<'col-sm-2'l><'col-sm-4'f><'col-sm-6 right'p>>" +
          "<'row'<'col-sm-12'tr>>" +
          "<'row'<'col-sm-12'i>>",
        initComplete: function (settings, json) {
          $(".main-container tbody").css("display", "");
        },
      });
    });
  })
  .fail((data) => {
    console.log("ng");
  })
  .always((data) => {});

$("#bookTitle").empty();
$("#content-list-view").html("LMSへの登録");
