$(document).keydown(function(e){
	
	//fecha frame de add com esc
	if(e.keyCode == 27)
		$("#addValoresFrame").hide();
	
	//procede click no add com f2
	if(e.keyCode == 113)
		$("#floatingButton").click();
});

$(document).ready(function(e){
	
	//processa pagina de Comandos
	if($("#currentPage").html() == "comandos")
	{
		//CARREGA DADOS INICIAIS DA PAGINA
		loadCommandsPage();
		
		//****************************Processa Nome do Comand****************************//
		$(".commandName").keyup(function(e){
			//TRANSFORMA ESPACO EM UNDERLINE E TRANSFORMA DADOS EM UPERCASE
			$(".commandName").val($(".commandName").val().replace(" ","_"));
			$(".commandName").val($(".commandName").val().toUpperCase());
			
			//avisa se existe caractere nao permitido
			if($(".commandName").val().indexOf(" ") > -1)
			{
				//exiibe erro em interface
				$(".commandNameError").html("Nao Utilize de Espaços");
				$(".commandNameError").css("background","#F00");
			}
			else
			{
				//exiibe erro em interface
				$(".commandNameError").html("");
				$(".commandNameError").css("background","#FFF");
			}
	
		});
		
		//verifica se esta preenchido
		$(".commandName").focusout(function(e) {
            if($(".commandName").val().length < 2)
			{
				$(".commandNameError").html("Preencha com um Nome Valido");
				$(".commandNameError").css("background","#F00");
			}
			else{
				//exiibe erro em interface
				$(".commandNameError").html("");
				$(".commandNameError").css("background","#FFF");
				
				
				//verifica se key esta sendo usado
				isKeyUsed(".commandNameError",$(".commandName").val());
			}			
        });
		
		//********************Processa Tags Na parte dos Comandos*************************//		
		//reconhece as tags e a separa
		$(".commandTagList").keyup(function(e){				
			tagTemp = "";
			var tags = [];					
			
			//TRANSFORMA ESPACO EM UNDERLINE , TRANSFORMA DADOS EM UPERCASE E VIRGULA EM SEPARAÇAO
			$(".commandTagList").val($(".commandTagList").val().replace(",","|"));
			$(".commandTagList").val($(".commandTagList").val().replace(" ","_"));
			$(".commandTagList").val($(".commandTagList").val().toUpperCase());
			
			//reconhece os comandos e os separa
			for(i=0;i<$(".commandTagList").val().length;i++)
			{				
				if($(".commandTagList").val()[i] == "|")
				{
					tags.push(tagTemp);
					tagTemp = "";
				}				
				else
				{	
					tagTemp += $(".commandTagList").val()[i];
				}						
			}
			if(tagTemp != "")
			{
				//exibe sugestoes de tag
				getTagSugestion(".commandTagSugestion", tagTemp);
			}
			else
			{
				$(".commandTagSugestion").html("");
			}
			
			tags.push(tagTemp);
			
			//Exibe as tags em tela
			
			$(".commandTagListError").html("");
			
			for(i=0;i<tags.length;i++)
			{
					$(".commandTagListError").append("<t class='tagInsertList'>"+tags[i]+"</t>");
			}
			
		});
		
		//processa comando de adicionamento
		$("#actionForm .submitFormAction").click(function(){
			
				if($("#actionForm .commandName").val().length < 3)
				{
					alert("Insira um nome com mais de 3 Caracteres");
				}
				else if($("#actionForm .commandExtructure").val().length < 2)
				{
					alert("Insira uma Extrutura para o Comando");
				}
				else
				{
					//Registra comando em banco de dados			`ID`, `PRIMARYID`, `ESTRUTURA`, `TAGLIST`, `DESCRICAO`, `ATIVO`
					$.ajax({
					type: "POST",
					// url para o arquivo json.php
					url : "../php/set.php?CAT=COMANDOS&METHOD=INSERT",
					data : {PRIMARYID : $("#actionForm .commandName").val(), DESCRICAO : $("#actionForm .commandDesc").val(), ESTRUTURA : $("#actionForm .commandExtructure").val(), TAGLIST : $("#actionForm .commandTagList").val()},
					// dataType json
					dataType : "text",
					// função para de sucesso
					success : function(data){
							//processa sucesso
							alert(data);
							loadCommandsPage();
						}
					});
				}			
		});
	}
	
	//processa pagina de Equipamentos
	if($("#currentPage").html() == "equipamentos")
	{
		//CARREGA DADOS INICIAIS DA PAGINA
		loadEquipsPage();
		
		//****************************Processa Nome do Equipamento****************************//
		$(".equipmentName").keyup(function(e){
			
			//TRANSFORMA ESPACO EM UNDERLINE E TRANSFORMA DADOS EM UPERCASE
			$(".equipmentName").val($(".equipmentName").val().replace(" ","_"));
			$(".equipmentName").val($(".equipmentName").val().toUpperCase());
			
			//avisa se existe caractere nao permitido
			if($(".equipmentName").val().indexOf(" ") > -1)
			{
				//exiibe erro em interface
				$(".equipmentNameError").html("Nao Utilize de Espaços");
				$(".equipmentNameError").css("background","#F00");
			}
			else
			{
				//exiibe erro em interface
				$(".equipmentNameError").html("");
				$(".equipmentNameError").css("background","#FFF");
			}
	
		});		
		
		//verifica se esta preenchido
		$(".equipmentName").focusout(function(e) {
            if($(".equipmentName").val().length < 2)
			{
				$(".equipmentNameError").html("Preencha com um Nome Valido");
				$(".equipmentNameError").css("background","#F00");
			}
			else{
				//exiibe erro em interface
				$(".equipmentNameError").html("");
				$(".equipmentNameError").css("background","#FFF");
				
				
				//verifica se key esta sendo usado
				isKeyUsed(".equipmentNameError",$(".equipmentName").val());
			}			
        });
		
		//********************Processa Tags Na parte dos Equiamentos*************************//		
		//reconhece as tags e a separa
		$(".equipmentTagList").keyup(function(e){				
			tagTemp = "";
			var tags = [];					
			
			//TRANSFORMA ESPACO EM UNDERLINE , TRANSFORMA DADOS EM UPERCASE E VIRGULA EM SEPARAÇAO
			$(".equipmentTagList").val($(".equipmentTagList").val().replace(",","|"));
			$(".equipmentTagList").val($(".equipmentTagList").val().replace(" ","_"));
			$(".equipmentTagList").val($(".equipmentTagList").val().toUpperCase());
			
			//reconhece os comandos e os separa
			for(i=0;i<$(".equipmentTagList").val().length;i++)
			{				
				if($(".equipmentTagList").val()[i] == "|")
				{
					tags.push(tagTemp);
					tagTemp = "";
				}				
				else
				{	
					tagTemp += $(".equipmentTagList").val()[i];
				}						
			}
			if(tagTemp != "")
			{
				//exibe sugestoes de tag
				getTagSugestion(".equipmentTagSugestion", tagTemp);
			}
			else
			{
				$(".equipmentTagSugestion").html("");
			}
			
			tags.push(tagTemp);
			
			//Exibe as tags em tela
			
			$(".equipmentTagListError").html("");
			
			for(i=0;i<tags.length;i++)
			{
					$(".equipmentTagListError").append("<t class='tagInsertList'>"+tags[i]+"</t>");
			}			
		});
		
		//interpreta submiçao de dados
		$("#actionForm .submitFormAction").click(function(){
			
				if($("#actionForm .equipmentName").val().length < 3)
				{
					alert("Insira um nome com mais de 3 Caracteres");
				}
				else if($("#actionForm .equipmentAddress").val().length < 1)
				{
					alert("Insira um Endereço para o Equipamneto");
				}
				else
				{
					
					//Registra comando em banco de dados
					$.ajax({
					type: "POST",
					// url para o arquivo json.php
					url : "../php/set.php?CAT=EQUIPAMENTOS&METHOD=INSERT",data : {NOME : $("#actionForm .equipmentName").val(),DESCRICAO : $("#actionForm .equipmentDesc").val(),TAGLIST : $("#actionForm .equipmentTagList").val(),ENDERECO : $("#actionForm .equipmentAddress").val(), PROTOCOLO : $("#actionForm .protocolList").val()},
					// dataType json
					dataType : "text",
					// função para de sucesso
					success : function(data){
							//processa sucesso
							alert(data);
							loadEquipsPage();
						}
					});			
				}		
		});
	}
	
	//processa pagina de Gatilhos
	if($("#currentPage").html() == "gatilhos")
	{
		//CARREGA DADOS INICIAIS DA PAGINA
		loadTrigersPage();
		
		//****************************Processa Nome do Equipamento****************************//
		$(".trigerName").keyup(function(e){
			
			//TRANSFORMA ESPACO EM UNDERLINE E TRANSFORMA DADOS EM UPERCASE
			$(".trigerName").val($(".trigerName").val().replace(" ","_"));
			$(".trigerName").val($(".trigerName").val().toUpperCase());
			
			//avisa se existe caractere nao permitido
			if($(".trigerName").val().indexOf(" ") > -1)
			{
				//exiibe erro em interface
				$(".trigerNameError").html("Nao Utilize de Espaços");
				$(".trigerNameError").css("background","#F00");
			}
			else
			{
				//exiibe erro em interface
				$(".trigerNameError").html("");
				$(".trigerNameError").css("background","#FFF");
			}
	
		});		
		
		//verifica se esta preenchido
		$(".trigerName").focusout(function(e) {
            if($(".trigerName").val().length < 2)
			{
				$(".trigerNameError").html("Preencha com um Nome Valido");
				$(".trigerNameError").css("background","#F00");
			}
			else{
				//exiibe erro em interface
				$(".trigerNameError").html("");
				$(".trigerNameError").css("background","#FFF");
				
				
				//verifica se key esta sendo usado
				isKeyUsed(".trigerNameError",$(".trigerName").val());
			}			
        });
		
		//********************Processa Tags Na parte dos Equiamentos*************************//		
		//reconhece as tags e a separa
		$(".trigerTagList").keyup(function(e){				
			tagTemp = "";
			var tags = [];					
			
			//TRANSFORMA ESPACO EM UNDERLINE , TRANSFORMA DADOS EM UPERCASE E VIRGULA EM SEPARAÇAO
			$(".trigerTagList").val($(".trigerTagList").val().replace(",","|"));
			$(".trigerTagList").val($(".trigerTagList").val().replace(" ","_"));
			$(".trigerTagList").val($(".trigerTagList").val().toUpperCase());
			
			//reconhece os comandos e os separa
			for(i=0;i<$(".trigerTagList").val().length;i++)
			{				
				if($(".trigerTagList").val()[i] == "|")
				{
					tags.push(tagTemp);
					tagTemp = "";
				}				
				else
				{	
					tagTemp += $(".trigerTagList").val()[i];
				}						
			}
			if(tagTemp != "")
			{
				//exibe sugestoes de tag
				getTagSugestion(".trigerTagSugestion", tagTemp);
			}
			else
			{
				$(".trigerTagSugestion").html("");
			}
			
			tags.push(tagTemp);
			
			//Exibe as tags em tela
			
			$(".trigerTagListError").html("");
			
			for(i=0;i<tags.length;i++)
			{
					$(".trigerTagListError").append("<t class='tagInsertList'>"+tags[i]+"</t>");
			}			
		});
		
		
		//***********Processa Submicao de dados de Gatilhos***************//
		$("#actionForm .submitFormAction").click(function(){
			
				if($("#actionForm .trigerName").val().length < 3)
				{
					alert("Insira um nome com mais de 3 Caracteres");
				}
				else if($("#actionForm .trigerCommand").val() == "null")
				{
					alert("Insira um Comando Valido ou Cadastre um caso não esteja na lista");
				}
				else if($("#actionForm .trigerEquipment").val() == "null")
				{
					alert("Insira um Equipamento Valido ou Cadastre um caso não esteja na lista");
				}
				else
				{
					//Registra comando em banco de dados
					$.ajax({
					type: "POST",
					// url para o arquivo json.php
					url : "../php/set.php?CAT=GATILHOS&METHOD=INSERT",data : {
						NOME : $("#actionForm .trigerName").val(),
						DESCRICAO : $("#actionForm .trigerDesc").val(),
						TAGLIST : $("#actionForm .trigerTagList").val(),
						EQUIPAMENTO : $("#actionForm .trigerEquipment").val(),
						COMANDO : $("#actionForm .trigerCommand").val(),},
						
					// dataType json
					dataType : "text",
					// função para de sucesso
					success : function(data){
							//processa sucesso
							alert(data);
							loadTrigersPage();
						}
					});
				}			
		});
	}
	
	//processa pagina de Acoes [ JOINS ]
	if($("#currentPage").html() == "acoes")
	{
		//CARREGA DADOS INICIAIS DA PAGINA
		loadActionsPage();
		
		//carrega com since anterior
		$.ajax({
			// url para o arquivo json.php
			url : "../php/ajax.php?FN=lastDigitalSince",
			// dataType json
			dataType : "text",
			// função para de sucesso
			success : function(data){
				// vamos gerar um html e guardar nesta variável	
					$("#digitalList #since").val(data);
					$("#digitalList #since").keyup();
				}
		});
		
		$.ajax({
			// url para o arquivo json.php
			url : "../php/ajax.php?FN=lastAnalogSince",
			// dataType json
			dataType : "text",
			// função para de sucesso
			success : function(data){
				// vamos gerar um html e guardar nesta variável	
					$("#analogList #since").val(data);
					$("#analogList #since").keyup();
				}
		});
		
		$.ajax({
				// url para o arquivo json.php
				url : "../php/ajax.php?FN=lastSerialSince",
				// dataType json
				dataType : "text",
				// função para de sucesso
				success : function(data){
					// vamos gerar um html e guardar nesta variável	
						$("#serialList #since").val(data);
						$("#serialList #since").keyup();
					}
			});
		
		//executa demais dados
		$("table").on("click", "#editPrimaryID", function(e) {
			
			if($(".actionNameID").html() != $(this).val())
			{
				if($(this).val().search("D") > -1)
				{
					//carrega valor anterior
					getJoinName(".joinName",$(this).val().replace("D",""),"D");
				}
				else if($(this).val().search("A") > -1)
				{
					//carrega valor anterior
					getJoinName(".joinName",$(this).val().replace("A",""),"A");
				}
				else if($(this).val().search("S") > -1)
				{
					//carrega valor anterior
					getJoinName(".joinName",$(this).val().replace("S",""),"S");
				}
			}
			
			$(".actionID").html($(this).val());
			$(".actionNameID").html($(this).val());
			
			//mostra frame principal
			$("#addValoresFrame").show();
			
			//oculta frames inuteis e inicia o necessario
			$(".joinNameFrame").show();
			$(".joinTagsFrame").hide();
			$(".joinScriptFrame").hide();
			$(".joinDescricaoFrame").hide();
			
			//trabalha dados de nomes
			//substitui espacos e transforma em uppercase
			$(".joinName").keyup(function(e){
				
				//TRANSFORMA ESPACO EM UNDERLINE E TRANSFORMA DADOS EM UPERCASE
				$(".joinName").val($(".joinName").val().replace(" ","_"));
				$(".joinName").val($(".joinName").val().toUpperCase());
				
				//avisa se existe caractere nao permitido
				if($(".joinName").val().indexOf(" ") > -1)
				{
					//exiibe erro em interface
					$(".joinNameError").html("Nao Utilize de Espaços");
					$(".joinNameError").css("background","#F00");
				}
				else
				{
					//exiibe erro em interface
					$(".joinNameError").html("");
					$(".joinNameError").css("background","#FFF");
				}		
			});	
			
			// Verifica se nome ja existe
			$(".joinName").focusout(function(){
				isKeyUsed(".joinNameError",$(".joinName").val());
			});
			
			// Submete dados
			$("#submitNameFormAction").click(function(){
				var confirmation = confirm("Voce Deseja mesmo registrar o campo a seguir");
				if(confirmation == true)
				{
					if($(".joinNameError").html() == "")
					{
						_id = "";
						_type = "";
						_name = $(".joinName").val();
						
//						verifica tipo da acao
						if($(".actionID").html().search("D") > -1)
						{
							_id = $(".actionID").html().replace("D","");
							_type = "DIGITAL";
						}
						else if($(".actionID").html().search("A") > -1)
						{
							_id = $(".actionID").html().replace("A","");
							_type = "ANALOG";
						}
						else if($(".actionID").html().search("S") > -1)
						{
							_id = $(".actionID").html().replace("S","");
							_type = "SERIAL";
						}
						
						//registra nome do join
						$.ajax({
								//define como post
								type: "post",
								// url para o arquivo json.php
								url : "../php/set.php?METHOD=INSERT&CAT=JOIN",
								//dado enviado
								data: {ID:_id,TYPE:_type, NOME:_name},
								// dataType json
								dataType : "text",
								// função para de sucesso
								success : function(data){
									// vamos gerar um html e guardar nesta variável	
										setTimeout(location.reload(), 1500);
									}
							});
					}
				}
			})
		});
		
		$("table").on("click", "#editTagList", function(e) {
			if($(".actionTagID").html() != $(this).val())
			{
				if($(this).val().search("D") > -1)
				{
					//carrega valor anterior
					getJoinTag(".joinTagList",$(this).val().replace("D",""),"D");
				}
				else if($(this).val().search("A") > -1)
				{
					//carrega valor anterior
					getJoinTag(".joinTagList",$(this).val().replace("A",""),"A");
				}
				else if($(this).val().search("S") > -1)
				{
					//carrega valor anterior
					getJoinTag(".joinTagList",$(this).val().replace("S",""),"S");
				}
			}
			
			$(".actionID").html($(this).val());
			$(".actionTagID").html($(this).val());
			
			//mostra frame principal
			$("#addValoresFrame").show();
			
			//oculta frames inuteis e inicia o necessario
			$(".joinNameFrame").hide();
			$(".joinTagsFrame").show();
			$(".joinScriptFrame").hide();
			$(".joinDescricaoFrame").hide();
			
			//********************Processa Tags Na parte dos Equiamentos*************************//		
			//reconhece as tags e a separa
			$(".joinTagList").keyup(function(e){				
				tagTemp = "";
				var tags = [];					
				
				//TRANSFORMA ESPACO EM UNDERLINE , TRANSFORMA DADOS EM UPERCASE E VIRGULA EM SEPARAÇAO
				$(".joinTagList").val($(".joinTagList").val().replace(",","|"));
				$(".joinTagList").val($(".joinTagList").val().replace(" ","_"));
				$(".joinTagList").val($(".joinTagList").val().toUpperCase());
				
				//reconhece os comandos e os separa
				for(i=0;i<$(".joinTagList").val().length;i++)
				{				
					if($(".joinTagList").val()[i] == "|")
					{
						tags.push(tagTemp);
						tagTemp = "";
					}				
					else
					{	
						tagTemp += $(".joinTagList").val()[i];
					}						
				}
				if(tagTemp != "")
				{
					//exibe sugestoes de tag
					getTagSugestion(".joinTagSugestion", tagTemp);
				}
				else
				{
					$(".joinTagSugestion").html("");
				}
				
				tags.push(tagTemp);
				
				//Exibe as tags em tela
				
				$(".joinTagListError").html("");
				
				for(i=0;i<tags.length;i++)
				{
						$(".joinTagListError").append("<t class='tagInsertList'>"+tags[i]+"</t>");
				}			
			});
			
			$("#submitTagFormAction").click(function(){
				var confirmation = confirm("Voce Deseja mesmo registrar o campo a seguir");
				if(confirmation == true)
				{
					_id = "";
					_type = "";
					_tagList = $(".joinTagList").val();
					
//						verifica tipo da acao
					if($(".actionID").html().search("D") > -1)
					{
						_id = $(".actionID").html().replace("D","");
						_type = "DIGITAL";
					}
					else if($(".actionID").html().search("A") > -1)
					{
						_id = $(".actionID").html().replace("A","");
						_type = "ANALOG";
					}
					else if($(".actionID").html().search("S") > -1)
					{
						_id = $(".actionID").html().replace("S","");
						_type = "SERIAL";
					}
					
					//registra nome do join
					$.ajax({
							//define como post
							type: "post",
							// url para o arquivo json.php
							url : "../php/set.php?METHOD=INSERT&CAT=JOIN",
							//dado enviado
							data: {ID:_id,TYPE:_type, TAGLIST:_tagList},
							// dataType json
							dataType : "text",
							// função para de sucesso
							success : function(data){
								// vamos gerar um html e guardar nesta variável	
									setTimeout(location.reload(), 1500);
								}
						});
				}
			})
		});
		
		$("table").on("click", "#editScript", function(e) {	
			//limpa caso seja um join diferente
			if($(".actionScriptID").html() != $(this).val())
			{
				if($(this).val().search("D") > -1)
				{
					//carrega valor anterior
					getJoinScript(".joinScript",$(this).val().replace("D",""),"D");
				}
				else if($(this).val().search("A") > -1)
				{
					//carrega valor anterior
					getJoinScript(".joinScript",$(this).val().replace("A",""),"A");
				}
				else if($(this).val().search("S") > -1)
				{
					//carrega valor anterior
					getJoinScript(".joinScript",$(this).val().replace("S",""),"S");
				}
			}
					
			$(".actionID").html($(this).val());
			$(".actionScriptID").html($(this).val());
			
			//mostra frame principal
			$("#addValoresFrame").show();
			
			//oculta frames inuteis e inicia o necessario
			$(".joinNameFrame").hide();
			$(".joinTagsFrame").hide();
			$(".joinScriptFrame").show();
			$(".joinDescricaoFrame").hide();
			
			//converte dados a uppercasoe e retira espacos adicionando underline
			$(".joinScript").keyup(function(e){
				$(".joinScript").val($(".joinScript").val().replace(" ","_"));
				$(".joinScript").val($(".joinScript").val().toUpperCase());
				
				
				//exibe sugestões na tela de acordo com a entrada de caracteres
				//busca sugestao de tags
				lastScriptWord = "";
				
				//verifica ultima palavra digitada
				for(i=0; i<$(".joinScript").val().length;i++)
				{
					if((!isLetter($(".joinScript").val()[i])) && ($(".joinScript").val()[i] != "_"))
					{
						lastScriptWord = "";
					}
					else
					{
						lastScriptWord += $(".joinScript").val()[i];
					}
				}
				
				//adiciona sugestoes na tela
				
				getScriptSugestion(".tagSugestions",lastScriptWord,"TAG");
				getScriptSugestion(".nameSugestions",lastScriptWord,"NAM");
				getScriptSugestion(".comandSugestions",lastScriptWord,"COM");
			});
			
			//adiciona ; com enter
			$(".joinScript").keydown(function(e){
				if(e.keyCode == 13)
				{
					if(($(".joinScript").val().lastIndexOf(";") != $(".joinScript").val().length-1)&&($(".joinScript").val().lastIndexOf("\n") != $(".joinScript").val().length-1))
						$(".joinScript").val($(".joinScript").val()+";");
				}
			});
			
			$("#submitScriptFormAction").click(function(){
				var confirmation = confirm("Voce Deseja mesmo registrar o campo a seguir");
				if(confirmation == true)
				{
					_id = "";
					_type = "";
					_script = $(".joinScript").val();
					
//						verifica tipo da acao
					if($(".actionID").html().search("D") > -1)
					{
						_id = $(".actionID").html().replace("D","");
						_type = "DIGITAL";
					}
					else if($(".actionID").html().search("A") > -1)
					{
						_id = $(".actionID").html().replace("A","");
						_type = "ANALOG";
					}
					else if($(".actionID").html().search("S") > -1)
					{
						_id = $(".actionID").html().replace("S","");
						_type = "SERIAL";
					}
					
					//registra nome do join
					$.ajax({
							//define como post
							type: "post",
							// url para o arquivo json.php
							url : "../php/set.php?METHOD=INSERT&CAT=JOIN",
							//dado enviado
							data: {ID:_id,TYPE:_type, SCRIPT:_script},
							// dataType json
							dataType : "text",
							// função para de sucesso
							success : function(data){
								// vamos gerar um html e guardar nesta variável	
									setTimeout(location.reload(), 1500);
								}
						});
				}
			})
		});
		
		$("table").on("click", "#editDescricao", function(e) {
			//limpa caso seja um join diferente
			//limpa caso seja um join diferente
			if($(".actionDescID").html() != $(this).val())
			{
				if($(this).val().search("D") > -1)
				{
					//carrega valor anterior
					getJoinDesc(".joinDesc",$(this).val().replace("D",""),"D");
				}
				else if($(this).val().search("A") > -1)
				{
					//carrega valor anterior
					getJoinDesc(".joinDesc",$(this).val().replace("A",""),"A");
				}
				else if($(this).val().search("S") > -1)
				{
					//carrega valor anterior
					getJoinDesc(".joinDesc",$(this).val().replace("S",""),"S");
				}
			}
			
			$(".actionID").html($(this).val());
			$(".actionDescID").html($(this).val());
			
			//mostra frame principal
			$("#addValoresFrame").show();
			
			//oculta frames inuteis e inicia o necessario
			$(".joinNameFrame").hide();
			$(".joinTagsFrame").hide();
			$(".joinScriptFrame").hide();
			$(".joinDescricaoFrame").show();
			
			
			
			$("#submitDescFormAction").click(function(){
				var confirmation = confirm("Voce Deseja mesmo registrar o campo a seguir");
				if(confirmation == true)
				{
					var confirmation = confirm("Voce Deseja mesmo registrar o campo a seguir");
					if(confirmation == true)
					{
						_id = "";
						_type = "";
						_desc = $(".joinDesc").val();
						
	//						verifica tipo da acao
						if($(".actionID").html().search("D") > -1)
						{
							_id = $(".actionID").html().replace("D","");
							_type = "DIGITAL";
						}
						else if($(".actionID").html().search("A") > -1)
						{
							_id = $(".actionID").html().replace("A","");
							_type = "ANALOG";
						}
						else if($(".actionID").html().search("S") > -1)
						{
							_id = $(".actionID").html().replace("S","");
							_type = "SERIAL";
						}
						
						//registra nome do join
						$.ajax({
								//define como post
								type: "post",
								// url para o arquivo json.php
								url : "../php/set.php?METHOD=INSERT&CAT=JOIN",
								//dado enviado
								data: {ID:_id,TYPE:_type, DESCRICAO:_desc},
								// dataType json
								dataType : "text",
								// função para de sucesso
								success : function(data){
									// vamos gerar um html e guardar nesta variável	
										setTimeout(location.reload(), 1500);
									}
							});
					}
				}
			})
		});
		
		$("table").on("click", "#clear", function(e) {
			alert($(this).val());
		});
		
		
		/*
		//executa a autodetecção de join
		// http://localhost/automacao/php/get.php?RTM=BTJ&TRY=40
		
		$(".findJoin").click(function(){
			
			$(".actionJoin").val("Aperte a Tecla desejada.. 10 segundos restantes");
			//executa detecção
			$.ajax({
				// url para o arquivo json.php
				url : "../php/get.php?RTM=BTJ&TRY=10",					
				// dataType json
				dataType : "text",
				// função para de sucesso
				success : function(data){
						//processa sucesso
						if(data != "")
						{
							$(".actionJoin").val(data);
						}
						else
						{
							$(".actionJoin").val("Nenhuma Tecla Reconhecida").delay(500).val("");
						}
					}
				});
		});
		*/
	}
	
	//processa pagina de Clientes
	if($("#currentPage").html() == "clientes")
	{
		//CARREGA DADOS INICIAIS DA PAGINA
		loadClientsPage();
		
		//verfica campo de Nome
		$("#actionForm .clientName").keyup(function(e){
			//REtira espaco es caracteres inuteis
			$(".clientName").val($(".clientName").val().replace(" ","_"));
			$(".clientName").val($(".clientName").val().toUpperCase());
		});
		
		//verfica campo de porta
		$("#actionForm .clientPort").keyup(function(e){
			for(i=0;i<$("#actionForm .clientPort").val().length;i++)
			{
				//remove qualquer caractere nao numerico
				if(isNaN($("#actionForm .clientPort").val()[i]))
				{
					$("#actionForm .clientPort").val($("#actionForm .clientPort").val().slice(0,i));
				}
				
				//permite apenas 4 caracteres de porta
				$("#actionForm .clientPort").val($("#actionForm .clientPort").val().slice(0,4));
				
			}
		});
		
		$("#actionForm .submitFormAction").click(function(){
			
				if($("#actionForm .clientName").val().length < 3)
				{
					alert("Insira um nome com mais de 3 Caracteres");
				}
				else if(($("#actionForm .clientPort").val() < 0)||($("#actionForm .clientPort").val() > 9999))
				{
					alert("Insira uma porta valida");
				}
				else
				{
					//faz registro do Cliente
					//Registra comando em banco de dados
					$.ajax({
					type: "POST",
					// url para o arquivo json.php
					url : "../php/set.php?CAT=CLIENTES&METHOD=INSERT",
					data : {
						NOME : $("#actionForm .clientName").val(),
						PORTA : $("#actionForm .clientPort").val()},
						
					// dataType json
					dataType : "text",
					// função para de sucesso
					success : function(data){
							//processa sucesso
							alert(data);
						}
					});
				}
				
				loadClientsPage();			
		});
	}
	
	//processa pagina de Logs
	if($("#currentPage").html() == "logs")
	{
		//CARREGA DADOS INICIAIS DA PAGINA
		loadLogsPage();
		
		$("#actionForm .submitFormAction").click(function(){
			
				if($("#actionForm .ambientName").val().length < 3)
				{
					alert("Insira um nome com mais de 3 Caracteres");
				}
				else
				{
					alert($("#actionForm .ambientName").val());
				}			
		});
	}
	
	//apaga registro se for clicado
	$("table").on("click", "#erase", function(e) {
		var apagar = confirm('Deseja realmente excluir este registro? \n \n (Isto Apagará Permanentemente o Registro)');
      	if (apagar)
		{
			category = "";
			
			switch($("#currentPage").html()){
				case "ambientes":
					category = "AMBIENTES";
				break;
				case "comandos":
					category = "COMANDOS";
				break;
				case "equipamentos":
					category = "EQUIPAMENTOS";
				break;
				case "gatilhos":
					category = "GATILHOS";
				break;
				case "acoes":
					category = "ACOES";
				break;
				case "clientes":
					category = "CLIENTES";
				break;
				case "logs":
					category = "LOGS";
				break;
				default:
					alert($("#currentPage").html());
				break;				
			}
			
			$.ajax({
					//define metodo
					type: "post",
					// url para o arquivo json.php
					url : "../php/set.php?CAT="+category+"&METHOD=DELETE",
					// dataType json
					dataType : "text",
					//insere dados
					data: {ID: $(this).val()},
					// função para de sucesso
					success : function(data){
						// vamos gerar um html e guardar nesta variável
						alert(data);
					}
				});
				
			switch($("#currentPage").html()){
				case "ambientes":
					loadAmbientsPage();
				break;
				case "comandos":
					loadCommandsPage();
				break;
				case "equipamentos":
					loadEquipsPage();
				break;
				case "gatilhos":
					loadTrigersPage();
				break;
				case "acoes":
					loadActionsPage();
				break;
				case "clientes":
					loadClientsPage();
				break;
				case "logs":
					loadLogsPage();
				break;
				default:
					alert($("#currentPage").html());
				break;				
			}
		}
		else
		{
			event.preventDefault();
		}	
	});
	
	//processa clique de edicao
	$("table").on("click", "#edit", function(e) {
		
		category = "";
		
		//carrega dados na tela
		switch($("#currentPage").html()){
			case "comandos":
				category = "COMANDOS";
			break;
			case "equipamentos":
				category = "EQUIPAMENTOS";
			break;
			case "gatilhos":
				category = "GATILHOS";
			break;
			case "acoes":
				category = "ACOES";
			break;
			case "clientes":
				category = "CLIENTES";
			break;
			case "logs":
				category = "LOGS";
			break;
			default:
				alert($("#currentPage").html());
			break;				
		}
			
		switch($("#currentPage").html()){
			case "ambientes":
				loadAmbientsPage();
			break;
			case "comandos":
				loadCommandsPage();
			break;
			case "equipamentos":
				loadEquipsPage();
			break;
			case "gatilhos":
				loadTrigersPage();
			break;
			case "acoes":
				loadActionsPage();
			break;
			case "clientes":
				loadClientsPage();
			break;
			case "logs":
				loadLogsPage();
			break;
			default:
				alert($("#currentPage").html());
			break;				
		}

	});
	
});
/*Busca Sugestoes para script*/
function getScriptSugestion(_responseContainer, _key, _type)
{
	if(_type == "TAG")
	{
		$.ajax({
			//define como post
			type: "post",
			// url para o arquivo json.php
			url : "../php/ajax.php?FN=getTagSugestion",
			//dado enviado
			data: {TAG:_key},
			// dataType json
			dataType : "json",
			// função para de sucesso
			success : function(data){
				// vamos gerar um html e guardar nesta variável		
				$(_responseContainer).html("");	
							
				if(data.length >= 1)
				{
					for(i=0;i<data.length;i++)
					{
						$(_responseContainer).append("<div class='tagInsertList'>"+data[i].TAG+"</div>");
						if(i==3) break;
					}
				}
				else
				{
					$(_responseContainer).html("");
				}
			}
		});
	}
	
	
	if(_type == "COM")
	{
		$.ajax({
			//define como post
			type: "post",
			// url para o arquivo json.php
			url : "../php/ajax.php?FN=getComandSugestion",
			//dado enviado
			data: {COMAND:_key},
			// dataType json
			dataType : "json",
			// função para de sucesso
			success : function(data){
				// vamos gerar um html e guardar nesta variável	
				$(_responseContainer).html("");	
							
				if(data.length >= 1)
				{
					for(i=0;i<data.length;i++)
					{
						$(_responseContainer).append("<div class='tagInsertList'>"+data[i].COMAND+"</div>");
						if(i==3) break;
					}
				}
				else
				{
					$(_responseContainer).html("");
				}
			}
		});
	}
	
	
	if(_type == "NAM")
	{
		$.ajax({
			//define como post
			type: "post",
			// url para o arquivo json.php
			url : "../php/ajax.php?FN=getNameSugestion",
			//dado enviado
			data: {NOME:_key},
			// dataType json
			dataType : "json",
			// função para de sucesso
			success : function(data){
				// vamos gerar um html e guardar nesta variável	
				$(_responseContainer).html("");	
							
				if(data.length >= 1)
				{
					for(i=0;i<data.length;i++)
					{
						$(_responseContainer).append("<div class='tagInsertList'>"+data[i].NOME+"</div>");
						if(i==3) break;
					}
				}
				else
				{
					$(_responseContainer).html("");
				}
			}
		});
	}
}


