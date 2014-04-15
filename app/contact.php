<?php
    // Pear Mail Library
    require_once 'Mail.php';
    // Load config file
    $config = parse_ini_file('config/config.ini');

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Here we get all the information from the fields sent over by the form.
        $name = $_POST['name'];
        $email = $_POST['email'];
        $message = $_POST['message'];


        $from = $config['email'];
        $to = $config['email'];
        $subject = 'Message from '.$name.' - '.$email;
        $body = $message;

        $headers = array(
            'From' => $from,
            'To' => $to,
            'Subject' => $subject
        );

        $smtp = Mail::factory('smtp', array(
                'host' => 'ssl://smtp.gmail.com',
                'port' => '465',
                'auth' => true,
                'username' => $config['email'],
                'password' => $config['password']
            ));

        $mail = $smtp->send($to, $headers, $body);

        if (PEAR::isError($mail)) {
            echo('Something is wrong');
        } else {
            echo('Your message was sent!');
        }
    }
?>