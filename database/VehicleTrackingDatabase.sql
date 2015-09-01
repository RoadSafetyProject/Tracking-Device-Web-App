CREATE TABLE vehicle(
	id SERIAL PRIMARY KEY,
	plate_number CHAR(8) NOT NULL UNIQUE
);
CREATE TABLE vehicle_tracker(
	id SERIAL PRIMARY KEY,
	vehicle_id INTEGER REFERENCES vehicle (id),
	--latitude	Decimal(9,6) NOT NULL,
	--longitude	Decimal(10,6) NOT NULL,
	--altitude	VARCHAR(20),
	--velocity	INTEGER ,
	tracking_data	TEXT,
	tracking_date	DATE
);
CREATE TABLE routes(
	id SERIAL PRIMARY KEY,
	name VARCHAR(20)
);
CREATE TABLE route_coordinates(
	id SERIAL PRIMARY KEY,
	route_id INTEGER REFERENCES routes(id),
	latitude	Decimal(10,6) NOT NULL,
	longitude	Decimal(10,6) NOT NULL
);
CREATE TABLE speed_limits(
	id SERIAL PRIMARY KEY,
	route_id INTEGER REFERENCES routes(id),
	comparison	CHAR(1),
	velocity	INTEGER
);