function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

function getJoinName(_responseContainer, _id, _type)
{			
	$.ajax({
			//define como post
			type: "post",
			// url para o arquivo json.php
			url : "../php/ajax.php?FN=getJoinName",
			//dado enviado
			data: {ID:_id,TYPE:_type},
			// dataType json
			dataType : "text",
			// função para de sucesso
			success : function(data){
				// vamos gerar um html e guardar nesta variável	
					$(_responseContainer).val(data);
				}
		});
}

function getJoinTag(_responseContainer, _id, _type)
{			
	$.ajax({
			//define como post
			type: "post",
			// url para o arquivo json.php
			url : "../php/ajax.php?FN=getJoinTag",
			//dado enviado
			data: {ID:_id,TYPE:_type},
			// dataType json
			dataType : "text",
			// função para de sucesso
			success : function(data){
				// vamos gerar um html e guardar nesta variável	
					$(_responseContainer).val(data);
				}
		});
}

function getJoinScript(_responseContainer, _id, _type)
{			
	$.ajax({
			//define como post
			type: "post",
			// url para o arquivo json.php
			url : "../php/ajax.php?FN=getJoinScript",
			//dado enviado
			data: {ID:_id,TYPE:_type},
			// dataType json
			dataType : "text",
			// função para de sucesso
			success : function(data){
				// vamos gerar um html e guardar nesta variável	
					$(_responseContainer).val(data);
				}
		});
}

