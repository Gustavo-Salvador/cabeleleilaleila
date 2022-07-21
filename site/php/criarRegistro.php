<?php
	@$nome = $_POST["nome"];
	@$sexo = $_POST["sexo"];
	@$email = $_POST["email"];
	@$tel = $_POST["tel"];
	@$nasc = $_POST["nascimento"];
	@$sen = $_POST["senha"];

	$conn = new mysqli('localhost', 'root', '');
	
	if ($conn->connect_error) {
		echo 'eita';
	}

	$conn->query("use cabeleleilaleila");

	$verifUnic = $conn->query("select count(*) from cliente where email = '" . $email ."'");

	if ($verifUnic->fetch_array()[0] > 0) {
		echo json_encode(array("result" => "erro", "erro"=>"email já cadastrado"));
		$conn->close();
		die();
	} else {
		while (true) {
			$rand = mt_rand();
			if ($conn->query("select count(*) from cliente where acsKey = '" . $rand . "'")->fetch_array()[0] == 0) {
				break;
			}
		}
		$result = $conn->query("insert into cliente  (email, nome, sexo, telefone, senha, acesso, nascimento, acsKey) values ('" . $email . "', '" . $nome . "', '" . $sexo . "', '" . $tel . "', '" . $sen . "', 'C', '" . $nasc . "', '" . $rand . "')");
		
		if ($result) {
			echo json_encode(array("result" => "ok"));
			if (isset($_SESSION)) {
				$_SESSION = array();
			} else {
				session_start();
			}
			$getId = $conn->query("select id from cliente where email = '" . $email ."'")->fetch_array();
			
			if ($getId == null) {
				echo json_encode(array("result" => "erro", "erro"=>"erro tentando obter dado do servidor"));
				$conn->close();
				die();
			}
			
			$_SESSION = array();
			$_SESSION["email"] = $email;
			$_SESSION["acsKey"] = $rand;
			$_SESSION["userId"] = $getId[0];
			$_SESSION["update"] = false;
		} else {
			echo json_encode(array("result" => "erro", "erro"=>"erro inserindo dados no banco de dados"));
		}
	}

	$conn->close();
?>