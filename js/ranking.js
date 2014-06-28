$( document ).ready(function() {

	var Request = new function () {
		/// <summary>
		/// Obtiene parámetros de distintas fuentes.
		/// </summary>
		var params = [];
		var query = window.location.search.substring(1);
		query = unescape(query);
		var vars = query.split("&");
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			params[pair[0]] = pair[1];
		}

		/// <summary>
		/// Obtiene los parámetros desde el QueryString
		/// </summary>
		this.Params = params;
	};

	console.log('Request.Params>>', Request.Params);
	var idPolla = Request.Params["idPolla"];

	$('#tbRanking').delegate('a','click', function(){
		var idUser = $(this).attr('id');
		window.location.href = 'detailsRanking.html?idUser='+idUser+'&idPolla='+idPolla;
	});

	$('.volver-btn').click(function() {
        event.preventDefault(); 
        history.back(1); 
    });


	getDataRanking();

	function getDataRanking(){
		var apiUrl = Servicios.getRanking;
		var idTransaccion = getIdTransaccion();
		
		$.ajax({ 
			url: apiUrl, 
			dataType: 'jsonp', 
			contentType: 'application/json', 
			type: "GET", 
			data: {
				application: 'mobile',
				idPolla: idPolla,
				idTransaction: idTransaccion,
				pageNumber: 0,
				pageSize: 0,
				user: defaultUserName
			},
			success: function(data) {
				//console.log(data);		   
				fillDataRanking(data);
				onAjaxComplete();
			}, 
			error: function(xhr, ajaxOptions, thrownError) { 		   
				console.log("Error Ranking: "+ + xhr.status);
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
	
	function fillDataRanking(data){
		try{
			if (data.lstRankingDTO.length > 0) {
				$.each(data.lstRankingDTO, function(index, value) {
					console.log(value);
					$('#tbRanking').append(
						'<tr><td align="left"><a href="#" id="'+value.userDTO.id+'"><label>'+(index+1)+'.  '+value.userDTO.name+'</label></a></td>'+
						'<td align="center"><label>'+value.totalScore+' PUNTOS</label></td></tr>'
					);
				});		
			}
			else{
				alert('No hay datos');
			}
		}catch(err){
			alert('Ha ocurrido un problema realizando la consulta ranking');
		}		
	}

    function onAjaxLoad() {    
        $('.ajax-load').css('display', 'block');
    }

    function onAjaxComplete() {
        $('.ajax-load').css('display', 'none');
    }
});
