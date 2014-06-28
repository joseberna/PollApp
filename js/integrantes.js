$(document).ready(function() {

    var idPolla = undefined;//identificador de la polla
    var nombrePolla = undefined;//nombre de la polla
    var idUserAdmin = undefined;//id del usuario administrador de la polla
    var esUsuarioAdmnistrador = true;


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

    console.log(Request.Params);
    idPolla = Request.Params["id"];
    nombrePolla = Request.Params["nombre"];
    idUserAdmin = Request.Params["idUserAdmin"];
    if(idPolla !== undefined && nombrePolla !== undefined && idUserAdmin !== undefined) {
        $('#nombrePolla').html(nombrePolla);
        var idLoginUser = getIdUser();
        esUsuarioAdmnistrador = (parseInt(idUserAdmin) === parseInt(idLoginUser));

        if(esUsuarioAdmnistrador) {
            $('#adicionarMas').css('display', 'block');
        }

        var idTransaccion = getIdTransaccion();
        var apiUrl = Servicios.getAllGuestUsers;

        $.ajax({
            url: apiUrl, 
            dataType: 'json', 
            contentType: 'application/json; charset=utf-8', 
            type: "GET", 
            data: {
                application: 'mobile',
                idPolla: idPolla,
                idTransaction: idTransaccion,
                user: defaultUserName
            },
            success: function(data) {  
                try {                       
                    console.log(data);

                    var integrantes = data.lstGuestDTO;

                    if(integrantes !== undefined && integrantes !== null) {
                        $.each(integrantes, function(index, value){
                            adicionarIntegrante(index, value);
                        });

                        $("body").on("click",".removeclass", function(e){ //user click on remove text
                            eliminarIntegrante(e);
                            return false;
                        });
                    } else {
                        $('section').append('Esta Polla no tiene integrantes.');
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

    //evento para el boton invitar mas amigos
    $('#adicionarMas input').click(function(e) {
        window.location.href = '../5crearpolla/crearpolla.html?id='+idPolla+'&nombre='+nombrePolla;
    });

    $('.volver-btn').click(function() {
        event.preventDefault(); 
        history.back(1); 
    });

    function adicionarIntegrante(index, integrante) {
        //console.log(integrante);
        $('#divIntegrantes').append(
            '<div>'+
            '<span>'+(index+1)+'. '+(integrante.user ? integrante.user.name+' '+integrante.user.lastName : integrante.email)+'</span>'+
            //'<button class="removeclass">-</button>'+ 
            (!integrante.accepted && esUsuarioAdmnistrador ? '<input type="image" class="removeclass" src="../img/basura.png" data-user="'+integrante.id+'">' : '<img></img>')+
            '<img src="../img/'+(integrante.accepted ? 'chulo' : 'equix')+'.png"></img>'+
            '</div>'
        );
    }

    function eliminarIntegrante(e) {
        if(confirm('Confirma que desea eliminar la invitacion.')) {
            var _this = $(e.target);
            var idUser = _this.data('user');
            
            console.log("idUser >> "+ idUser);
            
            //TODO ESTE SERVICIO NO FUNCIONA SI SE UNA json Y SE ENVIAN LOS PARAMETROS USANDO EL atributo data DEL AJAX
            var apiUrl = Servicios.removeGuestUser;
            var idTransaccion = getIdTransaccion();
            var apiUrl = Servicios.removeGuestUser+'?application=mobile&idGuest='+idUser+'&idTransaction='+idTransaccion+'&user='+defaultUserName;

            console.log('apiUrl>>'+apiUrl);
            $.ajax({
                url: apiUrl, 
                dataType: 'json', 
                contentType: 'application/json; charset=utf-8', 
                type: "DELETE",
                /*data: {
                    application: 'mobile',
                    idGuest: idUser,
                    idTransaction: idTransaccion,
                    user: defaultUserName
                },*/
                success: function(data) {  
                    try {                       
                        console.log('data', data);

                        if(data && data.error === undefined) {
                            alert('Invitacion eliminada exitosamente.');

                            //se elimina el elemento
                            _this.parent('div').remove();
                        } else {
                            alert('Se presento un error al crear al eliminar la invitacion.');
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
    }

    function faltanDatos() {
        var error = false;
        var errors = [];
        var value = $('#txtNombrePolla').val();

        if(value === null || value === undefined || value.trim().length === 0) {            
            return 'El nombre de la polla es obligatorio.';
        }

        return error;
    }

    function onAjaxLoad() {
        $('.ajax-load').css('display', 'block');
    }

    function onAjaxComplete() {
        $('.ajax-load').css('display', 'none');
    }
});














