<?php 

include "db.php";
include "SpeedLimitCalculator.php";

if(isset($_GET["plate_number"])){
	$latitude = $_GET["latitude"];
	$longitude = $_GET["longitude"];
	$altitude = "null";
	$velocity = "0";
	if(isset($_GET["altitude"])){
		$altitude = $_GET["altitude"]; 
	}
	if(isset($_GET["velocity"])){
		$velocity = $_GET["velocity"]; 
	}
	$result = pg_query($dbconn, "SELECT id FROM vehicle WHERE plate_number='".$_GET["plate_number"]."'");
	if($result){
		if($vehicle = pg_fetch_row($result)) {
			$query = "INSERT INTO vehicle_tracker(vehicle_id,latitude, longitude,altitude,velocity,tracking_time)
			VALUES('".$vehicle[0]."','$latitude', '$longitude',$altitude,$velocity,CURRENT_TIMESTAMP);";
			//echo $query;
			
			//perform the insert using pg_query
			$result = pg_query($dbconn, $query);
			
			//dump the result object
			var_dump(pg_affected_rows($result));
		}
		
	}
	$speedLimitCalculator = new SpeedLimitCalculator($latitude,$longitude,$velocity);
	
	if($speedLimitCalculator->isSpeedViolated()){
		echo "1";
	}
	// Closing connection
	
}
pg_close($dbconn);

?>