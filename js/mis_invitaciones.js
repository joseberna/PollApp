$(function() {	
	function updateAcceptedInvitation(response, idPolla){

		var apiUrl = Servicios.updateAcceptedInvitation;
        var idTransaccion = getIdTransaccion();
        var idUser = getIdUser();

		var datas = {
            "accepted": response,
            "contextRequestDTO": {
                "applicationName": "mobile",
                "idTransaction": idTransaccion,
                "pageNumber": 0,
                "pageSize": 0,
                "userName": defaultUserName
            },
            "idPolla": idPolla,
            "idUser": idUser
        };

		console.log(JSON.stringify(datas));

		$.ajax({
            url: apiUrl, 		 
            type: "PUT",
            contentType: 'application/json; charset=utf-8', 	
            dataType: 'json', 
            data: JSON.stringify(datas),		 	 		 
            success: function(data) {
                console.log(data);
                alert("Respuesta enviada exitosamente!");
                //getGuestByUser();
                getGuestByUser();
                //dataModelsApi = data;
                //gridGenerate(data);	

                onAjaxComplete();   
            }, 
            error: function(xhr, ajaxOptions, thrownError) { 		   
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

	//console.log(JSON.stringify(json));

	function update_list(data) {

	  if(!data["contextResponse"].transactionState||!(data["lstGuestDTO"])){
	  	//alert("Es posible que el usuario no tenga invitaciones en el momento o no haya respuesta del servidor, por favor intentelo de nuevo");
	  	$('#listMyInvitations').html('<span>No tienes invitaciones en este momento.</span>');
        return;
	  }
	  var myInvitations = data["lstGuestDTO"];		
	  // clear the existing list
	  $('#listMyInvitations li').remove();

	  $.each(myInvitations, function(index,invitation) {
	   	//$('#listMyInvitations').append('<li><div class="container_list"><div class="div_left"><a href="polla.html?id='+polla.id+'">'+(index+1)+'. '+polla.nombre+'</a></div><div class="div_right"><a class="btn btn-success btn-pendiente" href="#"><i class="fa fa-check fa-lg"></i></a><a class="btn btn-danger btn-pendiente" href="#"><i class="fa fa-trash-o fa-lg"></i></a></div></div></li>');
	   	var pollaDTO = invitation.pollaDTO;
	   	//var user = invitation.user;
	   	var userAdmin = invitation.userAdmin;
	   	//$('#listMyInvitations').append('<li><div class="container_list"><a href="polla.html?id='+invitation.id+'">'+(index+1)+'. '+userAdmin.name+' '+userAdmin.lastName+' ('+userAdmin.email+') te ha invitado a que juegues en la polla '+pollaDTO.nombre+'</a><a class="btn btn-danger btn-pendiente btn-decline" id="hola" value="'+invitation.id+'" href="#"><i class="fa fa-trash-o fa-lg"></i></a><a class="btn btn-success btn-pendiente btn-accept" value="'+invitation.id+'" href="#"><i class="fa fa-check fa-lg"></i></a></div></li>');
	   	//$('#listMyInvitations').append('<li><div class="container_list"><span>'+(index+1)+'. <b>'+userAdmin.name+' '+userAdmin.lastName+'</b> ('+userAdmin.email+') te ha invitado a que juegues en la polla <b>'+pollaDTO.nombre+'</b></span><a class="btn btn-danger btn-pendiente btn-decline" value="'+invitation.id+'" href="#"><i class="fa fa-trash-o fa-lg"></i></a><a class="btn btn-success btn-pendiente btn-accept" value="'+invitation.id+'" href="#"><i class="fa fa-check fa-lg"></i></a></div></li>');
		$('#listMyInvitations').append('<li><div class="container_list"><span>'+(index+1)+'. <b>'+userAdmin.name+' '+userAdmin.lastName+'</b> ('+userAdmin.email+') te ha invitado a que juegues en la polla <b>'+pollaDTO.name+'</b></span><input  type="image" class="btn-pendiente btn-decline"  value="'+pollaDTO.id+'" src="../img/equix.png"><input  type="image"  class="btn-pendiente btn-accept" value="'+pollaDTO.id+'" src="../img/chulo.png"></div></li>');
	  });

        //$('body').on("click",".btn-accept",function(event){
        $(".btn-accept").click(function(event){
            //console.log(this);        
            //alert("HOLA");
            //event.preventDefault();
            event.stopPropagation();
            console.log($(this).attr('value'));
            //return false;
            var idPolla = $(this).attr('value');
            updateAcceptedInvitation(true, idPolla);

            return false;
        });

        //$('body').on("click",".btn-decline",function(event){        
        $(".btn-decline").click(function(event){
            //console.log(this);        
            //event.preventDefault();
            event.stopPropagation();
            console.log($(this).attr('value'));    
            if(confirm("Estas seguro de que deseas rechazar esta invitación")){
                console.log("SI");
                var idPolla = $(this).attr('value');
                updateAcceptedInvitation(false, idPolla);
            }else{
                console.log("NO");
            }
            
            return false;
        }); 
	};


	function getGuestByUser() {
		var apiUrl = null;
		/*if(isNullOrEmpty(application)||isNullOrEmpty(idTransaction)||isNullOrEmpty(idUser)||isNullOrEmpty(user)){
			apiUrl = "https://dev-dot-logical-light-488.appspot.com/_ah/api/pollasendpoint/v1/getGuestByUser?application=as&idTransaction=as&idUser=1&user=jgomez"; 
		}else{
			apiUrl = "https://dev-dot-logical-light-488.appspot.com/_ah/api/pollasendpoint/v1/getGuestByUser?application="+application+"&idTransaction="+idTransaction+"&idUser="+idUser+"&user="+user+""; 
		}*/

        apiUrl = Servicios.getGuestByUser;
        var idTransaccion = getIdTransaccion();
        var idUser = getIdUser();

		$.ajax({
            url: apiUrl, 
            dataType: 'json', 
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
                alert("Ocurrio un error consultando las invitaciones al usuario, por favor intentelo de nuevo "+xhr.status);
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

	getGuestByUser();

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