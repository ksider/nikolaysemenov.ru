function ganerate() {
    var c_ar = [];
    var m_ar = [];
    $("#recipe").html('');
    
$(".raw_check:checkbox:checked").each(function () {
    var that = $(this);
    val_data = that.val();
    val_id = that.attr('id');
    val_data = JSON.parse(val_data);
    
    composite = val_data.composite; 
    ma = val_data.name;
    data = JSON.stringify(composite);
    array = {
            id: val_id,
            data: data,
            name: ma,
        };
    
   template = tpl_recipe;
   output = Mustache.render(template, array);
   $("#recipe").append(output);
    
    c_ar.push(composite); 
    m_ar.push(ma); 
 });
   
} 

function composite() {
    $.each(comp_materials, function (key, val) {
        
        data = val;
        data = JSON.stringify(data);
        
        array = {
            id: key,
            data: data,
            name: val.name,
        };
        template = '<div class="checkbox"><label for="comp_{{id}}"><input type="checkbox" value="{{data}}" id="comp_{{id}}" class="raw_check" /> {{name}}</label></div>';
      
        output = Mustache.render(template, array);
        $("#composite").append(output);
    }); 
}

function make_composite() {
   $('#fin_recip').html(' ');
    console.log( ' --- ' );
   
$.each( $(".makeArray"), function () { 
       that = $(this);
       collect_data = that.find('input.data').attr('value');
       count = that.find('input.count').attr('value');
       
       data_array = JSON.parse(collect_data);
       console.log( count );
        
        for (var key in data_array) {
          curc = data_array[key][0]['conc'];
          raw_name = data_array[key][0]['raw_name'];  

          curc = curc * count;  

         $('#fin_recip').append(raw_name +' '+ curc.toFixed(2)+'<br>');
        } 
});
    
    
  //  $('#fin_recip').html( JSON.stringify(ser) ); 

}

function multiplyNumeric(obj) {
  for (let key in obj) {
    if (typeof obj[key] == 'number') {
      obj[key] *= 2;
    }
  }
}