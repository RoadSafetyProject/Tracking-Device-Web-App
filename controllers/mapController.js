// Number of tracker line +255764010449

var trackerApp = angular.module('trackerApp', ['uiGmapgoogle-maps',"ui.date"]);

trackerApp.controller('mapCtrl', function ($scope,$http,$interval) {
	$scope.markers = [];
	$scope.mapObject = {};
	$scope.velocity = {
			criteria:[
			          {name:"Any",value:"any"},
			          {name:"Greater Than",value:"gt"},
			          {name:"Less Than",value:"lt"},
			          {name:"Between",value:"bt"}
			         ],
			range:"any"
	}
	$scope.date = {
			start:getStartTime(),
			end:getEndTime()
	}
	$scope.showMarkers = function(marker){
		if(!(parseFloat(marker.tracktime) * 1000 >= $scope.date.start.getTime() && parseFloat(marker.tracktime) *1000 <= $scope.date.end.getTime())){
			return false;
		}
		if($scope.velocity.range == "any"){
			
			return true;
		}
		if($scope.velocity.range == "gt" && $scope.velocity.value <= marker.velocity){
			return true;
		}
		if($scope.velocity.range == "lt" && $scope.velocity.value >= marker.velocity){
			return true;
		}
		if($scope.velocity.range == "bt" && $scope.velocity.start < marker.velocity && marker.velocity < $scope.velocity.end){
			return true;
		}
	    return false; 
	}
	$scope.windowOptions = {
            visible: false
        };

        $scope.onClick = function() {
            $scope.windowOptions.visible = !$scope.windowOptions.visible;
        };

        $scope.closeClick = function() {
            $scope.windowOptions.visible = false;
    };
	$scope.markerExists = function(smarker){
		for(var i = 0;i < $scope.markers.length;i++){
			if($scope.markers[i].id == smarker.id){
				return true;
			}
		}
		return false;
	}
	$scope.plate_number = "T234 BLM";
	$scope.$watch('plate_number', function() {
		$scope.markers = [];
		$scope.getPathList();
	});
	$scope.autoCenter = function(){
        //  Create a new viewpoint bound
            var bounds = new google.maps.LatLngBounds();
            //  Go through each...
            for (var i = 0; i < $scope.markers.length; i++) {
                bounds.extend(new google.maps.LatLng($scope.markers[i].latitude,$scope.markers[i].longitude));
            }
            //  Fit these bounds to the map
            console.log(JSON.stringify(bounds));
            //var map = $scope.mapObject.getGMap();//bounds = bounds;
            if($scope.markers.length > 0){
            	$scope.map.center = {latitude:$scope.markers[$scope.markers.length - 1].latitude,longitude:$scope.markers[$scope.markers.length - 1].longitude};
            	$scope.map.zoom = 14;
            }
            //map.fitBounds(bounds);
    }
	$scope.getPathList = function(){
		$http.get('getpath.php?plate_number=' + $scope.plate_number).
		  success(function(result){
				angular.forEach(result,function(smarker){
					if(!$scope.markerExists(smarker)){
						smarker.coords = {latitude:smarker.latitude,longitude:smarker.longitude};
						if(!smarker.overspeeding){
							smarker.options ={
							    icon:'//maps.google.com/mapfiles/ms/icons/green-dot.png'
							};
						}
						
						$scope.markers.push(smarker);
						$scope.autoCenter();
					}
				});
				
		  }).
		  error(function(err){
				console.log("Error:" + err);
		  });
		
		
	}
	var baseOptions = {
            'maxZoom': 15,
            'minZoom': 4,
            'backgroundColor': '#b0d1d4',
            'panControl': false,
            'zoomControl': true,
            'draggable': true,
            'zoomControlOptions': {
            'position': 'RIGHT_TOP',
            'style': 'SMALL'
            }
        };
        $scope.map = {center: {latitude: -6.771430, longitude: 39.239946}, options:baseOptions, zoom:8, showTraffic: true,  show: true,mapObject:{}};
        $scope.getPathList();
        $interval($scope.getPathList, 3000);
        
});
function getStartTime() {
    var date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    //date.setDate(date.getDate()+1);
    return date;
}
function getEndTime() {
    var date = new Date();
    date.setDate(date.getDate()+1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return date;
}