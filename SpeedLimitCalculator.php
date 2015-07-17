<?php
class SpeedLimitCalculator{
	private $isViolated = false;
	function SpeedLimitCalculator($latitude,$longitude,$velocity) {
		$minLatitude = $latitude;
		$maxLatitude = $latitude;
		$minLongitude = $longitude;
		$maxLongitude = $longitude;
		$sql = "SELECT * FROM speed_limits sl,route_coordinates rc,routes r WHERE r.id = rc.route_id AND sl.route_id = rc.route_id AND sl.velocity < $velocity AND rc.latitude >= $minLatitude AND rc.latitude <= $maxLatitude AND rc.longitude >= $minLongitude AND rc.longitude <= $maxLongitude";
		//echo $sql;
		$result = pg_query($GLOBALS['dbconn'], $sql);
		if($result){
			if($vehicle = pg_fetch_row($result)) {
				$this->isViolated = true;
			}
		
		}
	}

	public function isSpeedViolated(){
		return $this->isViolated;
	}
}
?>