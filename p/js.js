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
   
  
    var templateUTS = getfile('uts.php');  
    var templateASM = getfile('asm.php'); 
    var templateElectro = getfile('electro.php'); 
    var templateGist = getfile('gist.php'); 
    var templateRti = getfile('rti.php'); 

    $.getJSON(raw_data, function(data) {
        var opt = [];
        $.each(data.result, function(key, val) {
         
        type = val[1];

   if (type == 'utstru' || type == 'uts') {
           
           if (type == 'utstru') {
               dev = {
                   strait: 15,
                   strait200: 10,
                   tear: 10,
                   cure: 19,
                   shore: 40,
                   
                   execut: 'механических характеристик экспериментальных образцов эластомерных композитов',
                   pim: 'программой и методикой исследовательских испытаний механических характеристик экспериментальных образцов эластомерных композитов 02.2018.424.ПМ',                 
               }
           } else {
               dev = {
                   strait: 5,
                   strait200: 3,
                   tear: 10,
                   cure: 19.2,
                   shore: 10,
                   pim: 'программой и методикой исследовательских испытаний физико-механических свойств экспериментальных образцов резины 03.2018.721.ПМ',
                   execut: 'физико-механических свойств экспериментальных образцов резины'
               }
           }
           
           template = templateUTS; 
           array = {
               num: val[0],
               name: val[2],
               made_fate: redate(val[3]),
               date_start: redate(val[4]),
               date_end: redate(val[5]),
               strait: val[6],
               strait200: val[7],
               tear: val[8],
               cure: val[9],
               shore: val[10],
               
               dev_strait: dev.strait,
               dev_strait200: dev.strait200,
               dev_tear: dev.tear,
               dev_shore: dev.shore,
               
               pim: dev.pim,
               accept: val[11],
               execut: dev.execut,
           };
       } 
        
     
   else if ( type =='electro') {
           template = templateElectro;
           uvraw = val[8].split(' ');
           ucraw = val[9].split(' ');
       
           dev = {
               uvr: 'от 5 до 20',
               ucr: 'от 500',
               du:'20%',

               
               pim: 'программой и методикой испытаний электропроводности экспериментальных образцов эластомерных композитов  01.2019.450.ПМ',
               execut: 'электрических характеристик экспериментальных образцов эластомерных композитов'
            }
           array = {
               num: val[0],
               name: val[2],
               made_fate: redate(val[3]),
               date_start: redate(val[4]),
               date_end: redate(val[5]),
               
               uvr: val[6],
               ucr: val[7],
             //  du: val[8],
               raw_uvr: uvraw,
               raw_ucr: ucraw,
               
                
                
               pim: dev.pim,
               accept: val[11],
               execut: dev.execut,
               
               dev_uvr: dev.uvr,
               dev_ucr: dev.ucr,
               dev_du: dev.du,
           };       
    } 
            
   else if ( type == 'gist' ) {
       
       template = templateGist;
       
       console.log('template')
       
       dev = {
               relgist: '>5',
               relmodule: '>10',
               relforce: '300',
               velocity: '100',
               cycle: '5',
               monule:'50',

               
               pim: 'программой и методикой исследовательских испытаний экспериментальных образцов наполнителей резины методом атомно-силовой микроскопии 01.2018.356.ПМ',
               execut: 'механического гистерезиса экспериментальных образцов эластомерных композитов'
            }
       
       array = {
               num: val[0],
               name: val[2],
               made_fate: redate(val[3]),
               date_start: redate(val[4]),
               date_end: redate(val[5]),
               
           
               relgist: val[6],
               relmodule: val[7],
               relforce: val[8],
               velocity: val[9],
               cycle: val[10],
               module:val[12],
                
               pim: dev.pim,
               accept: val[11],
               execut: dev.execut,
               
                              
               dev_relgist: '>5',
               dev_relmodule: '>10',
               dev_relforce: '300',
               dev_velocity: '100',
               dev_cycle: '5',
               dev_monule:'50',
           };
   }
 
  else if ( type == 'rti' ) {
       
       template = templateRti;
       
       console.log('template')
       
       dev = {
               scru1: '10<sup>5</sup>',
               ldk1: '0.9',
           
               press2: '30',
               strain2: '<20',
               scru2: '10<sup>5</sup>',
               ldk2:'0.9',
           
               press3: '30',
               strain3: '<20',
               ldk3:'0.9',

               
               pim: '',
               execut: 'Определение комплекса свойств экспериментальных образцов РТИ'
            }
       
       array = {
               num: val[0],
               name: val[2],
               made_fate: redate(val[3]),
               date_start: redate(val[4]),
               date_end: redate(val[5]),
               
           
               scru1: val[6],
               ldk1: val[7],
           
               press2: val[8],
               strain2: val[9],
               scru2: val[10],
               ldk2:val[12],               
           
               press3: val[13],
               strain3: val[14],
               ldk3:val[15],
                
               pim: dev.pim,
               accept: val[11],
               execut: dev.execut,
               
                              
               dev_scru1: '10<sup>5</sup>',
               dev_ldk1: '0.9',
           
               dev_press2: '30',
               dev_strain2: '<20',
               dev_scru2: '10<sup>5</sup>',
               dev_ldk2:'0.9',
           
               dev_press3: '30',
               dev_strain3: '<20',
               dev_ldk3:'0.9',
           };
   }          
            
            
            
    else {} 
            
            
       $('#act').exists(function () {
        template = '<tr><td>{{name}}</td><td>{{num}}</td></tr>';
       }); 
       output = Mustache.render(template, array);
       $("#generate").append(output);    
     });

    });
    
    
});
    
    