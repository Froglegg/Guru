DROP DATABASE IF EXISTS guru;
CREATE DATABASE guru;

USE guru;

CREATE TABLE questions
(
	questionId int NOT NULL AUTO_INCREMENT,
    employeeId int NOT NULL DEFAULT 0,
	employeeName varchar(255) NOT NULL DEFAULT '',
	subject varchar(255) NOT NULL,
	body varchar(1000) NOT NULL,
	status varchar(255) NOT NULL,
    assignedTo varchar(255) NOT NULL DEFAULT '', 
	PRIMARY KEY (questionId)
);

CREATE TABLE employees
(
	id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL UNIQUE,
	salary varchar(255) NOT NULL,
	benefits varchar(255) NOT NULL,
    benefitsId int NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO employees (name, salary, benefits, benefitsId)
VALUES 
("Jeremiah", 70000, "Health Insurance", 30),
("Ryan", 70000, "Health Insurance", 30),
("Hayes", 70000, "Dental & Vision", 20),
("Mia", 70000, "Health, Dental & Vision", 50);


CREATE TABLE responses
(
    responseId int NOT NULL AUTO_INCREMENT,
	employeeName varchar(255) NOT NULL,
    questionId int NOT NULL,
	body varchar(1000) NOT NULL,
    PRIMARY KEY (responseId),
    FOREIGN KEY (questionId) REFERENCES questions(questionId),
    FOREIGN KEY (employeeName) REFERENCES employees(name)
);

-- ALTER TABLE questions ADD FOREIGN KEY (employeeName) REFERENCES employees(name);
-- ALTER TABLE questions ADD FOREIGN KEY (employeeId) REFERENCES employees(id);

INSERT INTO questions (subject, body, status)
VALUES 
("Resources", "I neeed a new computer. ASAP", "open"),
("Repairs", "My AC is broken", "open"),
("Coding Assistance", "How do you insert multiple rows of data into one Table ", "open");

