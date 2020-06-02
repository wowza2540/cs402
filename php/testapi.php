<?php
fetch('https://jsonplaceholder.typicode.com/posts/1')
.then(response => response.json())
.then(json => console.log(json))
// $curl = curl_init();

// curl_setopt_array($curl, array(
//   CURLOPT_URL => "https://my-json-server.typicode.com/wowza2540/newAPI/student",
//   CURLOPT_RETURNTRANSFER => true,
//   CURLOPT_ENCODING => "",
//   CURLOPT_MAXREDIRS => 10,
//   CURLOPT_TIMEOUT => 0,
//   CURLOPT_FOLLOWLOCATION => false,
//   CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
//   CURLOPT_CUSTOMREQUEST => "GET",
// ));
// $response = curl_exec($curl);
// $err = curl_error($curl);

// curl_close($curl);
// echo $response;
// if ($err) {
//     response_message(500,"Error ");
//   } else {
//     response_message(200,"Success",$response);
//   }
?>