$(function(){

  var xhr;
  $("#searchCar").autocomplete({
    delay: 0,
    source: function( request, response ) {
      var regex = new RegExp(request.term, 'i');
      if(xhr){
        xhr.abort();
      }
      xhr = $.ajax({
		  headers: {
        'Accept': 'application/json',
        'Content-Type': 'text/plain'
    },
          url: "js/renault.json",
          dataType: "json",
		  crossDomain:true,
          cache: false,
          success: function(data) {
            response($.map(data, function(item) {
               if(regex.test(item.model)){
				    return {
                    label: item.model,
                    rejet: item.rejet,
                    carburant: item.carburant
                };
              }
            }));
          }
      });
    },
    minlength:1
  }).data( "ui-autocomplete" )._renderItem = function( ul, item ) {
		//console.log(item.label);
		return $( "<li></li>" ) 
		//.focus(function() { $(this).autocomplete();})
			.data( "ui-autocomplete-item", item )
			.append( "<a><strong>" + item.value + "</strong></a>" )
			.appendTo( ul );
		};
		});
  