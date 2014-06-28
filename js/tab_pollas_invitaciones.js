$(function()
{	    

   $("#nav li a").click(function() {
 
        $("#ajax-content").empty().append("<div id='loading'><img src='../img/loading2.gif' alt='Loading' /></div>");
        $("#nav li a").removeClass('current');
        $(this).addClass('current');   
        console.log(this.href); 
        var url = this.href;        
        //var pos = url.lastIndexOf('/');
        //var urlAux = url.substring((pos+1));
        var urlAux = url;
        console.log(urlAux);
	    
        $.ajax({ url: urlAux, async:true, global:false,success: function(html) {
            $("#ajax-content").empty().append(html);
    		}
    	});
    	return false;
    });
 
    /*$("#ajax-content").empty().append("<div id='loading'><img src='../img/loading2.gif' alt='Loading' /></div>");        
	$.ajax({ url: 'mis_pollas.html', global:false,success: function(html) {
			//$("#nav li a").removeClass('current');
        	$("#nav li a").first().addClass('current');
            $("#ajax-content").empty().append(html);
    	}

        //window.location.href="mis_pollas.html";
    });*/
    
    //se ejecuta el evento click en el primer tab para forzar la carga
    $("#nav li a").first().trigger('click');

    $('.volver-btn').click(function() {
        event.preventDefault(); 
        history.back(1); 
    });

});