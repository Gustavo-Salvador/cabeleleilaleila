<?php
	@$data = $_POST['data'];
	@$servico = $_POST['servico'];
	@$tempo = $_POST['tempo'];
	@$horario = $_POST['horario'];
	@$agroup = $_POST['agroup'];

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

	if ($agroup != 'false') {
		$passSem = DateTime::createFromFormat('Y-m-d', $data);
		$passSem->sub(new DateInterval('P7D'));
		$proxSem = DateTime::createFromFormat('Y-m-d', $data);
		$proxSem->add(new DateInterval('P7D'));

		$cnt = $conn->query("select count(*) from agenda where `data` between '" . $passSem->format('Y-m-d') . "' and '" . $proxSem->format('Y-m-d') . "' and cliente = '" . $_SESSION["userId"] . "' and faltou != 1 and concluido != 1")->fetch_array();

		if ($cnt != null) {
			if ($cnt[0] > 0) {
				$newData = $conn->query("select data from agenda where `data` between '" . $passSem->format('Y-m-d') . "' and '" . $proxSem->format('Y-m-d') . "' and cliente = '" . $_SESSION["userId"] . "' order by `data`")->fetch_array();
				if ($agroup != 'true') {
					echo json_encode(array("result" => "sugestao", "data"=>$newData[0]));
					exit();
				} else {
					if ($newData != null) {
						$horDisp = $conn->query("select count(*) from agenda where `data` = '" . $newData[0] . "' and horario = '" . $horario . "'")->fetch_array();
						if ($horDisp[0] != 0) {
							echo json_encode(array("result" => "erro", "erro" => "horario indisponivel no dia de seu outro agendamento"));
							die();
						} else {
							$data = $newData[0];
						}
					}
				}
			}
		}
	}
	$horDisp = $conn->query("select count(*) from agenda where `data` = '" . $data . "' and horario = '" . $horario . "'")->fetch_array();
	if ($horDisp[0] != 0) {
		echo json_encode(array("result" => "erro", "erro" => "horario indisponivel"));
		die();
	} else {
		if ($_SESSION['update'] == true) {
			$_SESSION['update'] = false;
			if (@$_SESSION['adm'] == true) {
				try {
					@$dados = $conn->query("select acsKey, acesso from cliente where id = " . $_SESSION['userId'] . ";")->fetch_assoc();
				} catch (Exception $e) {
					echo json_encode(array("result" => "erro", "erro" => "O usuário não esta conectado"));
					die();
				}
			
				if ($_SESSION['acsKey'] == $dados['acsKey'] and $dados['acesso'] == 'A') {
					$conn->query("update agenda set `data` = '" . $data . "', horario = '" . $horario . "' where id = " . $_SESSION['admIdHorario'] . " and cliente = " . $_SESSION['admIdCliente'] . ";");
				}
			} else {
				$conn->query("update agenda set `data` = '" . $data . "', horario = '" . $horario . "' where id = " . $_SESSION['idHorario'] . " and cliente = " . $_SESSION['userId'] . ";");
			}
			echo json_encode(array("result" => "ok", "ok" => "alterado"));
			exit();
		} else {
			$horDisp = $conn->query("insert into agenda (cliente, servico, data, duracao, horario) values ('" . $_SESSION["userId"] . "', '" . $servico . "', '" . $data . "', '" . $tempo . "', '" . $horario . "')");
		}
	}
	echo json_encode(array("result" => "ok"));
?>