function getJoinDesc(_responseContainer, _id, _type)
{			
	$.ajax({
			//define como post
			type: "post",
			// url para o arquivo json.php
			url : "../php/ajax.php?FN=getJoinDesc",
			//dado enviado
			data: {ID:_id,TYPE:_type},
			// dataType json
			dataType : "text",
			// função para de sucesso
			success : function(data){
				// vamos gerar um html e guardar nesta variável	
					$(_responseContainer).val(data);
				}
		});
}

function isKeyUsed(_responseContainer, _key)
{			
	$.ajax({
			//define como post
			type: "post",
			// url para o arquivo json.php
			url : "../php/ajax.php?FN=isKeyUsed",
			//dado enviado
			data: {KEY:_key},
			// dataType json
			dataType : "text",
			// função para de sucesso
			success : function(data){
				// vamos gerar um html e guardar nesta variável		
				if(data == "true")
				{
					$(_responseContainer).html("Esta chave ja esta em uso atualmente");
					$(_responseContainer).css("background","#F00");
				}
				else
				{
					$(_responseContainer).html("");
					$(_responseContainer).css("background","#FFF");
				}
			}
		});
}

function getTagSugestion(_responseContainer, _key)
{			
	$.ajax({
			//define como post
			type: "post",
			// url para o arquivo json.php
			url : "../php/ajax.php?FN=getTagSugestion",
			//dado enviado
			data: {TAG:_key},
			// dataType json
			dataType : "json",
			// função para de sucesso
			success : function(data){
				// vamos gerar um html e guardar nesta variável		
				$(_responseContainer).html("");	
							
				if(data.length >= 1)
				{
					for(i=0;i<data.length;i++)
					{
						$(_responseContainer).append("<t class='tagInsertList'>"+data[i].TAG+"</t>");
						if(i==8) break;
					}
				}
				else
				{
					$(_responseContainer).html("");
				}
			}
		});
}

