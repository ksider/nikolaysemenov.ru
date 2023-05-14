$.fn.exists = function(callback) {
  var args = [].slice.call(arguments, 1);
  if (this.length) {
    callback.call(this, args);
  }
  return this;
};

function getfile(link) {
    datafile = $.ajax({
        url: link,
        type: 'POST',
        cache: false,
        dataType: 'text',
        async: false,
        beforeSend: function() {
          //  console.log('начали');
        },
        complete: function(d) {
          //  console.log('Отправили');
        },
        success: function(data) {
            datafile = data;
        },
    }).responseText;
    
  //  console.log(link);
    
    return datafile;
}

function formatDate(date) {
  var dd = date.getDate();
  if (dd < 10) dd = '0' + dd;
  var mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;
  var yy = date.getFullYear();
  return dd + '.' + mm + '.' + yy;
}

function redate(d) {
   var msUTC = Date.parse(d);
   var date = new Date(d);
   return formatDate(date);
}

$(document).ready(function() {
   // num type	name	made_fate	date_start	date_end	strait	strait200	tear 	cure	shore

  var raw_data = 'https://script.googleusercontent.com/macros/echo?user_content_key=5Q00fsvrDgeZyfctYVQcsn-rlseD286XQAa6tWbCCH7j85r2N4gTOMUv95psNoHcTvWKpeih0b0PcA6RTVeSfRakXtK8qui7m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnKEpEzTkblsQteePG5lOseebVFqqfGhrrlIOaZTl5i6PJW-GmS5dkhEdsWwV1eVvYNpytj_A4aoE&lib=M3aQNyYVc2wc_fFEbkmbdFsw9OAkkSl61'; 
   
  
    var template = document.getElementById('template').innerHTML;  

    
$.getJSON(raw_data, function(data) {
        var opt = [];
        $.each(data.result, function(key, val) {
         
        type = val[1];
        dev = {}
        array = {
          num: val[0],
          date: redate(val[1]),
        };

       output = Mustache.render(template, array);
       $("#generate").append(output);    
    });
  });
    
    
});
    
    