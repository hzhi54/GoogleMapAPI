<?php
    include ('dbconnection.php');
    error_reporting(0);


    $city = $_POST['city'];
    $lat = $_POST['lat'];
    $lng = $_POST['lng'];
    $temp = $_POST['temp'];

//    echo "$city";
//    echo "$lat";
//    echo "$lng";
//    echo "$temp";

    $sql2 = "SELECT city,lat,lng,temp FROM locations";

    $result = mysqli_query($conn,$sql2);

    $check = TRUE;

//    echo $city;

    while($row = $result->fetch_assoc()){
//        echo $row['city']
        if($city === $row['city']){
            $check = FALSE;
        }
    }

    if ($check
            && $_POST['city'] != ""
            && $_POST['lat'] != ""
            && $_POST['lng'] != ""
            && $_POST['temp'] != ""){
            $sql = "INSERT INTO locations (city,lat,lng,temp) VALUES('$city','$lat','$lng','$temp')";
            $result = mysqli_query($conn,$sql);
    }


//    else{
//        $sql2 = "SELECT city,lat,lng,temp FROM locations";
//
//        $result = mysqli_query($conn,$sql2);
//
//        $json_array = $_GET[]

//    }

//    else {
//        $sql2 = "SELECT locationid, city, lat, lng, temp FROM locations";
//        echo "<table border='1'>
//            <tr>
//            <th>Location_id </th>
//            <th>City </th>
//            <th>Lat </th>
//            <th>Lng </th>
//            <th>Temp </th>
//            </tr>";
//
//    }
////        echo "Hello";
////        echo "$result->num_rows";
//        if ($result->num_rows > 0){
//            echo "Hello";
//            while($row = $result->fetch_assoc()){
//                echo "<tr>";
//                echo "<td>" . $row['locationid'] . "</td>";
//                echo "<td>" . $row['city'] . "</td>";
//                echo "<td>" . $row['lat'] . "</td>";
//                echo "<td>" . $row['lng'] . "</td>";
//                echo "<td>" . $row['temp'] . "</td>";
//                echo "</tr>";
//            }
//        }
//    }
?>