function loadCommandsPage()
{
	//adiciona cabeçalho a tabela
	html = "";
	
		$.ajax({
			// url para o arquivo json.php
			url : "../php/get.php?CAT=COMANDOS",
			// dataType json
			dataType : "json",
			// função para de sucesso
			success : function(data){
				// vamos gerar um html e guardar nesta variável
				
				for(i=0;i<data.length;i++)
				{
					eraseAction = "DESATIVAR";
					 
					if(data[i].ATIVO == "true")
					{
						eraseAction = "DESATIVAR";
					}
					else if(data[i].ATIVO == "false")
					{
						eraseAction = "ATIVAR";
					}
					
					html = html+"<tr><td>"+data[i].ID+"</td><td>"+data[i].PRIMARYID+"</td><td>"+data[i].ESTRUTURA+"</td><td>"+data[i].DESCRICAO+"</td><td>"+data[i].TAGLIST+"</td><td>"+"<button style='width:100%' id='edit' value='"+data[i].ID+"'>Editar</button>"+"</td><td>"+"<button style='width:100%' id='erase' value='"+data[i].ID+"'>"+eraseAction+"</button>"+"</td></tr>";
				}
				
				//adiciona a pagina
				$(".dadosAtuais").replaceWith(html);
			}
		});
		
		$(".dadosAtuais").html(html);
}

