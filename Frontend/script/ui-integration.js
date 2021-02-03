var thisSocket;
var ws;

var join_exp = /.*join\((.*)?\).*/;
var button_exp = /.*goto\[.*?\].*/;
			
$(document).ready(function(e) {	
	if (!window.WebSocket)
	{
		alert("seu navegador nao aceita websockets!! \n Consulte seu tecnico para maiores informações");
	}
	
	//cria socket
	createSocket();
	
	/*todas funcoes*/
	thisSocket = ws;

	//interpreta botao
	$("button").mousedown(function(){	
			//verifica se e bota de navegacao e descarrega websocket
			_buttonValue = $(this).val();
			
			//caso contrario verifica se os dados sao validos		
			if(_buttonValue.search(join_exp) > -1)
			{
				button_data = join_exp.exec(_buttonValue);
	   			ws.send("<digital 'val'='"+button_data[1]+"' 'comp'='0'>down</digital>");
			}
	});
	
	$("button").mouseup(function(){
			_buttonValue = $(this).val();
			
			button_data = join_exp.exec(_buttonValue);
			
			if(_buttonValue.search(join_exp) > -1)
			{
				ws.send("<digital 'val'='"+button_data[1]+"' 'comp'='0'>up</digital>");
			}
			
			//processa mudanca de pagina
			if((_buttonValue.search(button_exp) > -1) || ($(this).attr("id") == "comeBackButton"))
			{
				ws.close();
				console.log("ws unloaded");
			}
	});
	
	//interpreta slider
	$("input[type=range]").on('change mousedown', function(){
		_buttonValue = $(this).attr("name");
		
		button_data = join_exp.exec(_buttonValue);
		
		if(_buttonValue.search(join_exp) > -1)
		{
			ws.send("<analogico 'val'='"+button_data[1]+"' 'comp'='"+$(this).val()+"'>down</analogico>");
		}
	});
	
	$("input[type=range]").on('change mouseup', function(){		
		_buttonValue = $(this).attr("name");
		
		button_data = join_exp.exec(_buttonValue);
		
		if(_buttonValue.search(join_exp) > -1)
		{
			//setCookie("ajoin("+button_data[1]+")", $(this).val().toString());
			ws.send("<analogico 'val'='"+button_data[1]+"' 'comp'='"+$(this).val()+"'>up</analogico>");
		}
	});
	
	//interpreta checkbox	
	$("input[type=checkbox]").on('change mouseup', function(){
		
		_buttonValue = $(this).attr("name");
		
		button_data = join_exp.exec(_buttonValue);
		
		if(_buttonValue.search(join_exp) > -1)
		{
			val = 0;
			//arrasta botao de toggle
			if($(this).is(":checked"))
			{
				val = 1;
			}
			else
			{
				val = 0;
			}		
			
			//setCookie("djoin("+button_data[1]+")", val.toString());
			ws.send("<digital 'val'='"+button_data[1]+"' 'comp'='"+val+"'>up</digital>");
		}
	});
});


window.onbeforeunload=function() {
//	salva estado dos botoes
/*
	console.log("salvando estado dos botoes");
	
	for(i=0;i<$("input[type=range]").length;i++)
	{
		obj = $("input[type=range]").get(i);
		
		setCookie("a"+obj.getAttribute("name"), obj.getAttribute("value"));
	}
	
	
	for(i=0;i<$("input[type=checkbox]").length;i++)
	{
		obj = $("input[type=checkbox]").get(i);
		
		if(obj.checked)
		{
			val = 1;
		}
		else
		{
			val = 0;
		}	
			
		setCookie("d"+obj.getAttribute("name"), val);
	}
	*/
    thisSocket.onclose = function () {}; // disable onclose handler first
    thisSocket.close();
};

function createSocket()
{
	console.log("socket load");
	
	var portRegex = /\:\d\d\d\d/i;
	var hostResult = window.location.host.replace(portRegex, '');
	
	ws = new WebSocket("ws://"+hostResult+":8989/ui_talk");
	
	ws.onopen = function() {
	    console.log("Conexão Iniciada");
	};
	
	/*
	ws.onmessage = function (evt) {
	   alert(evt.data);
	};*/
	
	ws.onclose = function (event) {
        var reason;
		
        // See http://tools.ietf.org/html/rfc6455#section-7.4.1
        if (event.code == 1000)
            reason = "Normal closure, meaning that the purpose for which the connection was established has been fulfilled.";
        else if(event.code == 1001)
            reason = "An endpoint is \"going away\", such as a server going down or a browser having navigated away from a page.";
        else if(event.code == 1002)
            reason = "An endpoint is terminating the connection due to a protocol error";
        else if(event.code == 1003)
            reason = "An endpoint is terminating the connection because it has received a type of data it cannot accept (e.g., an endpoint that understands only text data MAY send this if it receives a binary message).";
        else if(event.code == 1004)
            reason = "Reserved. The specific meaning might be defined in the future.";
        else if(event.code == 1005)
            reason = "No status code was actually present.";
        else if(event.code == 1006)
           reason = "The connection was closed abnormally, e.g., without sending or receiving a Close control frame";
        else if(event.code == 1007)
            reason = "An endpoint is terminating the connection because it has received data within a message that was not consistent with the type of the message (e.g., non-UTF-8 [http://tools.ietf.org/html/rfc3629] data within a text message).";
        else if(event.code == 1008)
            reason = "An endpoint is terminating the connection because it has received a message that \"violates its policy\". This reason is given either if there is no other sutible reason, or if there is a need to hide specific details about the policy.";
        else if(event.code == 1009)
           reason = "An endpoint is terminating the connection because it has received a message that is too big for it to process.";
        else if(event.code == 1010) // Note that this status code is not used by the server, because it can fail the WebSocket handshake instead.
            reason = "An endpoint (client) is terminating the connection because it has expected the server to negotiate one or more extension, but the server didn't return them in the response message of the WebSocket handshake. <br /> Specifically, the extensions that are needed are: " + event.reason;
        else if(event.code == 1011)
            reason = "A server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request.";
        else if(event.code == 1015)
            reason = "The connection was closed due to a failure to perform a TLS handshake (e.g., the server certificate can't be verified).";
        else
            reason = "Unknown reason";

	  	 console.log(event.code + " - " + reason);
		
		setTimeout(function(){createSocket(); console.log("reconectando");}, 2000); // 2 segundos
    };
}
