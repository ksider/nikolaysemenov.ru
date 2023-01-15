var raw_materials = {
	    "0": "Целлюлоза",
        "1": "Гемицеллюлоза",
        "2": "Лигнин",
        "3": "Жиры/глицериды",
        "3": "Белки/протеин",
        "5": "Зола/неорганика",
        "6": "Крахмал",
        "7": "Моносахара",
        "8": "Альгинат натрия",
        "9": "Альгинвая кислота",
        "10": "Глицерин",
        "11": "ПЭГ",
        "12": "Триэтилцитрат",
        "13": "Лимонная кислота",
        "14": "Поликарбоновые кислоты",
        "15": "Ненасыщенные карбоновые кислоты",
        "16": "Карбонат кальция",
        "17": "Тальк",
        "18": "Диокисд кремния",
        "19": "Диоксид титана",
        "20": "Теобромин",
        "21": "Танин",
        "22": "Вода",
        "23": "Жиры"
};
var comp_materials = {
        "0": {
            "name": "Кора",
            "composite": [[{
                "raw_id": "0",
                "raw_name": "Целлюлоза",
                "conc": 0.51
            }], [{
                "raw_id": "2",
                "raw_name": "Лигнин",
                "conc": 0.33
            }], [{
                "raw_id": "3",
                "raw_name": "Белки/протеин",
                "conc": 0.03
            }], [{
                "raw_id": "5",
                "raw_name": "Зола/неорганика",
                "conc": 0.03
            }], [{
                "raw_id": "21",
                "raw_name": "Танин",
                "conc": 0.1
            }]]
        },
        "1": {
            "name": "Отработанное кофе",
            "composite": [[{
                "raw_id": "0",
                "raw_name": "Целлюлоза",
                "conc": 0.12
            }], [{
                "raw_id": "1",
                "raw_name": "Гемицеллюлоза",
                "conc": 0.39
            }], [{
                "raw_id": "2",
                "raw_name": "Лигнин",
                "conc": 0.24
            }], [{
                "raw_id": "3",
                "raw_name": "Белки/протеин",
                "conc": 0.17
            }], [{
                "raw_id": "5",
                "raw_name": "Зола/неорганика",
                "conc": 0.01
            }],[{
                "raw_id": "23",
                "raw_name": "Жиры",
                "conc": 0.02
            }]]
        },
        "2": {
            "name": "Кофейная шелуха",
            "composite": [[{
                "raw_id": "0",
                "raw_name": "Целлюлоза",
                "conc": 0.24
            }], [{
                "raw_id": "1",
                "raw_name": "Гемицеллюлоза",
                "conc": 0.17
            }], [{
                "raw_id": "2",
                "raw_name": "Лигнин",
                "conc": 0.29
            }], [{
                "raw_id": "3",
                "raw_name": "Белки/протеин",
                "conc": 0.19
            }], [{
                "raw_id": "5",
                "raw_name": "Зола/неорганика",
                "conc": 0.05
            }]]
    }, 
    "3": {
        "name": "Кокаошелуха",
        "composite": [[{
            "raw_id": "0",
            "raw_name": "Целлюлоза",
            "conc": 0.45
        }], [{
            "raw_id": "3",
            "raw_name": "Белки/протеин",
            "conc": 0.14
        }], [{
            "raw_id": "14",
            "raw_name": "Поликарбоновые кислоты",
            "conc": 0.01
        }], [{
            "raw_id": "20",
            "raw_name": "Теобромин",
            "conc": 0.02
        }], [{
            "raw_id": "22",
            "raw_name": "Вода",
            "conc": 0.1
        }], [{
            "raw_id": "23",
            "raw_name": "Жиры",
            "conc": 0.03
        }]]
    }
};

function getLS(a) {
    return JSON.parse(localStorage.getItem(a));
}
function addDataList(ls, val) {
    localStorage.setItem(ls, val);
}
function delAll() {
     localStorage.removeItem('mix');
}
function unique(arr) {
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        var str = arr[i];
        obj[str] = true;
    }
    return Object.keys(obj); 
}

