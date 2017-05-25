<?php
    require_once('verify.php');

    function createPost(){
        $splitToken = getSplitToken();
        //Decode payload.
        $payload = json_decode(base64_decode($splitToken[1]), true);
        $role = filter_var($payload['role'], FILTER_SANITIZE_STRING);

        if(strcasecmp($role, 'ADMIN') == 0){
            $db = new SQLite3($_SERVER['DOCUMENT_ROOT'] . '/../ricool.uk.db');

            //Sanitize input.
            $title = filter_var($_POST['title'], FILTER_SANITIZE_STRING);
            $post = filter_var($_POST['post'], FILTER_SANITIZE_STRING);
            $author = filter_var($payload['user'], FILTER_SANITIZE_STRING);

            $title = SQLite3::escapeString($title);
            $post = SQLite3::escapeString($post);
            $author = SQLite3::escapeString($author);

            $query = $db->prepare('INSERT INTO posts (title, post, author) VALUES (:title, :post, :author)');
            $query->bindValue(':title', $title);
            $query->bindValue(':post', $post);
            $query->bindValue(':author', $author);

            $query->execute();

            created();
        } else {
            unauthorized();
        }
    }

    $headers = getallheaders();

    try {
        $authorized = verifyAuthHeader($headers);

        if($authorized){
            createPost();
        } else {
            unauthorized();
        }
    } catch (Exception $e) {
        internalServerError();
    }
 ?>
