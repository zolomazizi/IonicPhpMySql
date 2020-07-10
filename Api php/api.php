<?php
header('Access-Control-Allow-Origin: *') ;
header('Access-Control-Allow-Credential: true') ;
header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS') ;
header('Access-Control-Allow-headers: Origin, Content-Type, Authorization, Accept, X-Requested-With, x-xsrf-token ');
header('Content-Type: application/json; charset-utf-8') ;

include 'config.php';
$postJSON = json_decode(file_get_contents('php://input'), true) ;
$today =date('y-m-d H:i:s');

if($postJSON['action']='registration_progres'){
    $emailcheck = mysqli_fetch_array(mysqli_query($mysqli,"SELECT email FROM user WHERE email = '$postJSON[email]'"));
    if($emailcheck['email'] == $postJSON['email']){
        $result = json_encode(array('succes' => false, 'msg' =>'Email '));

    }else{
        $password = md5($postJSON['password']);
        $insert = mysqli_query($mysqli, "INSERT INTO user SET

        name = '$postJSON[name]',
        lastname = '$postJSON[lastname]',
        date = '$postJSON[date]',
        email = '$postJSON[email]',
        Password = '$postJSON[name]',
        createdat  = '$today',
        ");
        if($insert){
            $result =json_encode(array('success' => true, 'msg' =>'register complate'));
        }else{
            $result =json_encode(array('success' => false, 'msg' =>'register non complate'));

        }
    }
    echo $result ; 
}elseif($postJSON['action']='login_progres'){
   
        $password = md5($postJSON['password']);
        $logindata = mysqli_fetch_array(mysqli_query($mysqli, "SELECT * FROM user WHERE email = '$postJSON[email]' AND password = '$password'"));

        $data = array(
            'userid' => $logindata['userid'],
            'name' => $logindata['name'],
            'lastname' => $logindata['lastname'],
            'date' => $logindata['date'],
            'email' => $logindata['email'],
       
        );
        if($logindata){
            $result =json_encode(array('success' => true, 'result' => $data));
        }else{
            $result =json_encode(array('success' => false));

        }
    
    echo $result ; 
}
