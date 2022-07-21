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

    if ($_SESSION['acsKey'] == $dados['acsKey'] and $dados['acesso'] == 'A') {
		$info = $_POST['info'];
        $val = $_POST['val'];
        $id = $_POST['id'];

        if ($info == 'status') {
            if ($val == 'concluido') {
                $conn->query("update agenda set concluido = 1, faltou = 0 where id = " . $id . ";");
            } else {
                $conn->query("update agenda set concluido = 0, faltou = 1 where id = " . $id . ";");
            }
        } else {
            $conn->query("update agenda set " . $info . " = " . $val . " where id = " . $id . ";");
        }

        echo json_encode(array("result" => "ok"));

        exit();
	}
	
	echo json_encode(array("result" => "erro", "erro" => "O usuário não é adimininastro"));
?>