CREATE DATABASE IF NOT EXISTS app;
CREATE TABLE IF NOT EXISTS app.users(ID INT AUTO_INCREMENT PRIMARY KEY, Name VARCHAR(255));
INSERT INTO app.users (Name) SELECT 'Admin' FROM DUAL WHERE NOT EXISTS (SELECT * FROM app.users);
