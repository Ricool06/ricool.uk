<?php
    function returnJWT($db, $row){
        //Generate secret (crypto secure).
        $secret = random_bytes(128);

        //Prepare query for execution.
        $query = $db->prepare('UPDATE users SET secret = :secret WHERE user = :user');
        $query->bindValue(':secret', $secret);
        $query->bindValue(':user', $row[0]);

        //Construct header.
        $jwtHeader = base64_encode(json_encode(array(
            'alg' => 'HS256',
            'typ' => 'JWT'
        )));

        //Construct payload.
        $jwtPayload = base64_encode(json_encode(array(
            'user' => $row[0], //User ID.
            'role' => $row[2], //Role.
            'iss' => $_SERVER[HTTP_HOST],
            'iat' => time(),
            'exp' => time() + (24 * 60 * 60) //Expires in a day.
        )));

        //Create signature.
        $jwt = $jwtHeader . '.' . $jwtPayload;
        $jwtSignature = hash_hmac('sha256', $jwt, $secret);

        //Append signature to the token
        $jwt .= '.' . $jwtSignature;

        //Execute the query to add the secret for this token to the database.
        $query->execute();

        var_dump($jwt);
    }

    function getCredentials($db, $user){
        //Look up credentials
        $query = $db->prepare('SELECT * FROM users WHERE user = :user');
        $query->bindValue(':user', $user);

        $result = $query->execute();

        return $result;
    }

    function compareCredentials($row, $password)
    {
        //Compare credentials
        $hash = $row[1];
        //var_dump($row);
        //var_dump($password);

        $success = password_verify($password, $hash);

        return $success;
    }

    function login(){
        $db = new SQLite3($_SERVER['DOCUMENT_ROOT'] . '/../ricool.uk.db');

        //Filter/sanitize input
        $user = filter_var($_POST["user"], FILTER_SANITIZE_STRING);
        $password = filter_var($_POST["password"], FILTER_SANITIZE_STRING);

        $user = SQLite3::escapeString($user);
        $password = SQLite3::escapeString($password);

        $result = getCredentials($db, $user);
        $row = $result->fetchArray();

        $success = compareCredentials($row, $password);

        if($success){
            returnJWT($db, $row);
        } else {
            unauthorized();
        }
    }

    function unauthorized(){
        http_response_code(401);
        var_dump(http_response_code());
    }

    //If the correct post request was received, proceed with login.
    if(isset($_POST["user"], $_POST["password"])){
        login();
    } else {
        unauthorized();
    }
 ?>
