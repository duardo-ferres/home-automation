$(document).ready(function(e) {
	for(i=0;i<$("input[type=range]").length;i++)
	{
		obj = $("input[type=range]").get(i);
		
		if(getCookie("a"+obj.getAttribute("name")) != "null")
		{
			obj.setAttribute("value",getCookie("a"+obj.getAttribute("name")));
		}
	}
	
	
	for(i=0;i<$("input[type=checkbox]").length;i++)
	{
		obj = $("input[type=checkbox]").get(i);
		
		value = getCookie("d"+obj.getAttribute("name"));
		
		if(value != "null")
		{
			if(value == 0)
			{
				obj.checked = false;
			}
			else if(value == 1)
			{
				obj.checked = true;
				
			}
		}
	}
	
//	alert(document.cookie);
});


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