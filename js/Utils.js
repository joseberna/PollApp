var defaultUserName = 'pollappMobile';

//'https://dev-dot-logical-light-488.appspot.com/_ah/api/pollasendpoint/v1/',
//URLS Finales
var Servicios = {
	addPolla: 'https://dev-dot-pollappusinturik.appspot.com/_ah/api/pollasendpoint/v1/addPolla',	
	addGuestPolla: 'https://dev-dot-pollappusinturik.appspot.com/_ah/api/pollasendpoint/v1/addGuestPolla',
	getAllGuestUsers: 'https://dev-dot-pollappusinturik.appspot.com/_ah/api/pollasendpoint/v1/getAllGuestUsers',
	removeGuestUser:' https://dev-dot-pollappusinturik.appspot.com/_ah/api/pollasendpoint/v1/removeGuestUser',
	updateAcceptedInvitation: 'https://dev-dot-pollappusinturik.appspot.com/_ah/api/pollasendpoint/v1/updateAcceptedInvitation',
	getGuestByUser: 'https://dev-dot-pollappusinturik.appspot.com/_ah/api/pollasendpoint/v1/getGuestByUser',
	getPollasByUser: 'https://dev-dot-pollappusinturik.appspot.com/_ah/api/pollasendpoint/v1/getPollasByUser',
	getMatchsByRound: 'https://dev-dot-pollappusinturik.appspot.com/_ah/api/matchendpoint/v1/getMatchsByRound',
	getResultsMatch: 'https://dev-dot-pollappusinturik.appspot.com/_ah/api/matchendpoint/v1/getResultsMatch',
	setResultMatchByUser: 'https://dev-dot-pollappusinturik.appspot.com/_ah/api/matchendpoint/v1/setResultMatchByUser',
	getRanking: 'https://dev-dot-pollappusinturik.appspot.com/_ah/api/rankingendpoint/v1/getRanking',
	getRankingByUser: 'https://dev-dot-pollappusinturik.appspot.com/_ah/api/rankingendpoint/v1/getRankingByUser'
};

/*var Servicios = {
	addPolla: 'https://dev-dot-logical-light-488.appspot.com/_ah/api/pollasendpoint/v1/addPolla',	
	addGuestPolla: 'https://dev-dot-logical-light-488.appspot.com/_ah/api/pollasendpoint/v1/addGuestPolla',
	getAllGuestUsers: 'https://dev-dot-logical-light-488.appspot.com/_ah/api/pollasendpoint/v1/getAllGuestUsers',
	removeGuestUser: 'https://dev-dot-logical-light-488.appspot.com/_ah/api/pollasendpoint/v1/removeGuestUser',
	updateAcceptedInvitation: 'https://dev-dot-logical-light-488.appspot.com/_ah/api/pollasendpoint/v1/updateAcceptedInvitation',
	getGuestByUser: 'https://dev-dot-logical-light-488.appspot.com/_ah/api/pollasendpoint/v1/getGuestByUser',
	getPollasByUser: 'https://dev-dot-logical-light-488.appspot.com/_ah/api/pollasendpoint/v1/getPollasByUser'
};*/

function getIdUser() {
	var userDTO = getSessionValue('userLoginModel');
	if(userDTO !== null) {
		userDTO = JSON.parse(userDTO);
	}

	if(userDTO !== undefined && userDTO !== null) {
		return userDTO.id;
	}
}

//Save a setting on the device.
function saveSessionValue(key, value){
	if(typeof(Storage) !== 'undefined') {
		sessionStorage.setItem(key, value);
    	//window.localStorage.setItem(key, value);
    } else {
    	alert('No soporta el sessionStorage');
    }
}

function getSessionValue(key){
	if(typeof(Storage) !== 'undefined') {
		//TODO una vez la aplicacion este integrada con la gestion de usuario,
		//comentariar este if/else y dejar el ultimo return
		if(key === 'userLoginModel') {
	    	return JSON.stringify({
	    		id: 10,
	    		name: 'juan',
	    		lastName: 'Gomez Torres',
	    		email: 'juan.gomez01@gmail.com'
	    	});
		} else {
			return sessionStorage.getItem(key);
		}

		//return sessionStorage.getItem(key);
	} else {
		alert('No soporta el sessionStorage');
	}
}

function getIdTransaccion() {
	return Math.random().toString(36).substring(10);
}

function formatDate(strDate) {
	var arrDate = strDate.split('T');
	
	if(arrDate !== null && arrDate !== undefined) {
		return arrDate[0];
	}

	return strDate;
}


