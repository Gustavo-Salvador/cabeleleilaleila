<?php
    session_start();

    $id = $_SESSION["userId"];

    @$dataMin = $_POST['dataMin'];
    @$dataMax = $_POST['dataMax'];

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

    $query = "select `data`, horario, duracao, servico, faltou, concluido from agenda where cliente = " . $id . " ";
    if ($dataMin == 'null') {
        $query .= " and `data` < '" . $dataMax . "' ";
    } elseif ($dataMax == 'null') {
        $query .= " and `data` > '" . $dataMin . "' ";
    } else {
        $query .= " and `data` between '" . $dataMin . "' and '" . $dataMax . "' ";
    }

    $query .= "order by `data`;";

    $info = array();
    $res = $conn->query($query);

    while ($linha = $res->fetch_assoc()) {
        $info[] = $linha;
    }

    if ($info != null) {
        echo json_encode(array("result" => "ok", "dados"=>$info));
		die();
    }
?>