function raw() {
    raw_data = [];
    ammount = 0;
    
   $.each(comp_materials, function (key, val) {
        data = {
            "name": val.name,
            "fid" : ammount,
            "composite": val.composite
        };
      raw_data.push(data);
      ammount++;  
    });
    
    $.each(raw_materials, function (key, val) {
        data = {
            "name": val,
            "fid" : ammount,
            "composite": [[{
                "raw_id": key,
                "raw_name": val,
                "conc": 1,
            }]]
        };
      raw_data.push(data);
      ammount++;  
    }); 
    return raw_data;  
}
raw = raw();



function addRawtoLS(id) {
    var getLs = getLS('mix');
    list = getLs || Array();
    list.push(id);
    
    un = unique(list);
    un = JSON.stringify(un);
    addDataList('mix', un);
    return list;
}


function addSelect(id) {
    var getLs = getLS('count');
    list = getLs || Object();
    
    newop = $.extend(list, id);
    
    un = JSON.stringify(newop);
    addDataList('count', un);
    
   console.log(un);

    return list;
}

function getlist() {
    delAll();
    raw_list = $('.raw_check:checkbox:checked');
    list = {};
    
 raw_list.each(function(i) {  
     
    var that = $(this);
    val_data = that.val();
    val_id = that.attr('id');
    
    list[val_id] = $(this).val();
    addRawtoLS(list[val_id]);
 
  });
   
    return list;
}



var tpl_raw = '<div class="checkbox"><label for="comp_{{id}}"><input type="checkbox" value="{{data}}" id="comp_{{id}}" data-pid="{{amount}}" class="raw_check" {{checked}} /> {{name}}({{amount}})</label></div>';


function composite(data, amount) {
    count_arr = getLS('count')  || Object();
    
    $.each(data, function (key, val) {
        checked = 'none';
        data = val;
        data = JSON.stringify(data);
        
       if (count_arr[val.name]) {
           checked = "checked"; 
        } else {
            checked = " ";
        }
        
        array = {
            id: key,
            data: data,
            name: val.name,
            checked : checked,
            amount : amount
        };
        template = tpl_raw;
      
        output = Mustache.render(template, array);
        $("#composite").append(output);
        amount++;
    });
    return amount;
}


var tpl_recipe = '<div class="row makeArray"  id="f_{{amount}}" ><div class="col-md-9"><label>{{name}}</label></div><div class="col-md-3"><input type="hidden" name="data" class="data" value="{{data}}"> <input type="text" name="count" class="form-control count" value="{{value}}"></div></div>';

function ganerate() {

    $("#recipe").html('');
    get_data = getLS('mix');
    count_arr = getLS('count');

    
    $.each(get_data, function (key, val) {
        val = JSON.parse(val);

        composite = val.composite; 
       
        ma = val.name;
        mamount = val.fid;
        data = JSON.stringify(composite);
        
        if (count_arr[ma]) {
           counts = count_arr[ma]; 
           console.log(counts);
        } else {
            counts = 1;
        }
        
        array = {
              // id: val_id,
              amount: mamount,  
              data: data,
              name: ma,
              value: counts
           };

       template = tpl_recipe;
       output = Mustache.render(template, array);
       $("#recipe").append(output);

     });
    
    reciept();
} 

function reciept() {
$('#fin_recip').html(' ');
get_data = getLS('mix');
new_array = {};    
SaveCount = {};    
var weight = 0;
    
    $.each(get_data, function (key, val) {
        
        val = JSON.parse(val);
        composite = val.composite; 

        mamount = val.fid;
        name = val.name;
        count = $("#f_"+mamount+" input.count").val(); 
        
        SaveCount[name] = count;
         
    $.each(composite, function (key, val) {        
        ma = val[0].raw_name;
        inner = val[0].conc * count;
        
        if (!new_array[ma]) {
          new_array[ma] = +inner;
        } else {
          cur = new_array[ma]; 
          new_array[ma] = +inner + +cur;  
        }
        
        weight = +weight + +inner;
        console.log(weight);
       });
   
    });
    
  $.each(new_array, function (key, val) {
    
      percent = (val / weight)*100;
      
      Tr_row = "<tr><td>"+key+"</td><td>"+val.toFixed(2)+"</td><td>"+percent.toFixed(1)+"%</td></tr>"
      
      $('#fin_recip').append(Tr_row);
  });
    
    addSelect(SaveCount);   
    
}
