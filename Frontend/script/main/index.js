$(document).ready(function(e) {		
	
	$("button").click(function(){
		_buttonValue = $(this).val();
		
		// processa comando goto
		goto_exp = /.*goto\[.*?\].*/;
		
		if((_buttonValue.search(goto_exp) > -1) && (_buttonValue.search("\>") > -1))
		{
			goto_exp = /goto\[(.*)?>(.*)?\]/;
			button_data = goto_exp.exec(_buttonValue);
			
			get_page(button_data[1] ,button_data[2]);

			//document.cookie = "ambiente="+button_data[1]+";";
			setCookie("ambiente",button_data[1]);
		}
		
		else if(_buttonValue.search(goto_exp) > -1)
		{
			goto_exp = /goto\[(.*)?\]/;
			button_data = goto_exp.exec(_buttonValue);
			if(getCookie("ambiente") != "")
			{
				get_page(getCookie("ambiente"), button_data[1]);
			}
			else
			{
				get_page("ambiente", button_data[1]);
			}
		}
		
		//processa join expression
		/*
		join_exp = /.*join\((.*)?\).*/;
		/*
		if(_buttonValue.search(join_exp) > -1)
		{
			
			button_data = join_exp.exec(_buttonValue);
			alert(button_data[1]);
		}*/
	});	
	
	$("button#comeBackButton").click(function(){
		console.log("salvando estado dos botoes");
	
		for(i=0;i<$("input[type=range]").length;i++)
		{
			obj = $("input[type=range]").get(i);
			
			console.log(obj);
			
			setCookie("a"+obj.getAttribute("name"), obj.value.toString());
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
				
			setCookie("d"+obj.getAttribute("name"), val.toString());
		}
	
		get_page(getCookie("ambiente"), "ambiente");
		
	});
});


function get_page(_address, _page){
	
	if(_address == "")
	{
		postData = {page : _page}
	}
	else
	{
		postData = {address : _address, page : _page}
	}
	
	//Registra comando em banco de dados			`ID`, `PRIMARYID`, `ESTRUTURA`, `TAGLIST`, `DESCRICAO`, `ATIVO`
	$.ajax({
	type: "POST",
	// url para o arquivo json.php
	url : "php/get_pages.php",
	data : postData,
	// dataType json
	dataType : "text",
	// função para de sucesso
	success : function(data){
			//processa sucesso repondo documento
			var newDoc = document.open("text/html", "replace");
			newDoc.write(data);
			newDoc.close();
//			$(_container).html(data);			
		}
	});
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
	
	for(m = 0; m<ca.length;m++)
	{
		var c=ca[m];
		while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
	}
	return "null";
} 

function setCookie(cname, cvalue)
{
	var name = cname + "=";
    var ca = document.cookie.split(';');
	var found = 0;
	
	for(l = 0; l<ca.length;l++)
	{
		var c=ca[l];
		while(c.charAt(0)==' ') {
            c = c.substring(1);
        }
		
        if (c.indexOf(name) == 0) {
			found = 1;
			break;
        }
	}
	
	if(found == 0)
	{
			var newcookie = name+cvalue+"; expires=Thu, 31 Dec 2099 23:59:00 GMT;";
			document.cookie = newcookie;
			
			console.log("saving - "+name+cvalue);
	}
	
	
	if(found == 1)
	{
			var newcookie = name+cvalue+"; expires=Thu, 31 Dec 2099 23:59:00 GMT";
			document.cookie = newcookie;
			
			console.log("updating - "+name+cvalue);
	}
	
	console.log(document.cookie);
}