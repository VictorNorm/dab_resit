# DAB - Resit

# Application Installation and Usage Instructions

# Environment Variables

# Additional Libraries/Packages

# NodeJS Version Used

# DATABASE

CREATE DATABASE rentaldb;

# DATAINSERTS

INSERT INTO users (fullName, username, password, role) VALUES
('System admin', 'Admin', 'admin1234', 'admin'),
('User', 'User', 'user1234', 'customer'),
('User2', 'User 2', 'User1234', 'customer');

INSERT INTO vehicles (registration, make, model, lastServiceDate, rented) VALUES
(46875, 'Ford', 'Fiesta', '2023-05-12', TRUE),
(79845, 'VW', 'Golf', '2023-04-10', FALSE),
(75215, 'Toyota', 'Corolla', '2023-06-05', TRUE),
(52536, 'Ford', 'Taurus', '2022-11-28', FALSE),
(65643, 'Nissan', 'Ultima', '2023-04-10', FALSE),
(10235, 'Volvo', 'XC90', '2023-04-10', FALSE),
(54865, 'VW', 'ID.3', '2023-05-15', FALSE),
(98542, 'Ford', 'Fiesta', '2023-06-10', TRUE),
(45678, 'Ford', 'Focus', '2023-06-05', FALSE),
(45823, 'Toyota', 'Corolla', '2023-02-28', FALSE),
(65215, 'Audi', 'A3', '2023-03-12', FALSE),
(78947, 'Toyota', 'Land cruiser', '2023-01-31', FALSE);

INSERT INTO colours (name) VALUES
('Black'),
('White'),
('Blue'),
('Silver'),
('Green'),
('Red'),
('Tan');

INSERT INTO vehicle_colours (ColourId, VehicleId, createdAt, updatedAt) VALUES
(1, 1, date(now()), date(now())),
(2, 2, date(now()), date(now())),
(2, 3, date(now()), date(now())),
(3, 4, date(now()), date(now())),
(4, 5, date(now()), date(now())),
(2, 6, date(now()), date(now())),
(5, 7, date(now()), date(now())),
(6, 8, date(now()), date(now())),
(3, 9, date(now()), date(now())),
(2, 10, date(now()), date(now())),
(1, 11, date(now()), date(now())),
(7, 12, date(now()), date(now()));

INSERT INTO features (feature) VALUES
('Heated seats'),
('Cruise Control'),
('Reverse camera'),
('Lane-keep assist'),
('Auto Parking'),
('Remote start'),
('Quick charge'),
('Heated steering wheel');

INSERT INTO vehicle_features (FeatureId, VehicleId, createdAt, updatedAt) VALUES
(1, 1, date(now()), date(now())),
(2, 1, date(now()), date(now())),
(2, 2, date(now()), date(now())),
(3, 3, date(now()), date(now())),
(4, 3, date(now()), date(now())),
(5, 4, date(now()), date(now())),
(6, 4, date(now()), date(now())),
(1, 5, date(now()), date(now())),
(4, 6, date(now()), date(now())),
(2, 6, date(now()), date(now())),
(7, 7, date(now()), date(now())),
(2, 8, date(now()), date(now())),
(3, 8, date(now()), date(now())),
(2, 9, date(now()), date(now())),
(3, 10, date(now()), date(now())),
(1, 10, date(now()), date(now())),
(5, 11, date(now()), date(now())),
(8, 11, date(now()), date(now())),
(6, 12, date(now()), date(now()));

INSERT INTO types (type) VALUES
('Hatchback'),
('Sedan'),
('SUV');

INSERT INTO vehicle_types (TypeId, VehicleId, createdAt, updatedAt) VALUES
(1, 1, date(now()), date(now())),
(1, 2, date(now()), date(now())),
(2, 3, date(now()), date(now())),
(2, 4, date(now()), date(now())),
(2, 5, date(now()), date(now())),
(3, 6, date(now()), date(now())),
(1, 7, date(now()), date(now())),
(1, 8, date(now()), date(now())),
(1, 9, date(now()), date(now())),
(2, 10, date(now()), date(now())),
(2, 11, date(now()), date(now())),
(3, 12, date(now()), date(now()));

# DATABASEACCESS

# Licenses

"CarRental.jpg" source: "https://www.vecteezy.com".
