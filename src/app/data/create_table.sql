CREATE DATABASE travel_simple_db;
USE travel_simple_db;

-- Tables
CREATE TABLE city (code INTEGER, name VARCHAR(50));
CREATE TABLE residence (code INTEGER, name VARCHAR(50), address VARCHAR(100), city_code INTEGER);
CREATE TABLE room (code INTEGER, name VARCHAR(50), availablePlaces INTEGER, residence_code INTEGER);
CREATE TABLE schedule (room_code INTEGER, busy_date DATE);

-- Add PKs
ALTER TABLE city ADD PRIMARY KEY (code);
ALTER TABLE residence ADD PRIMARY KEY (code);
ALTER TABLE room ADD PRIMARY KEY (code);
ALTER TABLE schedule ADD CONSTRAINT pk_schedule PRIMARY KEY (room_code, busy_date);

-- Auto-increment and not null
ALTER TABLE city MODIFY code INTEGER NOT NULL AUTO_INCREMENT;
ALTER TABLE residence MODIFY code INTEGER NOT NULL AUTO_INCREMENT;
ALTER TABLE room MODIFY code INTEGER NOT NULL AUTO_INCREMENT;

-- Add FKs
ALTER TABLE residence ADD FOREIGN KEY (city_code) REFERENCES city(code);
ALTER TABLE room ADD FOREIGN KEY (residence_code) REFERENCES residence(code);
ALTER TABLE schedule ADD FOREIGN KEY (room_code) REFERENCES room(code);

-- Data
-- ###########
-- City
-- ###########
INSERT INTO city (name) VALUES ('Campos do Jordão');
INSERT INTO city (name) VALUES ('São Paulo');

-- ###########
-- Residence
-- ###########
INSERT INTO residence (name, address, city_code) VALUES ('Hotel Golden Park', 'Rodovia Floriano Rodrigues Pinheiro, 2000', 1);
INSERT INTO residence (name, address, city_code) VALUES ('Hotel Leão da Montanha', 'Rua Dr. Raul Mesquita, 443', 1);
INSERT INTO residence (name, address, city_code) VALUES ('North Palace Hotel', 'R. Santa Teresa de Jesus, 339 - Vila Santa Terezinha (Zona Norte)', 2);
INSERT INTO residence (name, address, city_code) VALUES ('Holiday Inn Sao Paulo Parque Anhembi', 'Rua Professor Milton Rodriguez, 100 - Parque Anhembi', 2);

-- ###########
-- Room
-- ###########
INSERT INTO room (name, availablePlaces, residence_code) VALUES ('Quarto Duplo Standard', 2, 1);
INSERT INTO room (name, availablePlaces, residence_code) VALUES ('Quarto Triplo Superior', 3, 1);
INSERT INTO room (name, availablePlaces, residence_code) VALUES ('Quarto Duplo Standard', 2, 2);
INSERT INTO room (name, availablePlaces, residence_code) VALUES ('Quarto Duplo Superior', 2, 2);
INSERT INTO room (name, availablePlaces, residence_code) VALUES ('Quarto Triplo Superior', 3, 3);
INSERT INTO room (name, availablePlaces, residence_code) VALUES ('Quarto Duplo Standard', 2, 3);
INSERT INTO room (name, availablePlaces, residence_code) VALUES ('Quarto Duplo King', 2, 4);
INSERT INTO room (name, availablePlaces, residence_code) VALUES ('Quarto Triplo Superior', 3, 4);
INSERT INTO room (name, availablePlaces, residence_code) VALUES ('Quarto Casal', 2, 4);

-- ###########
-- Schedule
-- ###########
INSERT INTO schedule (room_code, busy_date) VALUES (1, '2020-02-17');
INSERT INTO schedule (room_code, busy_date) VALUES (1, '2020-02-18');
INSERT INTO schedule (room_code, busy_date) VALUES (1, '2020-02-19');
INSERT INTO schedule (room_code, busy_date) VALUES (1, '2020-02-20');
INSERT INTO schedule (room_code, busy_date) VALUES (2, '2020-02-21');
INSERT INTO schedule (room_code, busy_date) VALUES (2, '2020-02-22');
INSERT INTO schedule (room_code, busy_date) VALUES (2, '2020-02-27');
INSERT INTO schedule (room_code, busy_date) VALUES (2, '2020-02-28');
INSERT INTO schedule (room_code, busy_date) VALUES (3, '2020-02-23');
INSERT INTO schedule (room_code, busy_date) VALUES (3, '2020-02-24');
INSERT INTO schedule (room_code, busy_date) VALUES (4, '2020-02-25');
INSERT INTO schedule (room_code, busy_date) VALUES (4, '2020-02-26');
INSERT INTO schedule (room_code, busy_date) VALUES (5, '2020-02-19');
INSERT INTO schedule (room_code, busy_date) VALUES (5, '2020-02-20');
INSERT INTO schedule (room_code, busy_date) VALUES (6, '2020-02-19');
INSERT INTO schedule (room_code, busy_date) VALUES (6, '2020-02-20');
INSERT INTO schedule (room_code, busy_date) VALUES (7, '2020-02-23');
INSERT INTO schedule (room_code, busy_date) VALUES (7, '2020-02-24');
INSERT INTO schedule (room_code, busy_date) VALUES (8, '2020-02-25');
INSERT INTO schedule (room_code, busy_date) VALUES (8, '2020-02-26');
INSERT INTO schedule (room_code, busy_date) VALUES (9, '2020-02-27');
INSERT INTO schedule (room_code, busy_date) VALUES (9, '2020-02-28');
INSERT INTO schedule (room_code, busy_date) VALUES (9, '2020-02-29');