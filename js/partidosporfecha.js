
$(function() {
	var Request = new function () {
        /// <summary>
        /// Obtiene parámetros de distintas fuentes.
        /// </summary>
        var params = [];
        var query = window.location.search.substring(1);
        query = decodeURIComponent(query);
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

	teamA = Request.Params["teamA"];//Nombre del equipo A
	teamB = Request.Params["teamB"];//Nombre del equipo B
	imgA = Request.Params["imgA"];//Nombre Bandera Equipo A
	imgB = Request.Params["imgB"];//Nombre Bandera Equipo B
	day = Request.Params["day"];
	pDate = Request.Params["date"];//Fecha y hora del partido en formato YYYY-MM-DD HH:MM:SS
	date = new Date(pDate);//Fecha y hora del partido en formato YYYY-MM-DD HH:MM:SS
	idMatch = Request.Params["idMatch"];
	idPolla = Request.Params["idPolla"];	
	
	/*teamA = 'Colombia';//Nombre del equipo A
	teamB = 'Grecia';//Nombre del equipo B
	imgA = 'col';//Nombre Bandera Equipo A
	imgB = 'gre';//Nombre Bandera Equipo B
	date = new Date("2014-06-07 14:10:00");;//Fecha y hora del partido en formato YYYY-MM-DD HH:MM:SS
	idMatch = 1;
	idPolla = 40;
	idUser = 10;*/
	
	$('#fechaPartido').html(day);
	$('.volver-btn').click(function() {
        event.preventDefault();
        history.back(1);
    });

	try {
		getDataFriends();
	} catch(err) {
        alert('Ha ocurrido un error inesperado desplegando los marcadores. '+err);
    }

	function getDataFriends() {
		//var apiUrl = "https://dev-dot-pollappusinturik.appspot.com/_ah/api/matchendpoint/v1/getResultsMatch?application=asas&idMatch="+idMatch+"&idPolla="+idPolla+"&idTransaction=sd&pageNumber=0&pageSize=0&user=jgomez";
		var apiUrl = Servicios.getResultsMatch;
		var idTransaccion = getIdTransaccion();		
		$.ajax({ 
			url: apiUrl, 
			dataType: 'jsonp',
			async: false,
			contentType: 'application/json', 
			type: "GET", 
			data: {
				application: 'mobile',
				idMatch: idMatch,
				idPolla: idPolla,
				idTransaction: idTransaccion,
				pageNumber: 0,
				pageSize: 0,
				user: defaultUserName
			},
			success: function(data) {
				var array = [];
				var table = '<table>';
				var trow = '';
				var resulttA = '';
				var resulttB = '';

				if (data.lstResultMatchDTO !== undefined && data.lstResultMatchDTO.length > 0) {
					var idUser = getIdUser();					

					$.each(data.lstResultMatchDTO, function(index, value) {
					    //console.log(index, value);
					    if(value.idUser === idUser) {
					    	resulttA = value.scoreTeamA;
							resulttB = value.scoreTeamB;
					    } else {
					    	array.push(value);
					    }
					});
				
					var longitud = array.length;

					for (var i = 0; i < longitud; i++){
						var lstResultMatchDTOS = array[i];//objeto JSON	

						//console.log(JSON.stringify(lstResultMatchDTOS));						
						trow += '<td>';
						trow +='		<table>';
						trow +='			<tr><td class="tdrow tdrowuser" colspan="3"><span class="verRanking" data-iduser="'+lstResultMatchDTOS.idUser+'">'+lstResultMatchDTOS.names+' '+lstResultMatchDTOS.lastName+'<span></td></tr>';
						trow +='			<tr><td class="tdrow tdrowres tdrowl">'+lstResultMatchDTOS.scoreTeamA+'</td><td class="tdrow tdrowres tdrowc"></td><td class="tdrow tdrowres tdrowr">'+lstResultMatchDTOS.scoreTeamB+'</td></tr>';
						trow +='			<tr><td class="tdrow tdrowname tdrowl">'+teamA+'</td><td  class="tdrow tdrowname tdrowc">Vs.</td><td  class="tdrow tdrowname tdrowr">'+teamB+'</td></tr>';
						trow +='		</table>';
						trow +='</td>';
						//console.log("i>>"+i);
						if(i%2!==0){		
							//console.log("i 1>>"+i);					
							trow = '<tr>'+trow+'</tr>';
							table += trow;
							trow = '';
						}else if(i===(longitud-1)){
							//console.log("i 2>>"+i);										
							trow = '<tr>'+trow+'</tr>';
							table += trow;
							trow = '';
						}
					}
					//se llena la tabla de los resultados
					table += '</table>';
					//console.log(table);
					$('#ajax-content').html(table);					
				} else {
					$('#ajax-content').html('<span class="titulos">Se el primero en dar el marcador.</span>');
				}

				//se llena el bloque de los valores del usuario
				$('#jugador').empty();
				$('#jugador').append('<table id ="tableplayer">'
						+'<tr class="tdrowteam">'
							+'<td class = "teamplayer"></td>'
							+'<td class = "teamplayer" colspan = "2">'+teamA+'</td>'
							+'<td class = "teamplayer">VS</td>'
							+'<td class = "teamplayer" colspan = "2">'+teamB+'</td>'
							+'<td class = "teamplayer"></td>'
						+'</tr>'
						+'<tr class="tdrow">'
							+'<td class ="tdrowteam"></td>'
							+'<td class ="tdrowteam"><img src="../img/flags/'+imgA+'"></td>'
							+'<td class ="tdrowteam"><input id="resultteamA" name="resultteamA" value="'+resulttA+'" type="text" maxlength="1" onkeypress="return isNumberKey(this);"></td>'
							+'<td class ="tdrowteam"></td>'
							+'<td class ="tdrowteam"><img src="../img/flags/'+imgB+'"></td>'
							+'<td class ="tdrowteam"><input id="resultteamB" name="resultteamB" value="'+resulttB+'" type="text" maxlength="1" onkeypress="return isNumberKey(this);"></td>'
							+'<td class ="tdrowteam"><img class="btnGuardar" src="../img/GUARDAR.png" id = "saveresults"></td>'
						+'</tr>'
						+'</table>');

				registerResult();
				onAjaxComplete();
			}, 
			error: function(xhr, ajaxOptions, thrownError) {
				alert("Error: "+ + xhr.status);
			},
			beforeSend: function( xhr ) {							
				onAjaxLoad();							
			},
			complete: function(xhr, textStatus ) {
				console.log(textStatus);
				if(textStatus !== 'success') {
				   onAjaxComplete();
				}
			}
		});
	}
	
	function registerResult(){		

		$('#saveresults').click(function() {
			if ( $('#resultteamA').val().length > 2 || isNaN( $('#resultteamA').val() )
			|| $('#resultteamB').val().length > 2 || isNaN( $('#resultteamB').val()) 
			|| $('#resultteamB').val() === '' || $('#resultteamB').val() === ''  ) {
				alert('Digite un número entre 0 y 9');
				return false;
			}
			else {
				var d = new Date();

				var month = d.getMonth()+ 1;
				var year = d.getFullYear();
				var day = d.getDate();
				var hour = d.getHours();
				var minute = d.getMinutes();
				var second = d.getSeconds();
				var fecha = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second;
				var date2 = new Date(fecha);
				var time = date.getTime();
				var time2 = date2.getTime();
				var resta = time-time2;				
				
				if(resta >= 600000){
					var apiUrl = Servicios.setResultMatchByUser;
					var idTransaccion = getIdTransaccion();
					var idUser = getIdUser();
					
					sendData = {
							"contextRequestDTO": {
							"applicationName": 'mobile',
							"idTransaction": idTransaccion,
							"pageNumber": 0,
							"pageSize": 0,
							"userName": defaultUserName
						},
						 "idMatch": idMatch,
						 "idPolla": idPolla,
						 "idUser": idUser,
						 "scoreTeamA": $('#resultteamA').val(),
						 "scoreTeamB": $('#resultteamB').val()
					};	

					console.log(JSON.stringify(sendData));            

					$.ajax({
						url: apiUrl, 
						dataType: 'json', 
						//contentType: 'application/json', 
						contentType: 'application/json; charset=utf-8', 
						type: "POST", 
						data: JSON.stringify(sendData),
						/*headers: {
							'X-JavaScript-User-Agent':  'Google APIs Explorer'
						},*/
						success: function(data) {         
							console.log(data);
							try {
								if(data.contextResponse !== undefined && data.contextResponse.transactionState) {
									alert('Marcador creado exitosamente.');
								} 
							} catch(e) {
								alert("error");
							}

							onAjaxComplete();
						}, 
						error: function(xhr, ajaxOptions, thrownError) {          
							alert("Error: "+ xhr.status);
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
				}else{
					alert("No se puede registrar el marcador, el partido ya se esta jugando o inicia en menos de 10 minutos");
				}
			}
			return false;
		});

		$('.verRanking').css('cursor', 'pointer');
		$('.verRanking').click(function(e) {
			var _this = $(e.target);
			var idUser = _this.data('iduser');

			window.location.href = '../7ranking/detailsRanking.html?idUser='+idUser+'&idPolla='+idPolla;
		});
	}

    function onAjaxLoad() {    
        $('.ajax-load').css('display', 'block');
    }

    function onAjaxComplete() {
        $('.ajax-load').css('display', 'none');
    }
});





