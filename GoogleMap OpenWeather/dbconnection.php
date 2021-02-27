<?php

$servername = "localhost";
$username = "zhiwenhu";
$password = "32016a02";
$dbname = "demo";

// Create connection
$conn = mysqli_connect ($servername,$username,$password );
// Check connection
if (!$conn ) {
    die(" Connection failed: " . mysqli_connect_error());
}
$sql = "CREATE DATABASE $dbname";
if ( mysqli_query($conn , $sql)) {
    echo "";
// echo " Database created successfully ";
// echo "<br>";
}

// Create connection
$conn = new mysqli ($servername,$username,$password,$dbname);
// Check connection
if ($conn->connect_error ) {
    die("Connection failed: " . $conn-> connect_error );
}

// Create table
$sql = " CREATE TABLE IF NOT EXISTS locations(
city VARCHAR (100) NOT NULL,
lat FLOAT (10,6) NOT NULL,
lng FLOAT (10,6) NOT NULL,
temp FLOAT (10,6) NOT NULL)";

if ($conn->query($sql)===TRUE) {
// echo " Table MyGuests created successfully ";

echo "";
} else {
    echo "Error creating table: " . $conn-> error;
}
// mysqli_close ( $conn );
?>