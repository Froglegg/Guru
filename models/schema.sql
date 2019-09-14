DROP DATABASE IF EXISTS guru;
CREATE DATABASE guru;

USE guru;

CREATE TABLE questions
(
	questionId int NOT NULL AUTO_INCREMENT,
    employeeId int NOT NULL,
	employeeName varchar(255) NOT NULL,
	subject varchar(255) NOT NULL,
	body int NOT NULL,
	status int NOT NULL,
    assignedTo varchar(255) NOT NULL, 
	PRIMARY KEY (questionId)
);

CREATE TABLE employees
(
	id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL UNIQUE,
	salary varchar(255) NOT NULL,
	benefits int NOT NULL,
    benefitsId int NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE responses
(
    responseId int NOT NULL AUTO_INCREMENT,
	employeeName varchar(255) NOT NULL,
    questionId int NOT NULL,
    PRIMARY KEY (responseId),
    FOREIGN KEY (questionId) REFERENCES questions(questionId),
    FOREIGN KEY (employeeName) REFERENCES employees(name)
);

ALTER TABLE questions ADD FOREIGN KEY (employeeName) REFERENCES employees(name);
ALTER TABLE questions ADD FOREIGN KEY (employeeId) REFERENCES employees(id)
