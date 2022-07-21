<?php
    session_start();

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

    try {
		@$dados = $conn->query("select acsKey, acesso from cliente where id = " . $_SESSION['userId'] . ";")->fetch_assoc();
	} catch (Exception $e) {
		echo json_encode(array("result" => "erro", "erro" => "O usuário não esta conectado"));
		die();
	}

    if ($_SESSION['acsKey'] == $dados['acsKey'] and $dados['acesso'] == 'A') {
        try {
            @$_SESSION['update'] = $_POST['update'];
            @$_SESSION['admIdHorario'] = $_POST['idHorario'];
            @$_SESSION['admIdCliente'] = $_POST['idCliente'];
            echo json_encode(array('result' => 'ok'));
        } catch (Exception $e) {
            echo json_encode(array('result' => 'erro', 'erro' => 'erro tentando gravar os dados. erro: ' . $e));
        }
    }
?>