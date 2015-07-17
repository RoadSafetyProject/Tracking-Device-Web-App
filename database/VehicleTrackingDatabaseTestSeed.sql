
INSERT INTO vehicle(id,plate_number) VALUES (1,'T234 BLM');
INSERT INTO routes(id,name) VALUES (1,'Kijitonyama');
INSERT INTO route_coordinates(route_id,latitude,longitude) VALUES (1,-6.764392, 39.229227);
INSERT INTO speed_limits(route_id,comparison,velocity) VALUES (1,'>',50);
INSERT INTO vehicle_tracker(vehicle_id,latitude,longitude,altitude,velocity,tracking_time) 
	VALUES 
		(1,-6.761367, 39.226867,'40',40,CURRENT_TIMESTAMP),
		(1,-6.763497, 39.228326,'50',50,CURRENT_TIMESTAMP),
		(1,-6.764392, 39.229227,'60',60,CURRENT_TIMESTAMP),
		(1,-6.765245, 39.230472,'40',40,CURRENT_TIMESTAMP),
		(1,-6.766182, 39.231717,'40',40,CURRENT_TIMESTAMP),
		(1,-6.768271, 39.234420,'30',30,CURRENT_TIMESTAMP),
		(1,-6.769421, 39.235879,'30',30,CURRENT_TIMESTAMP),
		(1,-6.770401, 39.237167,'20',20,CURRENT_TIMESTAMP),
		(1,-6.771552, 39.238497,'20',20,CURRENT_TIMESTAMP)
	;
