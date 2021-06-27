DROP DATABASE IF EXISTS employees_systemDB;
create database employees_systemDB;

use employees_systemDB;

create table department(
    id int auto_increment NOT NULL primary key,
    name varchar(30) NOT NULL
);

create table role(
    id int auto_increment NOT NULL primary key,
    title varchar(30) NOT NULL,
    salary decimal(10, 2),
    department_id int NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

create table employee(
    id int auto_increment primary key,
    first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    role_id int NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role(id)
);