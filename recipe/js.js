$(document).ready(function () {

    
    a = composite(raw, 0);
    ganerate();

    $(document).on('change', '.raw_check', 
    function () {
        getlist();
        ganerate();
    });    
    
    $(document).on('change', '#get_recipe', 
      function () {
       reciept(); 
    });


});


