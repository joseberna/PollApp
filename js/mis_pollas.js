$(function() {	
	//console.log(JSON.stringify(json));

	function update_list(data) {	


	  if(!data["contextResponse"].transactionState||!(data["lstPollaDTO"])){
	  	//alert("Es posible que el usuario no tenga pollas asociadas o en el momento o no haya respuesta del servidor, por favor intente creando una polla, de lo contrario comuniquese con el administrador del sistema");
	  	$('#myPollas').html("Empieza a jugar tu polla futbolera.");
	  	return;
	  }

	  var misPollas = data["lstPollaDTO"];
	  // clear the existing list
	  $('#listMyPolla li').remove();

	  $.each(misPollas, function(index,polla) {
	    //$('#listMyPolla').append('<li><div class="container_list"><div class="div_left"><a href="polla.html?id='+polla.id+'">'+polla.nombre+'</a></div><div class="div_right"><a href="integrantes.html?id='+polla.id+'">'+Ver integrantes+'</a></div></div></li>')
	   	//$('#listMyPolla').append('<li><div class="container_list"><div class="div_left"><a href="polla.html?id='+polla.id+'">'+(index+1)+'. '+polla.nombre+'</a></div><div class="div_right"><a href="integrantes.html?id='+polla.id+'">Ver integrantes</a></div></div></li>');	   	
	   	polla.name = (polla.name===null||polla.name===undefined||polla.name===""||polla.name.length===0)?"Sin nombre":polla.name;
	   	$('#listMyPolla').append('<li>'+
	   		'<div class="container_list">'+
	   		'<a class="a-polla-left" href="../4grupos/tab_grupos.html?id='+polla.id+'">'+
	   		'<b>'+(index+1)+'. '+polla.name+'</b>'+
	   		'</a>'+
	   		'<a class="a-polla-right" href="../7ranking/ranking.html?idPolla='+polla.id+'"><img src="../img/RANKING.png"></img></a>'+
	   		'<a class="a-polla-right" href="../6integrantes/integrantes.html?id='+polla.id+'&nombre='+polla.name+'&idUserAdmin='+polla.idUserAdmin+'"><img src="../img/VERAMIGOS.png"></img></a>'+
	   		'</div>'+
	   		'</li>');
		//$('#listMyPolla').append('<li><div class=\"container_list\"><div class=\"div_left\"><a href=\"polla.html?id='+polla.id+'\">'+polla.nombre+'</a></div><div class=\"div_right\"><a href=\"integrantes.html?id='+polla.id+'\">'+Ver integrantes+'</a></div></div></li>');		
	  });
	};

	//update_list(json);

	function getPollasByUser() {
		var apiUrl = null;
		/*if(isNullOrEmpty(application)||isNullOrEmpty(idTransaction)||isNullOrEmpty(idUser)||isNullOrEmpty(user)){
			apiUrl = "https://dev-dot-logical-light-488.appspot.com/_ah/api/pollasendpoint/v1/getPollasByUser?application=qw&idTransaction=qw&idUser=1&user=jgomez"; 
		}else{
			apiUrl = "https://dev-dot-logical-light-488.appspot.com/_ah/api/pollasendpoint/v1/getPollasByUser?application="+application+"&idTransaction="+idTransaction+"&idUser="+idUser+"&user="+user+""; 
		}*/

		apiUrl = Servicios.getPollasByUser;
		var idTransaccion = getIdTransaccion();
        var idUser = getIdUser();


        console.log("APIURL >> "+apiUrl);
        console.log("idUser >> "+idUser);

		$.ajax({
			url: apiUrl, 
			dataType: 'jsonp', 
			contentType: 'application/json', 
			type: "GET", 
			data: {
                application: 'mobile',
                idTransaction: idTransaccion,
                idUser: idUser,
                user: defaultUserName
            },
			success: function(data) {
				console.log(JSON.stringify(data));
				update_list(data);

				onAjaxComplete();  
			}, 
			error: function(xhr, ajaxOptions, thrownError) {
				console.log("Error: "+ + xhr.status);
				alert("Ocurrio un error consultando las pollas del usuario, por favor intentelo de nuevo "+xhr.status);
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

	getPollasByUser();

	function isNullOrEmpty(params){
		return params===null||params===undefined||params===""||params.length===0;
	}

    function onAjaxLoad() {    
        $('.ajax-load').css('display', 'block');
    }

    function onAjaxComplete() {
        $('.ajax-load').css('display', 'none');
    }
});