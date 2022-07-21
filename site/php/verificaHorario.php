<?php
	@$data = $_POST['data'];
	$tempo = $_POST['temp'];

	$horIni = DateTime::createFromFormat('H:i:s', '08:00:00');

	for($i = 0; $i<=24; $i++) {
		$disp[] = $horIni->format('H:i');
		$horIni = $horIni->add(new DateInterval('PT30M'));
	}

	try {
		@$conn = new mysqli('localhost', 'root', '');
	} catch (Exception $e) {
		echo json_encode(array("result" => "erro", "erro"=>"erro tentando se conectar ao servidor"));
		die();
	}

	$conn->query("use cabeleleilaleila");

	$horarios = $conn->query("select horario, duracao from agenda where data = '" . $data . "'")->fetch_assoc();

	if ($horarios != null) {
		if (gettype($horarios['horario']) == 'string') {
			if (($key = array_search(substr($horarios['horario'], 0, 5), $disp)) !== false) {
				if ($tempo == '30') {
					array_splice($disp, $key, intdiv(intval($horarios['duracao']), 30));
				} else {
					array_splice($disp, $key - 1, intdiv(intval($horarios['duracao']), 30) + 1);
				}
			}
		} else {
			for($i=0; $i<count($horarios['horario']) - 1; $i++) {
				if (($key = array_search(substr($horarios['horario'][$i], 0, 5), $disp)) !== false) {
					if ($tempo == '30') {
						array_splice($disp, $key, intdiv(intval($horarios['duracao'][$i]), 30));;
					} else {
						array_splice($disp, $key - 1, intdiv(intval($horarios['duracao'][$i]), 30) + 1);;
					}
				}
			}
		}
	}
	echo json_encode(array("result" => "ok", "horarios"=>$disp));
?>