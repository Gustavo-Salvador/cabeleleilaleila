<?php
    session_start();

	try {
		@$conn = new mysqli('localhost', 'root', '');
	} catch (Exception $e) {
		echo json_encode(array("result" => "erro", "erro"=>"erro tentando se conectar ao servidor"));
		die();
	}

	if ($conn->connect_error) {
		echo json_encode(array("result" => "erro", "erro" => "erro ao se conectar com o banco de dados"));
		die();
	}

	$conn->query("use cabeleleilaleila");

	try {
		@$dados = $conn->query("select acsKey, acesso from cliente where id = " . $_SESSION['userId'] . ";")->fetch_assoc();
	} catch (Exception $e) {
		echo json_encode(array("result" => "erro", "erro" => "O usuário não esta conectado"));
		die();
	}

    if ($_SESSION['acsKey'] == $dados['acsKey']) {
		echo json_encode(array("result" => "ok", 'acesso' => $dados['acesso']));
		exit();
	}

	if ($_SESSION['adm'] == true) {
		echo json_encode(array("result" => "erro", "erro" => "O usuário não é adimininastro"));
		die();
	}
	
	echo json_encode(array("result" => "erro", "erro" => "O usuário não esta conectado"));
?>