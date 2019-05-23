var functions = {
  clear: function(){
      $('#id_first_name').val('');
      $('#id_last_name').val('');
      $('#id_middle_name').val('');
      $('#hd_id').val('');
  },
  alertBox: function(type, message){
      if (message != '') {
          Swal({
            type: type,
            title: message,
            showConfirmButton: false,
            timer: 1500
          })
      }
  }
}
