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
		$nome = $_POST['nome'];

        $query = "select nome, email, sexo, nascimento, telefone from cliente where acesso != 'A' ";

        if ($nome != 'null') {
            $query .= "and nome like '%" . $nome . "%' ";
        }

        $query .= 'order by nome;';

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