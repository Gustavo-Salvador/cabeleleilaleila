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
		$dataIni = $_POST['dataIni'];
        $dataFim = $_POST['dataFim'];
        $cliente = $_POST['cliente'];
        $servico = $_POST['servico'];
        $tempo = $_POST['tempo'];
        $status = $_POST['status'];
        $confirmado = $_POST['confirmado'];

        $query = 'select cliente.nome, servico, `data`, horario, duracao, concluido, faltou, confirmado, agenda.id, cliente from agenda inner join cliente on cliente.id = agenda.cliente ';
        $frt = false;

        if ($dataIni != 'null') {
            if ($frt == false) {
                $query .= 'where ';
                $frt = true;
            }
            $query .= "`data` >= '" . $dataIni . "' ";
        }
        if ($dataFim != 'null') {
            if ($frt == false) {
                $query .= ' where ';
                $frt = true;
            } else {
                $query .= 'and ';
            }
            $query .= "`data` <= '" . $dataFim . "' ";
        }
        if ($cliente != 'null') {
            if ($frt == false) {
                $query .= ' where ';
                $frt = true;
            } else {
                $query .= 'and ';
            }
            $query .= 'cliente = ' . $cliente . ' ';
        }
        if ($servico != 'null') {
            if ($frt == false) {
                $query .= ' where ';
                $frt = true;
            } else {
                $query .= 'and ';
            }
            $query .= "servico = '" . $servico . "' ";
        }
        if ($tempo != 'null') {
            if ($frt == false) {
                $query .= ' where ';
                $frt = true;
            } else {
                $query .= 'and ';
            }
            $query .= 'duracao = ' . $tempo . ' ';
        }
        if ($status != 'null') {
            if ($frt == false) {
                $query .= ' where ';
                $frt = true;
            } else {
                $query .= 'and ';
            }
            
            $query .= $status . ' = 1 ';
        }
        if ($confirmado != 'null') {
            if ($frt == false) {
                $query .= ' where ';
                $frt = true;
            } else {
                $query .= 'and ';
            }
            $query .= 'confirmado = 1 ';
        }

        $query .= 'order by `data`, nome;';

        $res = $conn->query($query);
        $result = array();

        while ($linha = $res->fetch_assoc()) {
            $result[] = $linha;
        }

        echo json_encode(array("result" => "ok", "dados" => $result));
        exit();
	}
	
	echo json_encode(array("result" => "erro", "erro" => "O usuário não é adimininastro"));
?>