function loadEquipsPage()
{
	//adiciona cabeçalho
	html = "";
				
		$.ajax({
			// url para o arquivo json.php
			url : "../php/get.php?CAT=EQUIPAMENTOS",
			// dataType json
			dataType : "json",
			// função para de sucesso
			success : function(data){
				// vamos gerar um html e guardar nesta variável
				for(i=0;i<data.length;i++)
				{
					html = html+"<tr><td>"+data[i].ID+"</td><td>"+data[i].PRIMARYID+"</td><td>"+data[i].ENDERECO+"</td><td>"+data[i].PROTOCOLO+"</td><td>"+data[i].TAGLIST+"</td><td>"+data[i].DESCRICAO+"</td><td>"+"<button style='width:100%' id='edit' value='"+data[i].ID+"'>Editar</button>"+"</td><td>"+"<button style='width:100%' id='erase' value='"+data[i].ID+"'>Excluir</button>"+"</td></tr>";
				}
				
				//[{"ID":"2","PRIMARYID":"teste","ENDERECO":"","PROTOCOLO":"","TAGLIST":"","DESCRICAO":""}]
				
				//adiciona a pagina
				$(".dadosAtuais").replaceWith(html);
			}
		});
}

function loadTrigersPage()
{
	//carrega cabeçalhos
	html = "";
	
		$.ajax({
			// url para o arquivo json.php
			url : "../php/get.php?CAT=GATILHOS",
			// dataType json
			dataType : "json",
			// função para de sucesso
			success : function(data){
				// vamos gerar um html e guardar nesta variável
								
				for(i=0;i<data.length;i++)
				{
					html = html+"<tr><td>"+data[i].ID+"</td><td>"+data[i].PRIMARYID+"</td><td>"+data[i].COMANDO+"</td><td>"+data[i].EQUIPAMENTO+"</td><td>"+data[i].TAGLIST+"</td><td>"+data[i].DESCRICAO+"</td><td>"+"<button style='width:100%' id='edit' value='"+data[i].ID+"'>Editar</button>"+"</td><td>"+"<button style='width:100%' id='erase' value='"+data[i].ID+"'>Excluir</button>"+"</td></tr>";
				}
				
				//adiciona a pagina
				$(".dadosAtuais").replaceWith(html);
			}
		});
		
		//adiciona valores aos formularios
		//adiciona Equipamentos
		$.ajax({
			// url para o arquivo json.php
			url : "../php/get.php?CAT=EQUIPAMENTOS",
			// dataType json
			dataType : "json",
			// função para de sucesso
			success : function(data){
				// vamos gerar um html e guardar nesta variável
				valores = "";
				for(i=0;i<data.length;i++)
				{
					valores = valores+"<option value='"+data[i].PRIMARYID+"'>"+data[i].PRIMARYID+"</option>";					
				}
				
				//adiciona a pagina
				$(".trigerEquipment").html(valores);
			}
		});
		//adiciona Comandos
		$.ajax({
			// url para o arquivo json.php
			url : "../php/get.php?CAT=COMANDOS",
			// dataType json
			dataType : "json",
			// função para de sucesso
			success : function(data){
				// vamos gerar um html e guardar nesta variável
				valores = "";
				for(i=0;i<data.length;i++)
				{
					valores = valores+"<option value='"+data[i].PRIMARYID+"'>"+data[i].PRIMARYID+"</option>";
				}
				
				//adiciona a pagina
				$(".trigerCommand").html(valores);
			}
		});
}

