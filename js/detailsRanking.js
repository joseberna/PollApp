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
  var idUser = Request.Params["idUser"];
  var idPolla = Request.Params["idPolla"];

  $('.volver-btn').click(function() {
    event.preventDefault(); 
    history.back(1); 
  });
  
	getDataDetailsRanking();

	function getDataDetailsRanking() {
		var apiUrl = Servicios.getRankingByUser;
    var idTransaccion = getIdTransaccion();

    //var apiUrl = ""; 
		console.log(apiUrl);
    $.ajax({ 
      url: apiUrl, 
			dataType: 'jsonp', 
			contentType: 'application/json', 
			type: "GET",
      data: {
        application: 'mobile',
        idPolla: idPolla,
        idTransaction: idTransaccion,
        idUser: idUser,
        pageNumber: 0,
        pageSize: 0,
        user: defaultUserName
      },
			success: function(data) {
				//console.log(data);		   
				fillDataDetailsUserRanking(data);
			}, 
			error: function(xhr, ajaxOptions, thrownError) { 		   
				console.log("Error Details Ranking: "+ + xhr.status);
			}   
		});
	}
	
	function fillDataDetailsUserRanking(data){
		//console.log(data);

		/*var data = {
     "contextResponse": {
      "transactionDate": "2014-06-06T04:33:14.060Z",
      "transactionState": true,
      "idTransaccion": "as"
     },
     "lstRankingUserDTO": [
      {
       "idResultMatch": 6,
       "namesUser": "Juan Pedro",
       "lastNameUser": "Torres",
       "scoreTeamA": 3,
       "scoreTeamB": 1,
       "scoreOrgTeamA": 2,
       "scoreOrgTeamB": 0,
       "totalScore": 1,
       "nameTeamA": "España",
       "nameTeamB": "Países Bajos",
       "flagTeamA": "Espana.png",
       "flagTeamB": "PaisesBajos.png",
       "dateMatch": "2014-06-13T00:00:00.000Z"
      },
      {
       "idResultMatch": 8,
       "namesUser": "Juan Pedro",
       "lastNameUser": "Torres",
       "scoreTeamA": 3,
       "scoreTeamB": 3,
       "scoreOrgTeamA": 2,
       "scoreOrgTeamB": 0,
       "totalScore": 0,
       "nameTeamA": "México",
       "nameTeamB": "Camerún",
       "flagTeamA": "Mexico.png",
       "flagTeamB": "Camerun.png",
       "dateMatch": "2014-06-13T00:00:00.000Z"
      },
      {
       "idResultMatch": 8,
       "namesUser": "Juan Pedro",
       "lastNameUser": "Torres",
       "scoreTeamA": 3,
       "scoreTeamB": 3,
       "scoreOrgTeamA": 2,
       "scoreOrgTeamB": 0,
       "totalScore": 0,
       "nameTeamA": "México",
       "nameTeamB": "Camerún",
       "flagTeamA": "Mexico.png",
       "flagTeamB": "Camerun.png",
       "dateMatch": "2014-06-13T00:00:00.000Z"
      },
      {
       "idResultMatch": 8,
       "namesUser": "Juan Pedro",
       "lastNameUser": "Torres",
       "scoreTeamA": 3,
       "scoreTeamB": 3,
       "scoreOrgTeamA": 2,
       "scoreOrgTeamB": 0,
       "totalScore": 0,
       "nameTeamA": "México",
       "nameTeamB": "Camerún",
       "flagTeamA": "Mexico.png",
       "flagTeamB": "Camerun.png",
       "dateMatch": "2014-06-13T00:00:00.000Z"
      }
     ],
     "kind": "rankingendpoint#resourcesItem",
     "etag": "\"Lv-BsuhKPadETAuVqf9M_SvumYw/e3BX3nbRPc7jzADAz7jBype2m_A\""
    };*/


    try{
      if (data.lstRankingUserDTO !== undefined && data.lstRankingUserDTO.length > 0) {
        $('#titleUser').text(data.lstRankingUserDTO[0].namesUser+' '+data.lstRankingUserDTO[0].lastNameUser);

        $.each(data.lstRankingUserDTO, function(index, value) {
					$('#tbDetailsUserRanking').append(
						'<tr><td class="trow date" colspan="7"><label>'+formatDate(value.dateMatch)+'</label></td>'+
						'<tr><td class="trow team" colspan="3"><label>'+value.nameTeamA+'</label></td></td><td><label>VS.</label></td><td class="trow team"  colspan="3"><label>'+value.nameTeamB+'</label></td></tr>'+
						'<tr><td class="trow band" ><div><img src="../img/flags/'+value.flagTeamA+'"/></td><td class="trow score"><label>'+value.scoreTeamA+'</label></td><td class="trow scorereal"><label>'+value.scoreOrgTeamA+'</label></td><td></td><td class="trow band"><div><img src="../img/flags/'+value.flagTeamB+'"/></td><td class="trow score"><label>'+value.scoreTeamB+'</label></td><td class="trow scorereal"><label>'+value.scoreOrgTeamB+'</label></td></tr>'+
						'<tr><td colspan="7"><label>PUNTOS GANADOS = '+value.totalScore+'</label></td><tr><td><br></td></tr>'/*+
						'</tr>'*/
					);
				});		
			} else {        
        $('#tbDetailsUserRanking').html('<tr><td>Aun no ha ganado puntos.</td></tr>');
			}
		} catch(err){
      console.log(err);
      alert('Ha ocurrido un problema realizando la consulta detalle ranking');
		}
		
	}


});
