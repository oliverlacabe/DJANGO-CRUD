$(function(){
    getdata("/getusers");
    $(document).on('click', '.btn_edit', function(){
        var lname = $(this).parent('td').siblings('td:eq(0)').text();
        var fname = $(this).parent('td').siblings('td:eq(1)').text();
        var mname = $(this).parent('td').siblings('td:eq(2)').text();

        $('#id_first_name').val(fname);
        $('#id_last_name').val(lname);
        $('#id_middle_name').val(mname);
        $('#hd_id').val($(this).data('id'));
    });

    $(document).on('submit', '#frmUsers', function(e){
        e.preventDefault();
        var first_name  = $('#id_first_name').val();
        var last_name   = $('#id_last_name').val();
        var middle_name = $('#id_middle_name').val();
        var uid         = $('#hd_id').val();
        if (first_name == "") {
            functions.alertBox('warning', 'Please enter firstname');
        }else if (last_name == "") {
            functions.alertBox('warning', 'Please enter lastname');
        }else if (middle_name == "") {
            functions.alertBox('warning', 'Please enter middlename');
        }else{
            var data        = {
                last_name:last_name,
                middle_name:middle_name,
                first_name:first_name,
                uid:uid
            }
            getdata("/saveuser", data);
        }
    })

    $(document).on('click', '.btn_delete', function(e){
        e.preventDefault();
        var data = {uid:$(this).data('id')}
        Swal({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
             getdata("/deleteuser", data);
          }
        })
    })

    $(document).on('click', '#btn_clear', function(e){
        functions.clear();
    })
})


function getdata(req_url, postData = {}){
    var csrftoken = $("[name=csrfmiddlewaretoken]").val();
    $.ajax({
        url : req_url,
        type : 'POST',
        data : postData,
        headers: { "X-CSRFToken": csrftoken },
        dataType: 'JSON',
        success : function(data){
            parseData(data);
            if (data != '[]') {
                switch (req_url) {
                    case '/saveuser':
                        var message = (postData.uid == '') ? "Successfully added a user" :  "Successfully updated a user" ;
                        break;
                    case '/deleteuser':
                        message = "Succesfully deleted a user";
                        break;
                    default:
                        var message = '';
                }
                functions.alertBox('success', message);
                functions.clear();
            }
        }
    });
}

function parseData(data){
    $('#tcontainer').empty();
    var html = '<table class="table table-bordered table-striped table-hover"><thead class="thead-dark">' +
                    '<tr>' +
                        '<th>Lastname</th>' +
                        '<th>Firstname</th>' +
                        '<th>Middlename</th>' +
                        '<th width="157px;">Action</th>' +
                    '</tr>' +
                '</thead>' +
                '<tbody id="trtbody">' +
                '</tbody><tfoot></tfoot></table>';
    $('#tcontainer').html(html);
    for (var i = 0; i < data.length; i++) {
        var user = data[i].fields
        var uid  = data[i].pk
        var html =  '<tr>' +
                    '<td>'+user.last_name+'</td>' +
                    '<td>'+user.first_name+'</td>' +
                    '<td>'+user.middle_name+'</td>' +
                    '<td>' +
                        '<button type="button" class="btn btn-outline-info btn_edit" id="btn_edit">Edit</button>&nbsp;' +
                        '<button type="button" class="btn btn-outline-danger btn_delete" id="btn_delete">Delete</button>' +
                    '</td>' +
                    '</tr>';
        $('#trtbody').append(html);
        $('#btn_edit').data('id', uid).removeAttr('id');
        $('#btn_delete').data('id', uid).removeAttr('id');

    }
    $('.table').DataTable();
}
