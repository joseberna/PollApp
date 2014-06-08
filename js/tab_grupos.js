$(function() {
    var idPolla;

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

   $("#nav li a").click(function() {
        //$("#ajax-content").empty().append("<div id='loading'><img src='../img/loading2.gif' alt='Loading' /></div>");
        //$("#nav li a").removeClass('current');
        //$(this).addClass('current');   

        $('.title h3').html($(this).data('label'));
        var round = $(this).data('round');

        if(parseInt(round) === 1) {
            console.log(this.href); 
            var url = this.href;        
            //var pos = url.lastIndexOf('/');
            //var urlAux = url.substring((pos+1));
            var urlAux = url;
            console.log(urlAux);
    	    $("#ajax-content").empty().append("<div id='loading'><img src='../img/loading2.gif' alt='Loading' /></div>");
            $.ajax({ 
                url: urlAux, 
                async:true, 
                global: false,
                success: function(html) {
                    $("#ajax-content").empty().append(html);
                }
            });
        } else {
            cargarPartidos(round);
        }

    	return false;
    });
 
    //se ejecuta el evento click de la fase de grupos para forzar la carga
    $('#tab_grupos').trigger('click');

    $('.volver-btn').click(function() {
        event.preventDefault(); 
        history.back(1); 
    });

    function cargarPartidos(idRound) {
        var idTransaccion = getIdTransaccion();
        var apiUrl = Servicios.getMatchsByRound;

        $.ajax({
            url: apiUrl, 
            dataType: 'json', 
            contentType: 'application/json; charset=utf-8', 
            type: "GET", 
            data: {
                application: 'mobile',
                idRound: idRound,
                idTransaction: idTransaccion,
                pageNumber: 0,
                pageSize: 0,
                user: defaultUserName
            },
            success: function(data) {  
                try {                       
                    console.log(data);
                    $("#ajax-content").empty();

                    var partidos = data.lstMatchDTO;

                    if(partidos !== undefined && partidos !== null) {
                        $.each(partidos, function(index, value){
                            adicionarPartido(index, value);
                        });

                        $(".gri_grupos").click(function(e){ //user click on remove text
                            ingresarMarcador(e);
                            return false;
                        });
                        $('.gri_grupos').css('cursor', 'pointer');
                    } else {
                        $('section').append('No hay partidos para esta fase.');
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

    function adicionarPartido(index, partido) {         
        $('#ajax-content').append(
            '<div class="ui-grid-b gri_grupos" data-teama="'+partido.teamA+
                '" data-teamb="'+partido.teamB+'" '+
                '" data-imga="'+partido.flagTeamA+'" '+
                '" data-imgb="'+partido.flagTeamB+'" '+
                '" data-date="'+formatDate(partido.date)+' '+partido.hour+':00" '+
                '" data-idpolla="'+idPolla+'" '+
                '" data-idmatch="'+partido.id+'">'+
                '<div class="ui-block-a">'+
                    '<img src="../img/flags/'+partido.flagTeamA+'" alt="'+partido.flagTeamA+'"></img>'+
                    '</br><span>'+partido.teamA+'</span>'+
                '</div>'+
                '<div class="ui-block-b">'+
                    '<h3>VS</h3>'+
                '</div>'+
                '<div class="ui-block-c">'+
                    '<img src="../img/flags/'+partido.flagTeamB+'" alt="'+partido.flagTeamB+'"></img>'+
                    '</br><span>'+partido.teamB+'</span>'+
                '</div>'+
            '</div>'+
            formatDate(partido.date)+' - '+partido.hour+'</br>'+
            partido.stadium+'</br></br>');
    }

    function ingresarMarcador(e) {
        var _this = $(e.target);
        var parentDiv = _this.parents('div.ui-grid-b.gri_grupos');
        console.log('parentDiv', parentDiv);
        parentDiv = parentDiv === null || parentDiv === undefined ? _this : parentDiv;

        var params = 'teamA='+parentDiv.data('teama')+'&teamB='+parentDiv.data('teamb')+
            '&imgA='+parentDiv.data('imga')+'&imgB='+parentDiv.data('imgb')+
            '&date='+parentDiv.data('date')+'&idPolla='+parentDiv.data('idpolla')+
            '&idMatch='+parentDiv.data('idmatch');
        console.log(params);

        window.location.href = '../8partidosporfecha/partidosporfecha.html?'+params;
    }

    function onAjaxLoad() {    
        $('.ajax-load').css('display', 'block');
    }

    function onAjaxComplete() {
        $('.ajax-load').css('display', 'none');
    }
});





