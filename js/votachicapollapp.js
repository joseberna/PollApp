
$(function()
{	

	loadImages();

	var cupEmpty = "../img/copa_vacia.png";
	var cupFull = "../img/copa_full.png";

	var dataModel;
	var idCurrent;

	$('.copaVacia').click(clickImage);
	$('#votar').click(clickVote);	

	function clickImage(ev){
		
		ev.preventDefault();		

		var src = ev.target.src;
		var index = src.lastIndexOf("/");
		var img = src.substring(index + 1, src.length);

		idCurrent = Number(ev.target.id.substring(4,5));

		if (img == "copa_vacia.png") {		

			for (var i = idCurrent; i >= 1; i--) {

				$("#copa" + i).attr({
					src: cupFull
				});
			}
			
		};

		if (img == "copa_full.png") {			

			for (var i = idCurrent + 1; i <= 5; i++) {		

				$("#copa" + i).attr({
					src: cupEmpty
				});
			}

		};
		
	}

	function clickVote(){

		var idTransaction = getIdTransaccion();	
		var idUser = getIdUser();

		var sendData = {

			"contextRequest": {
				"applicationName": 'mobilePollapp',
				"idTransaction": idTransaction,
				"pageNumber": 0,
				"pageSize": 0,
				"userName": 'userMobilePollapp'
			},			
			"idModel": dataModel.id,
			"idUser": idUser,
			"score": idCurrent			

		};		

		var apiUrl = Servicios.voteByModel;

		$.ajax({ 
			url: apiUrl, 
			dataType: 'json', 
			contentType: 'application/json; charset=utf-8', 
			type: "POST", 
			data: JSON.stringify(sendData),
			success: function(data) {		   
				try {
					if(data.contextResponse !== undefined && data.contextResponse.transactionState) {
						
						$(".numVotosChica").text(data.score +  ' votos');

						alert('Gracias por tu voto');						

					} 
				} catch(e) {

				}

				onAjaxComplete();
			}, 
			error: function(xhr, ajaxOptions, thrownError) { 				

				var mensaje = xhr.responseJSON.error.message;

				console.log(mensaje);

				if (mensaje != undefined) {

					var indexInit = mensaje.indexOf(":");		 	

					mensaje = mensaje.substring(indexInit + 2, mensaje.length);

					alert($.trim(mensaje));

					return;

				}

				alert("Error: "+ + xhr.status);

				console.log("Error: "+ + xhr.status);
			},
			beforeSend: function( xhr ) {
				onAjaxLoad();
			},
			complete: function(xhr, textStatus ) {
				if(textStatus !== 'success') {
					onAjaxComplete();
				}
			}
		});

}


function loadImages()
{

	var list;
	var li;
	var keyStorage = "selectedModel";	
	var pathImgCloud = "http://pollappus.storage.googleapis.com/";

	list = $('.flicker-pollapp').children('ul').last();	

	if(localStorage.getItem(keyStorage) != null)
	{

		dataModel = JSON.parse(localStorage.getItem(keyStorage));	

		$(".numVotosChica").text(dataModel.score +  ' votos');	

		$.each(dataModel.picturesModel, function(i, val)
		{
			if (val.main == false) 
			{
				li = list.append('<li></li>').children('li').last();
				var picture = val.picture;

				li.data('background', (pathImgCloud + picture));					
			}

		});
	}

}

$('.volver-btn').click(function() {
        event.preventDefault(); 
        history.back(1); 
    });	

});