<?php
    session_start();

    try {
        @$_SESSION['update'] = $_POST['update'];
        @$_SESSION['idHorario'] = $_POST['idHorario'];
        echo json_encode(array('result' => 'ok'));
    } catch (Exception $e) {
        echo json_encode(array('result' => 'erro', 'erro' => 'erro tentando gravar os dados. erro: ' . $e));
    }
?>