function loadActionsPage()
{	
	//mostra e oculta dados na tabela clicando no titulo
	$("#digitalList").click(function(){
		$(".dadosAtuaisDigital").toggle();
	});
	
//	aguarda dado ser digitado
	$("#digitalList #since").keyup(function(e){
		//mostra corpo da tabela se estiver oculto
		$(".dadosAtuaisDigital").show();
//		executa apenas se for um digito
		digitalHtml = "";//JoinPageHeader + finterField;
		
		if(!isNaN($("#digitalList #since").val()))
		{
			//se nao tiver nada ou for negativo zera
			if(($("#digitalList #since").val() <= 0) || ($("#digitalList #since").val() == ""))
				($("#digitalList #since").val(0))
			
			//carrega dados
			$("#loadingFrame").show();
			//carrega dados digitais
			//adiciona Comandos
			$.ajax({
				// url para o arquivo json.php
				url : "../php/get.php?CAT=JOIN_DIGITAL&SINCE="+$("#digitalList #since").val(),
				// dataType json
				dataType : "json",
				// função para de sucesso
				success : function(data){
					// vamos gerar um html e guardar nesta variável
					for(i=0;i<data.length;i++)
					{
						primaryIdText = data[i].PRIMARYID;
						tagListText = "Adicionar Tags";
						scriptText = "Adcionar Script";
						descriptionText = "Adicionar Descrição";
						
						if(data[i].TAGLIST != "")
							tagListText = data[i].TAGLIST;
						if(data[i].SCRIPT != "")
							scriptText = "Editar Script";
						if(data[i].DESCRICAO != "")
							descriptionText = data[i].DESCRICAO;
						
						digitalHtml = digitalHtml+"<tr><td style='max-width:5px'>"+data[i].ID+"</td><td>"+data[i].JOIN+"</td>"+
						"<td style='max-width:5px'>"+"<button style='width:100%; heigth:100%; background:rgba(255,255,255,0.2);' id='editPrimaryID' value='D"+data[i].ID+"'>"+primaryIdText+"</button>"+"</td>"+
						"<td>"+"<button style='width:100%; heigth:100%; background:rgba(255,255,255,0.2);' id='editTagList' value='D"+data[i].ID+"'>"+tagListText+"</button>"+"</td>"+
						"<td>"+"<button style='width:100%; heigth:100%; background:rgba(255,255,255,0.2);' id='editScript' value='D"+data[i].ID+"'>"+scriptText+"</button>"+"</td>"+
						"<td>"+"<button style='width:100%; heigth:20px; background:rgba(255,255,255,0.2);' id='editDescricao' value='D"+data[i].ID+"'>"+descriptionText+"</button>"+"</td>"+
						"<td style='max-width:5px'>"+"<button style='width:100%; heigth:100%; background:rgba(255,255,255,0.2);' id='clear' value='D"+data[i].ID+"'>Limpar</button>"+"</td></tr>";
					}
					//adiciona a pagina
					
					//$(".dadosAtuaisDigital").replaceWith(digitalHtml);
					$(".dadosAtuaisDigital").html(digitalHtml);
					$("#loadingFrame").hide();
				}
			});
		}
	});
	
	//carrega dados analogicos
	//mostra e oculta dados na tabela clicando no titulo
	$("#analogList").click(function(){
		$(".dadosAtuaisAnalogico").toggle();
	});
	//aguarda clique no tipo desejado
	$("#analogList #since").keyup(function(e){
		
		//mostra corpo da tabela se estiver oculto		
		$(".dadosAtuaisAnalogico").show();
	
//		executa apenas se for um digito
		analogHtml = "";//JoinPageHeader + finterField;
		
		if(!isNaN($("#analogList #since").val()))
		{
			//se nao tiver nada ou for negativo zera
			if(($("#analogList #since").val() <= 0) || ($("#analogList #since").val() == ""))
				($("#analogList #since").val(0))
				
			$("#loadingFrame").show();
			//carrega dados digitais
			//adiciona Comandos
			$.ajax({
				// url para o arquivo json.php
				url : "../php/get.php?CAT=JOIN_ANALOG&SINCE="+$("#analogList #since").val(),
				// dataType json
				dataType : "json",
				// função para de sucesso
				success : function(data){
					// vamos gerar um html e guardar nesta variável
					for(i=0;i<data.length;i++)
					{
						primaryIdText = data[i].PRIMARYID;
						tagListText = "Adicionar Tags";
						scriptText = "Adcionar Script";
						descriptionText = "Adicionar Descrição";
						
						if(data[i].TAGLIST != "")
							tagListText = data[i].TAGLIST;
						if(data[i].SCRIPT != "")
							scriptText = "Editar Script";
						if(data[i].DESCRICAO != "")
							descriptionText = data[i].DESCRICAO;
						
						analogHtml = analogHtml+"<tr><td style='max-width:5px'>"+data[i].ID+"</td><td>"+data[i].JOIN+"</td>"+
						"<td style='max-width:5px'>"+"<button style='width:100%; heigth:100%; background:rgba(255,255,255,0.2);' id='editPrimaryID' value='A"+data[i].ID+"'>"+primaryIdText+"</button>"+"</td>"+
						"<td>"+"<button style='width:100%; heigth:100%; background:rgba(255,255,255,0.2);' id='editTagList' value='A"+data[i].ID+"'>"+tagListText+"</button>"+"</td>"+
						"<td>"+"<button style='width:100%; heigth:100%; background:rgba(255,255,255,0.2);' id='editScript' value='A"+data[i].ID+"'>"+scriptText+"</button>"+"</td>"+
						"<td>"+"<button style='width:100%; heigth:20px; background:rgba(255,255,255,0.2);' id='editDescricao' value='A"+data[i].ID+"'>"+descriptionText+"</button>"+"</td>"+
						"<td style='max-width:5px'>"+"<button style='width:100%; heigth:100%; background:rgba(255,255,255,0.2);' id='clear' value='A"+data[i].ID+"'>Limpar</button>"+"</td></tr>";
					}
					//adiciona a pagina
					
					$(".dadosAtuaisAnalogico").html(analogHtml);
					$("#loadingFrame").hide();
				}
			});
		}
	});
	
	//carrega dados serial
	
	//mostra e oculta dados na tabela clicando no titulo
	$("#serialList").click(function(){
		$(".dadosAtuaisSerial").toggle();
	});
	
	//aguarda clique no tipo desejado
	$("#serialList #since").keyup(function(e){
		//mostra corpo da tabela se estiver oculto		
		$(".dadosAtuaisSerial").show();
		
//		executa apenas se for um digito
		serialHtml = "";//JoinPageHeader + finterField;
		
		if(!isNaN($("#serialList #since").val()))
		{
			//se nao tiver nada ou for negativo zera
			if(($("#serialList #since").val() <= 0) || ($("#serialList #since").val() == ""))
				($("#serialList #since").val(0))
				
			$("#loadingFrame").show();
			//carrega dados digitais
			//adiciona Comandos
			$.ajax({
				// url para o arquivo json.php
				url : "../php/get.php?CAT=JOIN_SERIAL&SINCE="+$("#serialList #since").val(),
				// dataType json
				dataType : "json",
				// função para de sucesso
				success : function(data){
					// vamos gerar um html e guardar nesta variável
					for(i=0;i<data.length;i++)
					{
						primaryIdText = data[i].PRIMARYID;
						tagListText = "Adicionar Tags";
						scriptText = "Adcionar Script";
						descriptionText = "Adicionar Descrição";
						
						if(data[i].TAGLIST != "")
							tagListText = data[i].TAGLIST;
						if(data[i].SCRIPT != "")
							scriptText = "Editar Script";
						if(data[i].DESCRICAO != "")
							descriptionText = data[i].DESCRICAO;
						
						serialHtml = serialHtml+"<tr><td style='max-width:5px'>"+data[i].ID+"</td><td>"+data[i].JOIN+"</td>"+
						"<td style='max-width:5px'>"+"<button style='width:100%; heigth:100%; background:rgba(255,255,255,0.2);' id='editPrimaryID' value='S"+data[i].ID+"'>"+primaryIdText+"</button>"+"</td>"+
						"<td>"+"<button style='width:100%; heigth:100%; background:rgba(255,255,255,0.2);' id='editTagList' value='S"+data[i].ID+"'>"+tagListText+"</button>"+"</td>"+
						"<td>"+"<button style='width:100%; heigth:100%; background:rgba(255,255,255,0.2);' id='editScript' value='S"+data[i].ID+"'>"+scriptText+"</button>"+"</td>"+
						"<td>"+"<button style='width:100%; heigth:20px; background:rgba(255,255,255,0.2);' id='editDescricao' value='S"+data[i].ID+"'>"+descriptionText+"</button>"+"</td>"+
						"<td style='max-width:5px'>"+"<button style='width:100%; heigth:100%; background:rgba(255,255,255,0.2);' id='clear' value='S"+data[i].ID+"'>Limpar</button>"+"</td></tr>";
					}
					//adiciona a pagina
					
					$(".dadosAtuaisSerial").html(serialHtml);
					$("#loadingFrame").hide();
				}
			});
		}
	});
}

