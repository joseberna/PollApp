
$(function()
{	

	$('#create').click(onClickCreate);	

	$('#msg').css({
		visibility: 'hidden'
	});

	$("#nombres").val("").focus();
	$("#apellidos").val("");
	$("#email").val("");
	$("#password").val("");
	$("#password2").val("");

	$("#nombres").focusout(function(event) {		
		validateControls(event);
	});

	$("#apellidos").focusout(function(event) {		
		validateControls(event);
	});

	$("#email").focusout(function(event) {		
		validateControls(event);
	});

	$("#password").focusout(function(event) {		
		validateControls(event);
	});

	$("#password2").focusout(function(event) {		
		validateControls(event);
	});
	

	function registerUser()
	{
		var idTransaction = getIdTransaccion();		

		var sendData = {
		
		 "contextRequestDTO": {
			  "applicationName": 'mobilePollapp',
			  "idTransaction": idTransaction,
			  "pageNumber": 0,
			  "pageSize": 0,
			  "userName": 'userMobilePollapp'
			 },
			 "userDTO": {
			  "email": $("#email").val().trim(),
			  "id": "",
			  "lastName": $("#apellidos").val().trim(),
			  "name": $("#nombres").val().trim(),
			  "password": $("#password").val().trim()
			 }

		};

		var apiUrl = "https://dev-dot-pollappusinturik.appspot.com/_ah/api/userendpoint/v1/createUser"

		$.ajax({ 
		 url: apiUrl, 
		 dataType: 'json', 
		 contentType: 'application/json; charset=utf-8', 
		 type: "POST", 
		 data: JSON.stringify(sendData),
		 success: function(data) {		   
		   saveDataUser(data); 
		 }, 
		 error: function(xhr, ajaxOptions, thrownError) { 

		 	$('#msg').text("Error: "+ + xhr.status);

		 	var mensaje = xhr.responseJSON.error.message

		 	if (mensaje != undefined) {

				var indexInit = mensaje.indexOf(":");		 	

		 		mensaje = mensaje.substring(indexInit + 2, mensaje.length);

		 		$('#msg').text($.trim(mensaje));

		 	}

			$('#msg').css({
				visibility: 'visible'
			});

		    console.log("Error: "+ + xhr.status);
		 }   
		});

	}

	function saveDataUser(data){

		var keyStorage = "userLoginModel";		

		var user = data.userDTO;

		console.log("User => "+ user.id);

		if(typeof(Storage) != "undefined")
  		{  	  			

  			sessionStorage.setItem(keyStorage,
  				JSON.stringify(user));
  		}
		else
  		{
  			$('#msg').text("No soporta el sessionStorage");

			$('#msg').css({
				visibility: 'visible'
			});
  		}

  		$('#msg').css({
				visibility: 'hidden'
		});

  		window.location.href = "../inicio.html";

	}

	function validateEmail(email) { 
    	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return re.test(email);
	} 

	function validatePassword(password) { 
    	var re = /(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])((?=.*[A-Z])|(?=.*[a-z])).*$/;
    	return re.test(password);
	} 

	function onClickCreate(ev){

		ev.preventDefault();		

		if (!validateControls(ev)) {return};		

		registerUser();

	}

	function validateControls(ev){

		ev.preventDefault();			

		if((ev.target.id == 'nombres' || ev.target.id == 'btnCreate')  && !validate("#nombres", "los nombres")){
			$("#nombres").focus();
			return false;			
		}

		if((ev.target.id == 'apellidos' || ev.target.id == 'btnCreate') && !validate("#apellidos", "los apellidos")){
			$("#apellidos").focus();
			return false;
		}

		if((ev.target.id == 'email' || ev.target.id == 'btnCreate') && !validate("#email", "el E-mail")){
			$("#email").focus();
			return false;
		}

		if((ev.target.id == 'email' || ev.target.id == 'btnCreate') && !validateEmail($("#email").val().trim(), "el E-mail")){

			$("#email").focus();

			$('#msg').text("El E-mail no tiene el formato correcto");

			$('#msg').css({
				visibility: 'visible'
			});	

			return false;
		}

		if((ev.target.id == 'password' || ev.target.id == 'btnCreate') && !validate("#password", "la contraseña")){
			$("#password").focus();
			return false;
		}

		if((ev.target.id == 'password' || ev.target.id == 'btnCreate') && !validatePassword($("#password").val().trim(), "")){

			$("#password").focus();

			$('#msg').text("6 caracteres una letra y un número");

			$('#msg').css({
				visibility: 'visible'
			});	

			return false;
		}

		if((ev.target.id == 'password2' || ev.target.id == 'btnCreate') && !validate("#password2", "la contraseña")){
			
			$("#password2").focus();

			return false;
		}		

		if((ev.target.id == 'password2' || ev.target.id == 'btnCreate') && $('#password').val().trim() != $('#password2').val().trim()){
			
			$("#password").focus();

			$('#msg').text("Las contraseñas no son las mismas");

			$('#msg').css({
				visibility: 'visible'
			});	

			return false;
		}

		$('#msg').css({
			visibility: 'hidden'
		});

		return true;

	}

	function validate(idAttr, nameAttr){

		if ($(idAttr).val().trim() == ''){

			$('#msg').text("Por favor ingrese " + nameAttr);

			$('#msg').css({
				visibility: 'visible'
			});	

			return false;		
		}

		return true;

	}

	function getIdTransaccion() {

       return Math.random().toString(36).substring(10);

	}


});


