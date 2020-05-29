<?php
    require_once "global.php";
// connect to db
    $connect = mysqli_connect($servername,$username,$password,$dbname);
    mysqli_set_charset($connect, "utf8");

    if(mysqli_connect_errno()){
        response_message(500,"Error: ");
    }
    //checkก่อนว่ามีการบันทึกaccesstime แล้วยัง ถ้ามีแล้วอ่านเวลาออกมาเก็บก่อนแล้วค่อยแสตมป์เวลาใหม่ ถ้ายังสแตมป์เวลาใส่ไป
    //เอาเวลาที่อ่านได้ไปเทียบกับ notification table อะไรที่น้อยกว่าเอามาแสดง
    $us = $_REQUEST['us'];
    $owner = $_REQUEST["owner"];
    date_default_timezone_set("Asia/Bangkok");
    $newtime = date("Y-m-d H:i:s");
    $oldtime = "";
    if(!(inTable())){
        if(!(add())){
            response_message(500,"cannot insert into accesstime table");
        }
    }else{
        updateTime();
    }

    getNotification();
    mysqli_close($connect);
    

function inTable(){//check in table
    global $oldtime ;
    $oldtime = "tw";
    $sql = "SELECT * FROM accesstime WHERE employeeID = '".$GLOBALS['us']."'";
    $result = mysqli_query($GLOBALS['connect'],$sql);
    if($result){
        // echo "intable: true";
        if (mysqli_num_rows($result) > 0) {
            // echo 'found!';
            $arrayy = array();
            while ($row = $result->fetch_assoc()) {
                $timestamp = strtotime($row['datetime']);
                $oldtime = date("Y-m-d H:i:s", $timestamp);
            }
            return true;
          } else {
            // echo 'not found';
            return false;
          }
    }else{
        // echo "intable: false";
        return false;
    }
}

function add(){//add into accesstime table
    $sql = "INSERT INTO `".$GLOBALS['dbname']."`.`accesstime`(`employeeID`) VALUES ('".$GLOBALS['us']."')";
    $result = mysqli_query($GLOBALS['connect'],$sql);
    if(empty($result)){
        return false;
    }return true;
}
function updateTime(){//update accesstime table
    $sql = "UPDATE accesstime SET datetime = '".$GLOBALS['newtime']."' WHERE employeeID = '".$GLOBALS['us']."'";
    $result = mysqli_query($GLOBALS['connect'],$sql);
    if(empty($result)){
        return false;
    }return true;
}

function getNotification(){//get notification
    if($GLOBALS['owner'] == "student"){
        $sql = "SELECT * FROM notification
        INNER JOIN study ON notification.SBID = study.SBID AND study.SID ='".$GLOBALS['us']."' AND notification.owner != '".$GLOBALS["owner"]."'
        WHERE notification.timestamp BETWEEN '".$GLOBALS['oldtime']."' AND '".$GLOBALS['newtime']."'";
    }else{
        $sql = "SELECT * FROM notification
        INNER JOIN sub_t ON notification.SBID = sub_t.SBID AND sub_t.TID = '".$GLOBALS['us']."'AND notification.owner != '".$GLOBALS["owner"]."'
        WHERE notification.timestamp BETWEEN '".$GLOBALS['oldtime']."' AND '".$GLOBALS['newtime']."'";
    }
    $result = mysqli_query($GLOBALS['connect'],$sql);
    if(!empty($result)){
        if(mysqli_num_rows($result) > 0){
            // $results_array = array();
            while ($row = $result->fetch_assoc()) {
                $results_array[] = $row;
            } 
            response_message(200,"Success",$results_array);
        }else{
            response_message(404,"No data found1:".$GLOBALS['oldtime'].":".$GLOBALS['newtime']);
        }
    }else{
        response_message(404,"No data found2");
    }
    
}
?>
