
  function filter_min(element) {
      var value = $(element).val();
      var maxvalue = $('#cenamax').val();
      console.log(value);
      $("#cars_list > li").each(function() {
        if(maxvalue != ""){
          if(parseInt($(this).attr('data-cena')) >= value && parseInt($(this).attr('data-cena')) <= maxvalue){
            $(this).show();
          } else {
            console.log(parseInt($(this).attr('data-cena')));
            $(this).hide();
          }
        } else {
           if(parseInt($(this).attr('data-cena')) >= value){
            $(this).show();
          } else {
            console.log(parseInt($(this).attr('data-cena')));
            $(this).hide();
          }
        } 
      });
  }

  function filter_max(element) {
      var value = $(element).val();
      var minvalue = $('#cenamin').val();
      console.log(value);
      $("#cars_list > li").each(function() {
        if(minvalue != ""){
          if(parseInt($(this).attr('data-cena')) <= value && parseInt($(this).attr('data-cena')) >= minvalue){
            $(this).show();
          } else {
            console.log(parseInt($(this).attr('data-cena')));
            $(this).hide();
          }
        } else {
            if(parseInt($(this).attr('data-cena')) <= value){
              $(this).show();
             } else {
              console.log(parseInt($(this).attr('data-cena')));
              $(this).hide();
            }
        }
      });
  }

$(document).ready( function(){

  $(".car").click(function(){
      if($(this).hasClass("selected"))
      {
        $(this).removeClass("selected");
      } else {
        $('li').removeClass("selected");
        $(this).addClass("selected");
        $('#id_car_id').val($(this).attr('data-id'));
      }
      $("#maps_place").attr('src','https://www.google.com/maps/embed/v1/place?key=AIzaSyA0cHSHoigfYxRi3du5cZsE6BTk5wxGQ0g&q='+ $(this).attr('data-miasto')+'+'+ $(this).attr('data-adres'));
  });

  $("#days").keydown(function(){
      var cost = parseInt($(this).attr('data-cena')) * parseInt($(this).val());
      $("#cost_final").html(cost);
  });

  $("#lpslide").change(function(){
    var value = $(this).val();
    $("#lpval").html(value);
      $("#cars_list > li").each(function() {
            if (parseInt($(this).attr('data-pokoje')) == parseInt(value)) {
                console.log(value);
                $(this).show();
            }
            else {
                $(this).hide();
            }
      });
  });

    $("#odlslide").change(function(){
    var value = $(this).val();
    $("#odlval").html(value);
  });


});



