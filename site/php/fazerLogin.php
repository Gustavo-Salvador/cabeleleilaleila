<?php
	@$email = $_POST["email"];
	@$sen = $_POST["senha"];

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

	$conn->query("use cabeleleilaleila");

	$verifExist = $conn->query("select senha, acsKey, id, acesso from cliente where email = '" . $email ."'")->fetch_assoc();

	if ($verifExist != null) {
		if ($verifExist["senha"] == $sen) {
			session_start();
			$_SESSION = array();
			$_SESSION["email"] = $email;
			$_SESSION["acsKey"] = $verifExist["acsKey"];
			$_SESSION["userId"] = $verifExist["id"];
			$_SESSION["update"] = false;
			
			$adm = false;

			if ($verifExist["acesso"] == "A") {
				$_SESSION["adm"] = true;
				$adm = true;
			}
			echo json_encode(array("result" => "ok", "adm" => $adm));
			exit();
		}
	}

	echo json_encode(array("result" => "erro", "erro"=>"usuario e/ou senha incorretos"));
?>