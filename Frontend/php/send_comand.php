<?php
include "conection.php";

$con = mysqli_connect($dataBaseSERVER,$dataBaseUSR,$dataBasePWD,$dataBaseNAME);

// Check connexao
if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

//define pagina para busca
if(isset($_POST["TYPE"]) && isset($_POST["VALUE"]) && isset($_POST["COMP"]) && isset($_POST["ACTION"]))
{
	$date_now = getdate();
	
	$today = date("y-m-d");
	$now =  $date_now["hours"].":".$date_now["minutes"].":".$date_now["seconds"];
	
	$comandType = $_POST["TYPE"];
	$comandValue = $_POST["VALUE"];
	$comandComp = $_POST["COMP"];
	$comandAction = $_POST["ACTION"];
	
	//valida comando
	if(($comandType != "digital") && ($comandType != "analogico") && ($comandType != "serial"))
	{
		$query = "INSERT INTO `logs`(`ID`, `NOME`, `DESCRICAO`, `TIPO`, `DATA`, `HORA`) VALUES (null,'Erro de interface','Tipo de comando Invalido','error','".$today."','".$now."')";
		$queryResult = mysqli_query($con,$query);
		exit();
	}
	else if(($comandValue <= 0) || ($comandValue > 9999))
	{
		$query = "INSERT INTO `logs`(`ID`, `NOME`, `DESCRICAO`, `TIPO`, `DATA`, `HORA`) VALUES (null,'Erro de interface','Join do comando excede numero maxio ou minimo','error','".$today."','".$now."')";
		$queryResult = mysqli_query($con,$query);
		exit();
	}
	else if(($comandAction != "up") && ($comandAction != "down"))
	{
		$query = "INSERT INTO `logs`(`ID`, `NOME`, `DESCRICAO`, `TIPO`, `DATA`, `HORA`) VALUES (null,'Erro de interface','Ação do comando Invalida','error','".$today."','".$now."')";
		$queryResult = mysqli_query($con,$query);
		exit();
	}
	
	//adiciona comando a fila
	$query = "INSERT INTO `interface_comand_queue` (`ID`, `TYPE`, `VALUE`, `COMPLEMENTO`, `ACTION`) VALUES (null,'".$comandType."','".$comandValue."','".$comandComp."','".$comandAction."');";
	$queryResult = mysqli_query($con,$query);
	
	if(!$queryResult)
	{
		echo "erro ao executar acao";	
		$query = "INSERT INTO `logs`(`ID`, `NOME`, `DESCRICAO`, `TIPO`, `DATA`, `HORA`) VALUES (null,'Erro de interface','Falha ao adicionar comando a fila de execução','error','".$today."','".$now."')";
		$queryResult = mysqli_query($con,$query);
	}
	else
	{
		echo "adicionado com sucesso";	
		$query = "INSERT INTO `logs`(`ID`, `NOME`, `DESCRICAO`, `TIPO`, `DATA`, `HORA`) VALUES (null,'Comando Adicionado','Comando Adicionado a fila de Execução','info','".$today."','".$now."')";
		$queryResult = mysqli_query($con,$query);
	}
}
?>