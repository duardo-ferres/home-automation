$(document).ready(function(e) {
	$("#poffButton").click(function(){
		$("#confirmarGeralOff").css("visibility","visible");
	});
	
	
	$(".cancel").click(function(){
		$("#confirmarGeralOff").css("visibility","hidden");
	});
	
	$(".sure").click(function(){
		//Desceleciona todos
		$("input[type=range]").val(0);
		$("input[type=checkbox]").prop("checked", false);
		$("#confirmarGeralOff").css("visibility","hidden");
		
		//executa selects
		var inputs = document.querySelectorAll("input");
		//define o tempo em ms
		var constTempo = 150;
		//processa 1 por 1
		for (var i = 0; i < inputs.length; i++) {
			var name = inputs[i].name;
			
			tempo = constTempo*i;	
			callFunction(name,tempo);
			console.log(tempo)	;
		}
		
	});	
});

function callFunction(name,tempo){
	setTimeout(function(){
	$("input[name='"+name+"']").mouseup();
	}, tempo);
}