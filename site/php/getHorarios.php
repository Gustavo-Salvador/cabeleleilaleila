<?php
    session_start();

    $id = $_SESSION["userId"];

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

    $info = array();
    $query = $conn->query("select id, `data`, horario, duracao, servico, confirmado from agenda where cliente = '" . $id ."' and faltou = 0 and concluido = 0");

    while ($linha = $query->fetch_assoc()) {
        $info[] = $linha;
    }

    if ($info != null) {
        echo json_encode(array("result" => "ok", "dados"=>$info));
		die();
    }
?>