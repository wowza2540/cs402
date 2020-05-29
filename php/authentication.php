<?php
require_once "global.php";
$curl = curl_init();
$us = $_REQUEST["username"];
$pw = $_REQUEST["password"];

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://restapi.tu.ac.th/api/v1/auth/Ad/verify",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => false,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS =>"{\n\t\"UserName\":\"$us\",\n\t\"PassWord\":\"$pw\"\n}",
  CURLOPT_HTTPHEADER => array(
    "Content-Type: application/json",
    "Application-Key: ".$acessKey
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);


if ($err) {
  response_message(500,"Error ");
} else {
  response_message(200,"Success",$response);
}

?>