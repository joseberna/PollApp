
$(function()
{	

	$('#initSesion').click(onClickInitSesion);	

	$('#msg').css({
		visibility: 'hidden'
	});

	$("#email").val("");
	$("#password").val("");


	function validateUser(user, password)
	{
		var idTransaction = getIdTransaccion();

		var apiUrl = "https://dev-dot-pollappusinturik.appspot.com/_ah/api/userendpoint/v1/getUserByEmailByPass?application=mobilePollapp&email=" + user + 
			"&idTransaction=" + idTransaction + "&password=" + password + "&user=userMobilePollapp";

		$.ajax({ 
		 url: apiUrl, 
		 dataType: 'jsonp', 
		 contentType: 'application/json', 
		 type: "GET", 
		 success: function(data) {		   
		   saveDataUser(data); 
		 }, 
		 error: function(xhr, ajaxOptions, thrownError) { 

		 	$('#msg').text("Error: "+ + xhr.status);

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

		//console.log("User => "+ user);

		if (user == "undefined" || user == '' || user == null) {

			$('#msg').text("E-mail o contraseña no son validos");

			$('#msg').css({
				visibility: 'visible'
			});

			return;
		}		

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

	function onClickInitSesion(ev){

		ev.preventDefault();

		if ($("#email").val().trim() == ''){

			$('#msg').text("Por favor ingrese el E-mail");

			$('#msg').css({
				visibility: 'visible'
			});

			return;
		}

		if ($("#password").val().trim() == ''){

			$('#msg').text("Por favor ingrese la contraseña");

			$('#msg').css({
				visibility: 'visible'
			});
			
			return;
		}

		$('#msg').css({
			visibility: 'hidden'
		});

		validateUser($("#email").val().trim(), $("#password").val().trim());

	}

	function getIdTransaccion() {

       return Math.random().toString(36).substring(10);

	}


});


