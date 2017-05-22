<?php
    function verify($splitToken){
        //Decode payload
        $payload = json_decode(base64_decode($splitToken[1]), true);

        //Sanitize input
        $user = filter_var($payload['user'], FILTER_SANITIZE_STRING);
        $user = SQLite3::escapeString($user);

        //Prepare query
        $db = new SQLite3($_SERVER['DOCUMENT_ROOT'] . '/../ricool.uk.db');
        $query = $db->prepare('SELECT * FROM users WHERE user = :user');
        $query->bindValue(':user', $user);

        //Get record from DB
        $result = $query->execute();
        $row = $result->fetchArray();

        //Create the header and payload combination from the given token.
        $headerPayload = $splitToken[0] . '.' . $splitToken[1];

        //Generate the signature from the given token, and the true secret from the DB
        $secret = $row[3];
        $generatedSignature = hash_hmac('sha256', $headerPayload, $secret);

        //Get the attached signature.
        $attachedSignature = $splitToken[2];

        if(strcmp($generatedSignature, $attachedSignature) == 0){
            accepted();
        } else {
            unauthorized();
        }
    }

    function extractHeaders($headers){
        $authHeader = explode(' ', $headers['Authorization']);

        $scheme = $authHeader[0];
        $token = $authHeader[1];

        $splitToken = explode('.', $token);

        try {
            verify($splitToken);
        } catch (Exception $e) {
            internalServerError;
        }
    }

    function accepted(){
        http_response_code(202);
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

    $headers = getallheaders();
    try {
        extractHeaders($headers);
    } catch (Exception $e) {
        internalServerError();
    }
 ?>
