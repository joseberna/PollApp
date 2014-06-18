
$(function()
{	

	$('#initSesion').click(onClickInitSesion);	

	$('#msg').css({
		visibility: 'hidden'
	});

	$("#email").val("");
	$("#password").val("");

	validateUserLogIn();

	function validateUserLogIn(){

		console.log("Validate User log in");

		var isUserLogIn = isLogIn();		

		if (isUserLogIn != null && isUserLogIn == 'true') {			
			window.location.href = "inicio.html";
		};

	}

	function validateUser(user, password)
	{
		var idTransaction = getIdTransaccion();

		var apiUrl = Servicios.GetUserByEmailByPass;

		$.ajax({ 
			url: apiUrl, 
			dataType: 'jsonp', 
			contentType: 'application/json', 
			type: "GET",
			data: {
				application: 'mobilePollapp',
				idTransaction: idTransaction,
				pageNumber: 0,
				pageSize: 0,
				user: defaultUserName,
				email: user,
				password: password
			},
			success: function(data) {		   
				saveDataUser(data);
				onAjaxComplete();
			}, 
			error: function(xhr, ajaxOptions, thrownError) { 

				$('#msg').text("Error: "+ + xhr.status);

				$('#msg').css({
					visibility: 'visible'
				});

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

			localStorage.setItem(keyIsLogIn,
				true);

			localStorage.setItem(keyStorage,
				JSON.stringify(user));
		}
		else
		{
			$('#msg').text("No soporta el localStorage");

			$('#msg').css({
				visibility: 'visible'
			});
		}

		$('#msg').css({
			visibility: 'hidden'
		});

		window.location.href = "inicio.html";

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


});


