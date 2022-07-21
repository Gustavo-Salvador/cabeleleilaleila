<?php
    try {
		@$conn = new mysqli('localhost', 'root', '');
	} catch (Exception $e) {
		echo json_encode(array("result" => "erro", "erro"=>"erro tentando se conectar ao servidor"));
		die();
	}

	if ($conn->connect_error) {
		echo json_encode(array("result" => "erro", "erro"=>"erro ao se conectar com o banco de dados"));
		die();
	}

    session_start();

	$conn->query("use cabeleleilaleila");

	if (@$_SESSION['adm'] == true) {
		try {
			@$dados = $conn->query("select acsKey, acesso from cliente where id = " . $_SESSION['userId'] . ";")->fetch_assoc();
		} catch (Exception $e) {
			echo json_encode(array("result" => "erro", "erro" => "O usuário não esta conectado"));
			die();
		}
	
		if ($_SESSION['acsKey'] == $dados['acsKey'] and $dados['acesso'] == 'A') {
			$conn->query("delete from agenda where id = " . $_POST['admIdHorario'] . ";");
		}
	} else {
		$conn->query("delete from agenda where id = " . $_POST['idHorario'] . " and cliente = " . $_SESSION['userId'] . ";");
	}

    echo json_encode(array("result" => "ok"));
?>