function loadClientsPage()
{
	html = "";// ClientPageHeader + finterField;
	
		$.ajax({
			// url para o arquivo json.php
			url : "../php/get.php?CAT=CLIENTES",
			// dataType json
			dataType : "json",
			// função para de sucesso
			success : function(data){
				// vamos gerar um html e guardar nesta variável
				for(i=0;i<data.length;i++)
				{
					html = html+"<tr><td>"+data[i].ID+"</td><td>"+data[i].CLIENTE+"</td><td>"+data[i].PORTA+"</td><td>"+"<button style='width:100%' id='editar' value='"+data[i].ID+"'>Editar</button>"+"</td><td>"+"<button style='width:100%' id='erase' value='"+data[i].ID+"'>Excluir</button>"+"</td></tr>";
				}
				
				//adiciona a pagina
				$(".dadosAtuais").replaceWith(html);
			}
		});
}



function loadLogsPage()
{
	html = "";
	
		$.ajax({
			// url para o arquivo json.php
			url : "../php/get.php?CAT=LOG",
			// dataType json
			dataType : "json",
			// função para de sucesso
			success : function(data){
				// vamos gerar um html e guardar nesta variável
				html = "";
				for(i=0;i<data.length;i++)
				{
					html = html+"<tr><td>"+data[i].ID+"</td><td>"+data[i].NOME+"</td><td>"+data[i].TIPO+"</td><td>"+data[i].DATA+"</td><td>"+data[i].HORA+"</td><td>"+data[i].DESCRICAO+"</td><td>"+"<button style='width:100%' id='erase' value='"+data[i].ID+"'>Excluir</button>"+"</td></tr>";
				}
				
				//adiciona a pagina
				$(".dadosAtuais").replaceWith(html);
			}
		});
}