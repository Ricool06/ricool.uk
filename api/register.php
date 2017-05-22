<?php
    function register(){
        $db = new SQLite3($_SERVER['DOCUMENT_ROOT'] . '/../ricool.uk.db');

        $user = filter_var($_POST["user"], FILTER_SANITIZE_STRING);
        $password = filter_var($_POST["password"], FILTER_SANITIZE_STRING);

        $user = SQLite3::escapeString($user);
        $password = SQLite3::escapeString($password);

        $hash = password_hash($password, PASSWORD_DEFAULT);

        $query = $db->prepare('INSERT INTO users (user, hash, role) VALUES (:user, :hash, :role)');
        $query->bindValue(':user', $user);
        $query->bindValue(':hash', $hash);
        $query->bindValue(':role', 'GUEST');

        $result = $query->execute();

        http_response_code(201);
        var_dump(http_response_code());
    }

    function unauthorized(){
        http_response_code(401);
        var_dump(http_response_code());
    }

    function internalServerError(){
        http_response_code(500);
        var_dump(http_response_code());
    }

    if(isset($_POST["user"], $_POST["password"])){
        try {
            register();
        } catch (Exception $e) {
            internalServerError();
        }
    } else {
        unauthorized();
    }
 ?>
