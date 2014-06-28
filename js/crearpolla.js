$(document).ready(function() {

    var MaxInputs       = 1000; //maximum input boxes allowed
    var InputsWrapper   = $("#InputsWrapper"); //Input boxes wrapper ID
    var AddButton       = $("#AddMoreFileBox"); //Add button ID

    var x = InputsWrapper.length; //initlal text box count
    var FieldCount=1; //to keep track of text box added
    var idPolla = undefined;//identificador de la polla
    var nombrePolla = undefined;//nombre de la polla


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

    idPolla = Request.Params["id"];
    nombrePolla = Request.Params["nombre"];
    if(idPolla !== undefined && nombrePolla !== undefined) {
        $('#txtNombrePolla').val(nombrePolla);
        $('#txtNombrePolla').attr('disabled', 'disabled');
        $('.title h3').html('INVITAR MAS');
    }

    adicionarPirmerCampoEmail();

    //on add input button click
    $(AddButton).click(function (e) {
        //max input box allowed
        if(x <= MaxInputs) {
            FieldCount++; //text box added increment
            x++; //text box increment

            //add input box
            adicionarPirmerCampoEmail();
        }

        return false;
    });

    $("body").on("click",".removeclass", function(e){ //user click on remove text
        if( x > 1 ) {
            $(this).parent('div').remove(); //remove text box
            x--; //decrement textbox
        }
        return false;
    });

    //on add input button click
    $('#btnInvitarAmigos').click(function (e) {
        var error = faltanDatos();
        if(error !== false) {
            alert(error);
        } else {
            var emails = [];
            var sendData;
            var apiUrl;
            $(InputsWrapper).children().each(function(index, value) {
                value = $(value).find('input').val();
                emails.push(value);
            });
            
            var idTransaccion = getIdTransaccion();
            var idUser = getIdUser();
            var htmlHREF = "";

            //si es una polla nueva
            if(idPolla === undefined) {
                apiUrl = Servicios.addPolla;
                
                sendData = {
                    "contextRequestDTO": 
                    {
                        "applicationName": 'mobile',
                        "idTransaction": idTransaccion,
                        "pageNumber": 0,
                        "pageSize": 0,
                        "userName": defaultUserName
                    },
                    "emails": emails,
                    "idUser": idUser,
                    "namePolla": $('#txtNombrePolla').val()
                };

                htmlHREF = "../1polla/tab_pollas_invitaciones.html";

            //si se estan adicionando usuarios a la polla
            } else {
                apiUrl = Servicios.addGuestPolla;
                
                sendData = {
                    "contextRequestDTO": {
                        "applicationName": "mobile",
                        "idTransaction": idTransaccion,
                        "pageNumber": 0,
                        "pageSize": 0,
                        "userName": defaultUserName
                    },
                    "idPolla": idPolla,
                    "idUserAdmin": idUser,
                    "emails": emails,
                };                

            }

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
                            if(idPolla === undefined) {
                                alert('Polla creada exitosamente.');
                                window.location.href = htmlHREF;
                            } else {
                                alert('Invitaciones enviadas exitosamente.');
                                htmlHREF = "../6integrantes/integrantes.html?id="+idPolla+"&nombre="+$('#txtNombrePolla').val()+"&idUserAdmin="+idUser;
                                window.location.href = htmlHREF;
                            }

                            reiniciarFormulario();
                        } else {
                            if(idPolla === undefined) {
                                alert('Se presento un error al crear la polla, por favor intentalo de nuevo.');
                            } else {
                                alert('Se presento un error al enviar las invitaciones, por favor intentalo de nuevo.');
                            }
                        }
                    } catch(e) {

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
            
        }        

        return false;
    });

    $('.volver-btn').click(function() {
        event.preventDefault(); 
        history.back(1); 
    });

    function adicionarPirmerCampoEmail(email) {
        /*$(InputsWrapper).append(
            '<div>'+
            '<input type="text" name="field_'+ FieldCount +'" id="field_'+ FieldCount +'" placeholder="Ingresar correo" '+
            (email !== undefined ? 'value="'+email+'"' : '')+'/>'+
            //'<button class="removeclass">-</button>'+
            '<input type="image" class="removeclass" src="../img/menos.png">'+
            '</div>'
        );*/
        $(InputsWrapper).append(
            '<div>'+
            '<input type="text" name="field_'+ FieldCount +'" id="field_'+ FieldCount +'" placeholder="Ingresar correo"/>'+
            //'<button class="removeclass">-</button>'+
            '<input type="image" class="removeclass" src="../img/menos.png">'+
            '</div>'
        );
    }

    function faltanDatos() {
        var error = false;
        var errors = [];
        var value = $('#txtNombrePolla').val();

        if(value === null || value === undefined || value.trim().length === 0) {            
            return 'El nombre de la polla es obligatorio.';
        }

        $(InputsWrapper).children().each(function(index, value) {
            value = $(value).find('input').val();
            console.log('value>>'+value);

            if(value === null || value === undefined || value.trim().length === 0
                || !validar_email(value)) {
                error = true;
            }
        });

        if(error) {
            return 'Los correos son obligatorios y deben tener un formato valido.';
        }

        var emails = [];
        var emails_fails = [];
        $(InputsWrapper).children().each(function(index, value) {
            value = $(value).find('input').val();
            
            if($.inArray(value, emails) !== -1) {
                emails_fails.push(value);              
            } else {
                emails.push(value);
            }
        });

        if(emails_fails.length > 0) {
            return 'Los siguientes correos estan repetidos: '+emails_fails.join(', ');
        }

        return error;
    }

    function reiniciarFormulario() {
        $('#txtNombrePolla').val('');
        $('#txtNombrePolla').removeAttr('disabled');
        idPolla = undefined;//identificador de la polla
        nombrePolla = undefined;//nombre de la polla
        $(InputsWrapper).empty();
        adicionarPirmerCampoEmail();
    }

    function validar_email(valor) {
        // creamos nuestra regla con expresiones regulares.
        var filter = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
        // utilizamos test para comprobar si el parametro valor cumple la regla
        if(filter.test(valor))
            return true;
        else
            return false;
    }

    function onAjaxLoad() {
        $('.ajax-load').css('display', 'block');
    }

    function onAjaxComplete() {
        $('.ajax-load').css('display', 'none');
    }
});














