<?php
include "db.php";
include "SpeedLimitCalculator.php";
//header('Content-Type: application/json');
	if(isset($_GET["plate_number"])){
		//$sql = "SELECT *,extract(epoch from tracking_time) AS tracktime FROM vehicle v,vehicle_tracker vt WHERE plate_number='".$_GET["plate_number"]."' AND v.id = vt.vehicle_id";
		$sql = "SELECT *,extract(epoch from tracking_date) AS tracktime FROM vehicle v,vehicle_tracker vt WHERE plate_number='".$_GET["plate_number"]."' AND v.id = vt.vehicle_id AND vt.tracking_date = CURRENT_DATE";
		$result = pg_query($dbconn, $sql);
		if($result){
			$arr = array();
			foreach(pg_fetch_all($result) as $tracker){
				//$speedLimitCalculator = new SpeedLimitCalculator($tracker['latitude'],$tracker['longitude'],$tracker['velocity']);
				//$tracker["overspeeding"] = $speedLimitCalculator->isSpeedViolated();
				//echo json_encode($tracker);
				array_push($arr,$tracker);
				//break;
			}
			echo json_encode($arr);
		}else{
			echo json_encode(array());
		}
		
	}else{
		echo json_encode(array());
	}
	
	
?>